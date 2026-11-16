/* =========================================================
 *  Bolão do Grammy — app.js
 *  HTML + CSS + JS puro. Tudo é salvo no localStorage do navegador.
 * ========================================================= */
(() => {
  "use strict";

  const E = window.EVENT;
  const $app = document.getElementById("app");
  const KEY = `bolao:${E.id}`;
  const LOCK = Date.parse(E.lockAt);
  const SHOW = Date.parse(E.showAt);

  /* ---------- armazenamento ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* modo privado etc. */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* */ } }
  };

  const norm = (s) => String(s || "").trim().toLowerCase();

  const state = {
    user: store.get("bolao:user", null),
    tab: "palpites",
    group: "Todas",
    picks: {},
    friends: [],
    pendingFriend: null
  };

  function loadUserData() {
    if (!state.user) return;
    state.picks = store.get(`${KEY}:picks:${norm(state.user)}`, {});
    state.friends = store.get(`${KEY}:friends:${norm(state.user)}`, []);
  }
  const savePicks = () => store.set(`${KEY}:picks:${norm(state.user)}`, state.picks);
  const saveFriends = () => store.set(`${KEY}:friends:${norm(state.user)}`, state.friends);

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isAdmin = () => location.hash.startsWith("#admin");
  const isLocked = () => Date.now() >= LOCK;
  const winners = () => (window.RESULTS && window.RESULTS.winners) || {};
  const catById = (id) => E.categories.find((c) => c.id === id);
  const kindLabel = { song: "Música", album: "Álbum", artist: "Artista" };

  const fmtDate = (ms) => new Date(ms).toLocaleString("pt-BR", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
  });

  function score(picks) {
    const w = winners();
    const r = { hits: 0, misses: 0, noPick: 0, pending: 0, announced: 0, picked: 0 };
    for (const c of E.categories) {
      const p = picks[c.id];
      if (p) r.picked++;
      if (!w[c.id]) { r.pending++; continue; }
      r.announced++;
      if (!p) r.noPick++;
      else if (p === w[c.id]) r.hits++;
      else r.misses++;
    }
    return r;
  }

  function statusLine() {
    const now = Date.now();
    if (now < LOCK) {
      const days = Math.ceil((LOCK - now) / 86400000);
      return days > 1 ? `Faltam ${days} dias` : `Apostas fecham ${fmtDate(LOCK)}`;
    }
    if (now < SHOW) return "Premiere ceremony rolando";
    if (now < SHOW + 6 * 3600000) return "🔴 Ao vivo";
    return "Cerimônia encerrada";
  }

  /* ---------- YouTube ---------- */
  function ytId(url) {
    if (!url) return null;
    const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return m ? m[1] : null;
  }
  function ytSearchUrl(cat, n) {
    let q = cat.kind === "artist" ? n.title : `${n.artist} ${n.title}`;
    if (cat.kind === "album") q += " album";
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  }

  const $player = document.getElementById("player");
  const $frame = document.getElementById("player-frame");
  function openPlayer(cat, n) {
    const id = ytId(n.yt);
    if (!id) { window.open(ytSearchUrl(cat, n), "_blank", "noopener"); return; }
    document.getElementById("player-title").textContent = n.title;
    document.getElementById("player-artist").textContent = n.artist ? " — " + n.artist : "";
    $frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    $player.hidden = false;
  }
  function closePlayer() { $player.hidden = true; $frame.src = "about:blank"; }
  $player.addEventListener("click", (e) => { if (e.target === $player || e.target.closest("[data-close]")) closePlayer(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$player.hidden) closePlayer(); });

  /* ---------- toast ---------- */
  const $toast = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    $toast.textContent = msg;
    $toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $toast.hidden = true; }, 2600);
  }

  /* ---------- link de compartilhar ----------
   * Formato: #p=<nome>~<código>
   * Código = 1 caractere por categoria (índice do indicado em base36, "-" = sem palpite)
   */
  function encodePicks(picks) {
    return E.categories.map((c) => {
      const i = c.nominees.findIndex((n) => n.title === picks[c.id]);
      return i < 0 ? "-" : i.toString(36);
    }).join("");
  }
  function decodePicks(code) {
    const picks = {};
    E.categories.forEach((c, idx) => {
      const ch = code[idx];
      if (!ch || ch === "-") return;
      const n = c.nominees[parseInt(ch, 36)];
      if (n) picks[c.id] = n.title;
    });
    return picks;
  }
  function shareUrl() {
    const base = location.href.split("#")[0];
    return `${base}#p=${encodeURIComponent(state.user)}~${encodePicks(state.picks)}`;
  }
  function parseShare(text) {
    const m = String(text).match(/#p=([^~]+)~([0-9a-z-]+)/i);
    if (!m) return null;
    let name;
    try { name = decodeURIComponent(m[1]).trim().slice(0, 24); } catch { return null; }
    if (!name) return null;
    return { name, picks: decodePicks(m[2].toLowerCase()) };
  }
  function addFriend(f) {
    if (norm(f.name) === norm(state.user)) { toast("Esse é o seu próprio link 😉"); return false; }
    const i = state.friends.findIndex((x) => norm(x.name) === norm(f.name));
    if (i >= 0) state.friends[i] = f; else state.friends.push(f);
    saveFriends();
    toast(i >= 0 ? `Palpites de ${f.name} atualizados` : `${f.name} entrou no seu ranking!`);
    return true;
  }

  /* =========================================================
   *  TELAS
   * ========================================================= */

  function render() {
    if (isAdmin()) return renderAdmin();
    if (!state.user) return renderLogin();
    renderMain();
  }

  /* ---------- login ---------- */
  function renderLogin() {
    const invite = state.pendingFriend
      ? `<p class="invite">🎟️ <strong>${esc(state.pendingFriend.name)}</strong> te chamou pro bolão!</p>` : "";
    $app.innerHTML = `
      <main class="login">
        <div class="login-card">
          <div class="trophy">🏆</div>
          <h1>Bolão do <span>Grammy</span></h1>
          <p class="muted">${esc(E.subtitle)} · ${new Date(SHOW).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</p>
          ${invite}
          <form id="login-form" autocomplete="off">
            <label for="username">Como você quer ser chamado(a)?</label>
            <input id="username" name="username" maxlength="24" placeholder="Seu nome ou apelido" required>
            <button class="btn btn-gold" type="submit">Entrar</button>
          </form>
          <p class="fine">Sem senha: seus palpites ficam salvos neste navegador.</p>
        </div>
      </main>`;
    const input = document.getElementById("username");
    input.focus();
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = input.value.trim().replace(/\s+/g, " ").slice(0, 24);
      if (!name) return;
      state.user = name;
      store.set("bolao:user", name);
      loadUserData();
      if (state.pendingFriend) { addFriend(state.pendingFriend); state.pendingFriend = null; state.tab = "ranking"; }
      render();
    });
  }

  /* ---------- app principal ---------- */
  function renderMain() {
    const s = score(state.picks);
    const total = E.categories.length;
    const hasResults = s.announced > 0;

    $app.innerHTML = `
      <header class="top">
        <div class="brand">
          <span class="logo">🏆</span>
          <div>
            <h1>Bolão do <span>Grammy</span></h1>
            <p class="muted small">${esc(E.subtitle)} · <span id="countdown">${esc(statusLine())}</span></p>
          </div>
        </div>
        <div class="user">
          <span class="chip">👤 ${esc(state.user)}</span>
          <button class="link-btn" data-action="logout">Sair</button>
        </div>
      </header>

      <nav class="tabs" role="tablist">
        ${tabBtn("palpites", `Palpites <em>${s.picked}/${total}</em>`)}
        ${tabBtn("resultados", `Resultados${hasResults ? ` <em>${s.hits}✓</em>` : ""}`)}
        ${tabBtn("ranking", `Ranking${state.friends.length ? ` <em>${state.friends.length + 1}</em>` : ""}`)}
      </nav>

      <main class="content">
        ${state.tab === "palpites" ? viewPicks(s) : state.tab === "resultados" ? viewResults(s) : viewRanking()}
      </main>

      <footer class="foot muted small">
        Feito para diversão entre amigos · não afiliado à Recording Academy
      </footer>`;
  }

  const tabBtn = (id, label) =>
    `<button role="tab" class="tab ${state.tab === id ? "active" : ""}" aria-selected="${state.tab === id}" data-action="tab" data-tab="${id}">${label}</button>`;

  /* ---------- aba: palpites ---------- */
  function viewPicks(s) {
    const total = E.categories.length;
    const locked = isLocked();
    const w = winners();
    const groups = ["Todas", ...E.groups];
    const cats = E.categories.filter((c) => state.group === "Todas" || c.group === state.group);

    const banner = locked
      ? `<div class="banner warn">🔒 Apostas encerradas. Acompanhe na aba <strong>Resultados</strong>.</div>`
      : `<div class="banner">Escolha um indicado por categoria. As apostas fecham em <strong>${esc(fmtDate(LOCK))}</strong> (seu horário).</div>`;

    return `
      ${banner}
      <div class="progress" aria-label="Progresso">
        <div class="progress-bar" style="width:${(s.picked / total) * 100}%"></div>
        <span>${s.picked} de ${total} categorias</span>
      </div>

      <div class="chips">
        ${groups.map((g) => `<button class="filter ${state.group === g ? "on" : ""}" data-action="group" data-group="${esc(g)}">${esc(g)}</button>`).join("")}
      </div>

      ${cats.map((c) => categoryCard(c, state.picks[c.id], w[c.id], locked)).join("")}
    `;
  }

  function categoryCard(c, pick, winner, locked) {
    return `
      <section class="card" id="cat-${c.id}">
        <div class="card-head">
          <div>
            <h2>${esc(c.name)}</h2>
            <p class="muted small">${esc(c.en)}</p>
          </div>
          <span class="badge">${kindLabel[c.kind] || ""}</span>
        </div>
        <ul class="noms">
          ${c.nominees.map((n, i) => {
            const selected = pick === n.title;
            const isWin = winner === n.title;
            const cls = [
              selected && "selected",
              isWin && "winner",
              winner && selected && !isWin && "wrong"
            ].filter(Boolean).join(" ");
            const hasVideo = !!ytId(n.yt);
            return `
              <li class="nom ${cls}">
                <button class="pick" data-action="pick" data-cat="${c.id}" data-i="${i}" ${locked ? "disabled" : ""} aria-pressed="${selected}">
                  <span class="radio" aria-hidden="true"></span>
                  <span class="nom-text">
                    <span class="nom-title">${esc(n.title)}</span>
                    ${n.artist ? `<span class="nom-artist">${esc(n.artist)}</span>` : ""}
                  </span>
                  ${isWin ? `<span class="tag win">🏆 Venceu</span>` : ""}
                </button>
                <button class="listen ${hasVideo ? "" : "search"}" data-action="listen" data-cat="${c.id}" data-i="${i}"
                  title="${hasVideo ? "Ouvir aqui" : "Buscar no YouTube"}" aria-label="${hasVideo ? "Ouvir" : "Buscar no YouTube"}: ${esc(n.title)}">
                  ${hasVideo ? "▶" : "🔎"}<span class="listen-label">${hasVideo ? "Ouvir" : "YouTube"}</span>
                </button>
              </li>`;
          }).join("")}
        </ul>
      </section>`;
  }

  /* ---------- aba: resultados ---------- */
  function viewResults(s) {
    const w = winners();
    const refresh = `<button class="btn btn-ghost small-btn" data-action="refresh">↻ Atualizar resultados</button>`;

    if (s.announced === 0) {
      return `
        <div class="empty">
          <div class="big-emoji">🎙️</div>
          <h2>Os resultados aparecem aqui no dia</h2>
          <p class="muted">A cerimônia é em <strong>${esc(new Date(SHOW).toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" }))}</strong> (seu horário).
          Durante a premiação esta página se atualiza sozinha.</p>
          ${refresh}
        </div>`;
    }

    const pct = Math.round((s.hits / s.announced) * 100);
    const done = s.pending === 0;
    const headline = done
      ? (pct >= 70 ? "Você é praticamente da Academia! 🔥" : pct >= 40 ? "Mandou bem! 👏" : "Ano que vem você se vinga 😅")
      : `${s.announced} de ${E.categories.length} categorias anunciadas`;

    const rows = E.categories.map((c) => {
      const win = w[c.id];
      const p = state.picks[c.id];
      let icon, cls, txt;
      if (!win) { icon = "⏳"; cls = "pending"; txt = "Aguardando"; }
      else if (!p) { icon = "➖"; cls = "nopick"; txt = "Sem palpite"; }
      else if (p === win) { icon = "✅"; cls = "hit"; txt = "Acertou"; }
      else { icon = "❌"; cls = "miss"; txt = "Errou"; }
      const winN = win && c.nominees.find((n) => n.title === win);
      const pickN = p && c.nominees.find((n) => n.title === p);
      return `
        <li class="res ${cls}">
          <span class="res-icon" title="${txt}">${icon}</span>
          <div class="res-body">
            <strong>${esc(c.name)}</strong>
            ${win ? `<span class="res-line">🏆 ${esc(win)}${winN && winN.artist ? ` <span class="muted">— ${esc(winN.artist)}</span>` : ""}</span>` : ""}
            ${p && p !== win ? `<span class="res-line muted">Seu palpite: ${esc(p)}${pickN && pickN.artist ? ` — ${esc(pickN.artist)}` : ""}</span>` : ""}
            ${!p && win ? `<span class="res-line muted">Você não apostou nessa</span>` : ""}
            ${!win && p ? `<span class="res-line muted">Seu palpite: ${esc(p)}</span>` : ""}
          </div>
        </li>`;
    });

    // anunciadas primeiro, pendentes no fim
    const order = E.categories.map((c, i) => ({ i, has: !!w[c.id] }))
      .sort((a, b) => (b.has - a.has) || (a.i - b.i)).map((x) => rows[x.i]);

    return `
      <section class="score">
        <div class="score-main">
          <div class="score-num">${s.hits}<small>/${s.announced}</small></div>
          <div>
            <p class="score-title">${esc(headline)}</p>
            <p class="muted small">${pct}% de acerto nas categorias já anunciadas</p>
          </div>
        </div>
        <div class="stats">
          <div><b class="ok">${s.hits}</b><span>acertos</span></div>
          <div><b class="bad">${s.misses}</b><span>erros</span></div>
          <div><b>${s.noPick}</b><span>sem palpite</span></div>
          <div><b>${s.pending}</b><span>faltam</span></div>
        </div>
      </section>
      <div class="row-between">
        <h2 class="section-title">Resumo por categoria</h2>
        ${done ? "" : refresh}
      </div>
      <ul class="results">${order.join("")}</ul>`;
  }

  /* ---------- aba: ranking ---------- */
  function viewRanking() {
    const anyResults = Object.keys(winners()).length > 0;
    const people = [
      { name: state.user, picks: state.picks, me: true },
      ...state.friends.map((f) => ({ ...f, me: false }))
    ].map((p) => ({ ...p, s: score(p.picks) }))
      .sort((a, b) => (b.s.hits - a.s.hits) || (a.s.misses - b.s.misses) || a.name.localeCompare(b.name));

    let pos = 0, last = null;
    const rows = people.map((p, i) => {
      const key = `${p.s.hits}|${p.s.misses}`;
      if (key !== last) { pos = i + 1; last = key; }
      const medal = anyResults ? ({ 1: "🥇", 2: "🥈", 3: "🥉" }[pos] || pos + "º") : "•";
      return `
        <li class="rank ${p.me ? "me" : ""}">
          <details>
            <summary>
              <span class="pos">${medal}</span>
              <span class="rname">${esc(p.name)}${p.me ? " <em>(você)</em>" : ""}</span>
              <span class="rscore">${anyResults ? `<b>${p.s.hits}</b> acertos` : `${p.s.picked}/${E.categories.length} palpites`}</span>
              ${p.me ? "" : `<button class="icon-btn" data-action="remove-friend" data-name="${esc(p.name)}" title="Remover">✕</button>`}
            </summary>
            <ul class="mini">
              ${E.categories.map((c) => {
                const pk = p.picks[c.id], wn = winners()[c.id];
                const ic = !wn ? "" : !pk ? "➖" : pk === wn ? "✅" : "❌";
                return `<li><span>${esc(c.name)}</span><span>${ic} ${esc(pk || "—")}</span></li>`;
              }).join("")}
            </ul>
          </details>
        </li>`;
    }).join("");

    return `
      <section class="card share">
        <h2>Chame a galera 🎉</h2>
        <p class="muted small">Mande o seu link para os amigos. Quando eles abrirem, você entra no ranking deles — e eles mandam o link de volta pra entrar no seu.</p>
        <div class="share-row">
          <input id="share-url" readonly value="${esc(shareUrl())}">
          <button class="btn btn-gold" data-action="copy-share">Copiar</button>
        </div>
        <p class="fine">O link leva os palpites do momento. Mudou algum? Mande o link de novo.</p>
      </section>

      <section class="card">
        <h2>Adicionar amigo</h2>
        <form id="add-friend" class="share-row">
          <input id="friend-url" placeholder="Cole aqui o link que te mandaram">
          <button class="btn btn-ghost" type="submit">Adicionar</button>
        </form>
      </section>

      <h2 class="section-title">${anyResults ? "Classificação" : "Participantes"}</h2>
      <ul class="ranking">${rows}</ul>
      ${state.friends.length === 0 ? `<p class="muted small center">Ainda é só você por aqui. Copie o link acima e mande no grupo!</p>` : ""}
    `;
  }

  /* ---------- admin ---------- */
  function renderAdmin() {
    const draft = store.get(`${KEY}:admin`, null) || { ...winners() };
    const count = Object.keys(draft).filter((k) => draft[k]).length;
    $app.innerHTML = `
      <header class="top">
        <div class="brand">
          <span class="logo">🛠️</span>
          <div><h1>Modo <span>admin</span></h1><p class="muted small">Marque os vencedores e publique no GitHub</p></div>
        </div>
        <div class="user"><a class="link-btn" href="#">← Voltar ao app</a></div>
      </header>
      <main class="content">
        <div class="banner">
          1. Marque o vencedor de cada categoria conforme forem anunciando.<br>
          2. Clique em <strong>Copiar results.js</strong>.<br>
          3. No GitHub, abra <code>results.js</code> → ✏️ editar → apague tudo → cole → <em>Commit changes</em>. Em ~1 minuto todo mundo vê.
        </div>
        <div class="admin-actions">
          <button class="btn btn-gold" data-action="admin-copy">📋 Copiar results.js (${count}/${E.categories.length})</button>
          <button class="btn btn-ghost" data-action="admin-download">⬇️ Baixar arquivo</button>
          <button class="btn btn-ghost" data-action="admin-reset">Recarregar do site</button>
        </div>
        ${E.categories.map((c) => `
          <div class="admin-row">
            <label for="adm-${c.id}">${esc(c.name)} <span class="muted small">· ${esc(c.id)}</span></label>
            <select id="adm-${c.id}" data-admin-cat="${c.id}" class="${draft[c.id] ? "set" : ""}">
              <option value="">— ainda não anunciado —</option>
              ${c.nominees.map((n) => `<option value="${esc(n.title)}" ${draft[c.id] === n.title ? "selected" : ""}>${esc(n.title)}${n.artist ? " — " + esc(n.artist) : ""}</option>`).join("")}
            </select>
          </div>`).join("")}
      </main>`;
  }

  function adminFile() {
    const draft = store.get(`${KEY}:admin`, null) || { ...winners() };
    const lines = E.categories
      .filter((c) => draft[c.id])
      .map((c) => `    ${JSON.stringify(c.id)}: ${JSON.stringify(draft[c.id])}`);
    return `/*
 * RESULTADOS — gerado pelo modo admin em ${new Date().toLocaleString("pt-BR")}
 * Formato: "id-da-categoria": "Título exato do vencedor"
 */

window.RESULTS = {
  updatedAt: ${JSON.stringify(new Date().toISOString())},
  winners: {
${lines.join(",\n")}
  }
};
`;
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch { /* */ }
      ta.remove(); return ok;
    }
  }

  /* =========================================================
   *  EVENTOS
   * ========================================================= */
  $app.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;

    if (a === "tab") { state.tab = el.dataset.tab; render(); window.scrollTo(0, 0); }

    else if (a === "group") { state.group = el.dataset.group; render(); }

    else if (a === "pick") {
      if (isLocked()) return;
      const c = catById(el.dataset.cat);
      const n = c.nominees[+el.dataset.i];
      if (state.picks[c.id] === n.title) delete state.picks[c.id];   // clicar de novo desmarca
      else state.picks[c.id] = n.title;
      savePicks();
      render();
    }

    else if (a === "listen") {
      const c = catById(el.dataset.cat);
      openPlayer(c, c.nominees[+el.dataset.i]);
    }

    else if (a === "logout") {
      store.del("bolao:user");
      state.user = null; state.picks = {}; state.friends = []; state.tab = "palpites";
      render();
    }

    else if (a === "refresh") { reloadResults(true); }

    else if (a === "copy-share") {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) {
        try { await navigator.share({ title: "Bolão do Grammy", text: `Meus palpites pro ${E.name}! Faz os seus:`, url: shareUrl() }); return; }
        catch { /* cancelou: cai no copiar */ }
      }
      toast((await copyText(shareUrl())) ? "Link copiado! Manda no grupo 📲" : "Não consegui copiar, selecione o texto");
    }

    else if (a === "remove-friend") {
      e.preventDefault();
      const name = el.dataset.name;
      if (!confirm(`Remover ${name} do ranking?`)) return;
      state.friends = state.friends.filter((f) => f.name !== name);
      saveFriends(); render();
    }

    else if (a === "admin-copy") {
      toast((await copyText(adminFile())) ? "results.js copiado! Agora cole no GitHub" : "Não consegui copiar — use Baixar arquivo");
    }
    else if (a === "admin-download") {
      const blob = new Blob([adminFile()], { type: "text/javascript" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); link.download = "results.js"; link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }
    else if (a === "admin-reset") {
      if (!confirm("Descartar o rascunho e carregar os resultados que estão publicados?")) return;
      store.del(`${KEY}:admin`); reloadResults(false, true);
    }
  });

  $app.addEventListener("change", (e) => {
    const sel = e.target.closest("[data-admin-cat]");
    if (!sel) return;
    const draft = store.get(`${KEY}:admin`, null) || { ...winners() };
    if (sel.value) draft[sel.dataset.adminCat] = sel.value; else delete draft[sel.dataset.adminCat];
    store.set(`${KEY}:admin`, draft);
    renderAdmin();
  });

  $app.addEventListener("submit", (e) => {
    if (e.target.id !== "add-friend") return;
    e.preventDefault();
    const f = parseShare(document.getElementById("friend-url").value);
    if (!f) { toast("Link inválido — cole o link inteiro que te mandaram"); return; }
    if (addFriend(f)) render();
  });

  /* ---------- resultados ao vivo ---------- */
  let lastSig = JSON.stringify(winners());
  function reloadResults(manual, force) {
    const s = document.createElement("script");
    s.src = "results.js?t=" + Date.now();
    s.onload = () => {
      s.remove();
      const sig = JSON.stringify(winners());
      if (sig !== lastSig || force) {
        const fresh = sig !== lastSig;
        lastSig = sig;
        render();
        if (fresh && !isAdmin()) toast("🏆 Novos resultados!");
      } else if (manual) toast("Sem novidades por enquanto");
    };
    s.onerror = () => { s.remove(); if (manual) toast("Não consegui atualizar agora"); };
    document.body.appendChild(s);
  }

  setInterval(() => {
    const cd = document.getElementById("countdown");
    if (cd) cd.textContent = statusLine();
    const now = Date.now();
    // Só busca resultados perto da cerimônia (de 1h antes do fechamento até 12h depois do show)
    if (now > LOCK - 3600000 && now < SHOW + 12 * 3600000 && !isAdmin()) reloadResults(false);
  }, 60000);

  /* ---------- link compartilhado (#p=...) ---------- */
  function handleHash() {
    const f = parseShare(location.hash);
    if (!f) return false;
    history.replaceState(null, "", location.pathname + location.search);
    if (state.user) { addFriend(f); state.tab = "ranking"; }
    else state.pendingFriend = f;
    return true;
  }
  window.addEventListener("hashchange", () => { handleHash(); render(); });

  /* ---------- start ---------- */
  loadUserData();
  handleHash();
  render();
})();
