# 🏆 Bolão do Grammy 2027

App simples (HTML + CSS + JS puro) para a galera apostar nos vencedores do 69º Grammy (7 de fevereiro de 2027).

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | A página |
| `style.css` | O visual |
| `app.js` | A lógica (login, palpites, resultados, ranking, admin) |
| `data.js` | **Categorias e indicados** (e os links do YouTube) |
| `results.js` | **Vencedores**: você atualiza no dia da cerimônia |

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `grammy-bolao`) e suba os 5 arquivos.
2. Vá em **Settings → Pages → Branch: `main` / `(root)`** → Save.
3. Em ~1 minuto o site estará em `https://SEU-USUARIO.github.io/grammy-bolao/`.

## Colocar os vídeos do YouTube

No `data.js`, preencha o campo `yt` do indicado:

```js
{ title: "Man I Need", artist: "Olivia Dean", yt: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
```

- Com link: o botão **▶ Ouvir** abre o vídeo dentro do app.
- Sem link: o botão **🔎 YouTube** abre uma busca pela música/álbum.

> ⚠️ Não mude títulos nem a ordem dos indicados depois que as pessoas começarem a apostar.

## No dia do Grammy

1. Abra `https://SEU-USUARIO.github.io/grammy-bolao/#admin`
2. Vá marcando os vencedores conforme forem anunciados.
3. Clique em **Copiar results.js**.
4. No GitHub: abra `results.js` → ✏️ → apague tudo → cole → **Commit changes**.
5. Em ~1 minuto, quem estiver com o site aberto vê os resultados (o app se atualiza sozinho a cada minuto durante a cerimônia).

Pode repetir quantas vezes quiser ao longo da noite.

## Como funciona o login e o ranking

- O login é só um nome, sem senha. Os palpites ficam salvos **no navegador** de cada pessoa.
- Para o ranking entre amigos, cada um copia o seu link na aba **Ranking** e manda no grupo. Quem abre o link adiciona aquela pessoa ao próprio ranking.
- Mudou um palpite? Mande o link de novo.
- As apostas fecham sozinhas no horário definido em `lockAt` no `data.js`.

## Oscar depois

Copie `data.js` para `data-oscar.js`, troque `id`, `name`, datas e categorias (mesmo formato) e aponte o `<script>` do `index.html` para ele (ou crie uma pasta `/oscar` com uma cópia do app).
