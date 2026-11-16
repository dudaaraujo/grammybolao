/*
 * ============================================================
 *  DADOS DO EVENTO — 69º Grammy Awards (2027)
 * ============================================================
 *  Indicações anunciadas em 16/11/2026.
 *
 *  Como editar:
 *  - Para colocar o vídeo do YouTube de um indicado, preencha o campo `yt`
 *    com o link (ex.: "https://www.youtube.com/watch?v=XXXXXXXXXXX").
 *    Se `yt` ficar vazio, o botão abre uma busca no YouTube automaticamente.
 *  - NÃO mude os títulos depois que as pessoas começarem a apostar:
 *    o palpite é salvo pelo título (e a ordem é usada nos links de compartilhar).
 *
 *  Para o Oscar no futuro: copie este arquivo como `data-oscar.js`
 *  com o mesmo formato e troque o <script> no index.html.
 * ============================================================
 */

window.EVENT = {
  id: "grammy-2027",
  name: "Grammy 2027",
  subtitle: "69º Grammy Awards",
  // Horário da transmissão principal (8pm ET = 01:00 em Lisboa / 22:00 em Brasília)
  showAt: "2027-02-08T01:00:00Z",
  // Apostas fecham antes da "Premiere Ceremony" (a parte da tarde, onde sai a maioria das categorias)
  lockAt: "2027-02-07T20:00:00Z",

  groups: ["Geral", "Pop", "Dance", "Rock / Alternativo", "R&B", "Rap", "Country", "Latino / Global", "Outros"],

  categories: [
    // ---------------- GERAL ----------------
    {
      id: "record", group: "Geral", name: "Gravação do Ano", en: "Record of the Year", kind: "song",
      nominees: [
        { title: "Man I Need", artist: "Olivia Dean", yt: "" },
        { title: "Choosin' Texas", artist: "Ella Langley", yt: "" },
        { title: "I Just Might", artist: "Bruno Mars", yt: "" },
        { title: "WHERE IS MY HUSBAND!", artist: "RAYE", yt: "" },
        { title: "the cure", artist: "Olivia Rodrigo", yt: "" },
        { title: "Berghain", artist: "ROSALÍA, Björk, Yves Tumor", yt: "" },
        { title: "The Fate of Ophelia", artist: "Taylor Swift", yt: "" },
        { title: "Dracula", artist: "Tame Impala com JENNIE", yt: "" }
      ]
    },
    {
      id: "album", group: "Geral", name: "Álbum do Ano", en: "Album of the Year", kind: "album",
      nominees: [
        { title: "Lost Weekend", artist: "Phoebe Bridgers", yt: "" },
        { title: "The Art of Loving", artist: "Olivia Dean", yt: "" },
        { title: "Dandelion", artist: "Ella Langley", yt: "" },
        { title: "The Romantic", artist: "Bruno Mars", yt: "" },
        { title: "THIS MUSIC MAY CONTAIN HOPE.", artist: "RAYE", yt: "" },
        { title: "you seem pretty sad for a girl so in love", artist: "Olivia Rodrigo", yt: "" },
        { title: "LUX (Complete Works)", artist: "ROSALÍA", yt: "" },
        { title: "The Life of a Showgirl", artist: "Taylor Swift", yt: "" }
      ]
    },
    {
      id: "song", group: "Geral", name: "Canção do Ano", en: "Song of the Year", kind: "song",
      nominees: [
        { title: "Berghain", artist: "ROSALÍA, Björk, Yves Tumor", yt: "" },
        { title: "Choosin' Texas", artist: "Ella Langley", yt: "" },
        { title: "the cure", artist: "Olivia Rodrigo", yt: "" },
        { title: "hate that i made you love me", artist: "Ariana Grande", yt: "" },
        { title: "I Knew It, I Knew You (Toy Story 5)", artist: "Taylor Swift", yt: "" },
        { title: "Man I Need", artist: "Olivia Dean", yt: "" },
        { title: "Risk It All", artist: "Bruno Mars", yt: "" },
        { title: "WHERE IS MY HUSBAND!", artist: "RAYE", yt: "" }
      ]
    },
    {
      id: "new-artist", group: "Geral", name: "Artista Revelação", en: "Best New Artist", kind: "artist",
      nominees: [
        { title: "Angine de Poitrine", artist: "", yt: "" },
        { title: "Geese", artist: "", yt: "" },
        { title: "Ella Langley", artist: "", yt: "" },
        { title: "Slayyyter", artist: "", yt: "" },
        { title: "SIENNA SPIRO", artist: "", yt: "" },
        { title: "Don Toliver", artist: "", yt: "" },
        { title: "Remi Wolf", artist: "", yt: "" },
        { title: "The Womack Sisters", artist: "", yt: "" }
      ]
    },

    // ---------------- POP ----------------
    {
      id: "pop-solo", group: "Pop", name: "Melhor Performance Pop Solo", en: "Best Pop Solo Performance", kind: "song",
      nominees: [
        { title: "Man I Need", artist: "Olivia Dean", yt: "" },
        { title: "Risk It All", artist: "Bruno Mars", yt: "" },
        { title: "WHERE IS MY HUSBAND!", artist: "RAYE", yt: "" },
        { title: "the cure", artist: "Olivia Rodrigo", yt: "" },
        { title: "Sauvignon Blanc", artist: "ROSALÍA", yt: "" }
      ]
    },
    {
      id: "pop-duo", group: "Pop", name: "Melhor Performance Pop em Dupla/Grupo", en: "Best Pop Duo/Group Performance", kind: "song",
      nominees: [
        { title: "RUNWAY", artist: "Lady Gaga, Doechii", yt: "" },
        { title: "Bring Your Love", artist: "Madonna, Sabrina Carpenter", yt: "" },
        { title: "Click Clack Symphony.", artist: "RAYE feat. Hans Zimmer", yt: "" },
        { title: "The Life of a Showgirl", artist: "Taylor Swift, Sabrina Carpenter", yt: "" },
        { title: "Dracula", artist: "Tame Impala com JENNIE", yt: "" }
      ]
    },
    {
      id: "pop-album", group: "Pop", name: "Melhor Álbum Vocal Pop", en: "Best Pop Vocal Album", kind: "album",
      nominees: [
        { title: "The Art of Loving", artist: "Olivia Dean", yt: "" },
        { title: "petal", artist: "Ariana Grande", yt: "" },
        { title: "The Romantic", artist: "Bruno Mars", yt: "" },
        { title: "THIS MUSIC MAY CONTAIN HOPE.", artist: "RAYE", yt: "" },
        { title: "you seem pretty sad for a girl so in love", artist: "Olivia Rodrigo", yt: "" }
      ]
    },

    // ---------------- DANCE ----------------
    {
      id: "dance-pop", group: "Dance", name: "Melhor Gravação Dance Pop", en: "Best Dance Pop Recording", kind: "song",
      nominees: [
        { title: "Blue Moon", artist: "Zara Larsson", yt: "" },
        { title: "Danceteria", artist: "Madonna", yt: "" },
        { title: "Life Boat.", artist: "RAYE", yt: "" },
        { title: "DANCE...", artist: "Slayyyter", yt: "" },
        { title: "Too Easy", artist: "Tinashe", yt: "" }
      ]
    },
    {
      id: "dance-rec", group: "Dance", name: "Melhor Gravação Dance/Eletrônica", en: "Best Dance/Electronic Recording", kind: "song",
      nominees: [
        { title: "Lights Burn Dimmer", artist: "Fred again.., Jamie T", yt: "" },
        { title: "I Feel So Free", artist: "Madonna", yt: "" },
        { title: "CRANK", artist: "Slayyyter", yt: "" },
        { title: "My Old Ways", artist: "Tame Impala", yt: "" },
        { title: "Melatonin", artist: "Tinashe", yt: "" },
        { title: "Music", artist: "underscores", yt: "" }
      ]
    },
    {
      id: "dance-album", group: "Dance", name: "Melhor Álbum Dance/Eletrônico", en: "Best Dance/Electronic Album", kind: "album",
      nominees: [
        { title: "CONFESSIONS II", artist: "Madonna", yt: "" },
        { title: "Sexistential", artist: "Robyn", yt: "" },
        { title: "Soma", artist: "Skrillex", yt: "" },
        { title: "WOR$T GIRL IN AMERICA", artist: "Slayyyter", yt: "" },
        { title: "Deadbeat", artist: "Tame Impala", yt: "" }
      ]
    },

    // ---------------- ROCK / ALTERNATIVO ----------------
    {
      id: "rock-perf", group: "Rock / Alternativo", name: "Melhor Performance de Rock", en: "Best Rock Performance", kind: "song",
      nominees: [
        { title: "Sarniezz", artist: "Angine de Poitrine", yt: "" },
        { title: "Lost Boys", artist: "Phoebe Bridgers", yt: "" },
        { title: "Trinidad", artist: "Geese", yt: "" },
        { title: "what's wrong with me", artist: "Olivia Rodrigo, Robert Smith", yt: "" },
        { title: "In The Stars", artist: "The Rolling Stones", yt: "" }
      ]
    },
    {
      id: "rock-song", group: "Rock / Alternativo", name: "Melhor Canção de Rock", en: "Best Rock Song", kind: "song",
      nominees: [
        { title: "In the Stars", artist: "The Rolling Stones", yt: "" },
        { title: "Lost Boys", artist: "Phoebe Bridgers", yt: "" },
        { title: "My Only Angel", artist: "Aerosmith, YUNGBLUD", yt: "" },
        { title: "Streets of Minneapolis", artist: "Bruce Springsteen", yt: "" },
        { title: "Trinidad", artist: "Geese", yt: "" },
        { title: "what's wrong with me", artist: "Olivia Rodrigo, Robert Smith", yt: "" },
        { title: "Your Favorite Toy", artist: "Foo Fighters", yt: "" }
      ]
    },
    {
      id: "rock-album", group: "Rock / Alternativo", name: "Melhor Álbum de Rock", en: "Best Rock Album", kind: "album",
      nominees: [
        { title: "Vol. II", artist: "Angine de Poitrine", yt: "" },
        { title: "Your Favorite Toy", artist: "Foo Fighters", yt: "" },
        { title: "The Wow! Signal", artist: "Muse", yt: "" },
        { title: "Foreign Tongues", artist: "The Rolling Stones", yt: "" },
        { title: "Frozen Charlotte", artist: "Jack White", yt: "" }
      ]
    },
    {
      id: "alt-perf", group: "Rock / Alternativo", name: "Melhor Performance de Música Alternativa", en: "Best Alternative Music Performance", kind: "song",
      nominees: [
        { title: "Fabienk", artist: "Angine de Poitrine", yt: "" },
        { title: "Kill Me", artist: "Phoebe Bridgers", yt: "" },
        { title: "Au Pays Du Cocaine", artist: "Geese", yt: "" },
        { title: "Reliquia", artist: "ROSALÍA", yt: "" },
        { title: "Showbiz", artist: "Hayley Williams", yt: "" }
      ]
    },
    {
      id: "alt-album", group: "Rock / Alternativo", name: "Melhor Álbum de Música Alternativa", en: "Best Alternative Music Album", kind: "album",
      nominees: [
        { title: "I Must Be Dreaming", artist: "Alabama Shakes", yt: "" },
        { title: "Lost Weekend", artist: "Phoebe Bridgers", yt: "" },
        { title: "Music, Fashion, Film", artist: "Charli xcx", yt: "" },
        { title: "Getting Killed", artist: "Geese", yt: "" },
        { title: "The Mountain", artist: "Gorillaz", yt: "" },
        { title: "LUX (Complete Works)", artist: "ROSALÍA", yt: "" }
      ]
    },

    // ---------------- R&B ----------------
    {
      id: "rnb-solo", group: "R&B", name: "Melhor Performance Solo de R&B", en: "Best R&B Solo Performance", kind: "song",
      nominees: [
        { title: "MORNING DEW (DONK)", artist: "Beyoncé", yt: "" },
        { title: "Out the Window", artist: "Kehlani", yt: "" },
        { title: "Let Me", artist: "Victoria Monét", yt: "" },
        { title: "Pressha", artist: "Jill Scott", yt: "" },
        { title: "What You Need", artist: "Tems", yt: "" }
      ]
    },
    {
      id: "rnb-song", group: "R&B", name: "Melhor Canção de R&B", en: "Best R&B Song", kind: "song",
      nominees: [
        { title: "Let Me", artist: "Victoria Monét", yt: "" },
        { title: "My Muse", artist: "Leon Thomas", yt: "" },
        { title: "Out The Window", artist: "Kehlani", yt: "" },
        { title: "Pressha", artist: "Jill Scott", yt: "" },
        { title: "What You Need", artist: "Tems", yt: "" }
      ]
    },
    {
      id: "rnb-album", group: "R&B", name: "Melhor Álbum de R&B", en: "Best R&B Album", kind: "album",
      nominees: [
        { title: "Brown (The Chocolate Edition)", artist: "Chris Brown", yt: "" },
        { title: "When the City Sleeps", artist: "Alex Isley", yt: "" },
        { title: "Kehlani", artist: "Kehlani", yt: "" },
        { title: "Saturday Night", artist: "PJ Morton", yt: "" },
        { title: "To Whom This May Concern", artist: "Jill Scott", yt: "" }
      ]
    },

    // ---------------- RAP ----------------
    {
      id: "rap-perf", group: "Rap", name: "Melhor Performance de Rap", en: "Best Rap Performance", kind: "song",
      nominees: [
        { title: "Good Flirts", artist: "Baby Keem feat. Kendrick Lamar & Momo Boyd", yt: "" },
        { title: "Errtime", artist: "Cardi B", yt: "" },
        { title: "Run It Back!!", artist: "De La Soul feat. Nas", yt: "" },
        { title: "Let 'Em Know", artist: "T.I.", yt: "" },
        { title: "Body", artist: "Don Toliver", yt: "" }
      ]
    },
    {
      id: "melodic-rap", group: "Rap", name: "Melhor Performance de Rap Melódico", en: "Best Melodic Rap Performance", kind: "song",
      nominees: [
        { title: "This Woman", artist: "Busta Rhymes & J Dilla feat. D'Angelo", yt: "" },
        { title: "Safe", artist: "Cardi B feat. Kehlani", yt: "" },
        { title: "girl, get up.", artist: "Doechii feat. SZA", yt: "" },
        { title: "E85", artist: "Don Toliver", yt: "" },
        { title: "Watching Us", artist: "Wale feat. Leon Thomas", yt: "" }
      ]
    },
    {
      id: "rap-song", group: "Rap", name: "Melhor Canção de Rap", en: "Best Rap Song", kind: "song",
      nominees: [
        { title: "E85", artist: "Don Toliver", yt: "" },
        { title: "Errtime", artist: "Cardi B", yt: "" },
        { title: "girl, get up.", artist: "Doechii feat. SZA", yt: "" },
        { title: "LET 'EM KNOW", artist: "T.I.", yt: "" },
        { title: "Spend Dat", artist: "Yung Miami", yt: "" }
      ]
    },
    {
      id: "rap-album", group: "Rap", name: "Melhor Álbum de Rap", en: "Best Rap Album", kind: "album",
      nominees: [
        { title: "Dillagence II", artist: "Busta Rhymes & J Dilla", yt: "" },
        { title: "Am I the Drama?", artist: "Cardi B", yt: "" },
        { title: "God Gotta Afro & Gold Hoops", artist: "Rapsody", yt: "" },
        { title: "OCTANE", artist: "Don Toliver", yt: "" },
        { title: "everything is a lot.", artist: "Wale", yt: "" },
        { title: "Bully", artist: "Ye (Kanye West)", yt: "" }
      ]
    },

    // ---------------- COUNTRY ----------------
    {
      id: "country-solo", group: "Country", name: "Melhor Performance Solo Country", en: "Best Country Solo Performance", kind: "song",
      nominees: [
        { title: "The Whole World", artist: "Vince Gill", yt: "" },
        { title: "Choosin' Texas", artist: "Ella Langley", yt: "" },
        { title: "Dry Spell", artist: "Kacey Musgraves", yt: "" },
        { title: "Can't Sit Still", artist: "Lainey Wilson", yt: "" },
        { title: "Gary", artist: "Stephen Wilson Jr.", yt: "" }
      ]
    },
    {
      id: "country-duo", group: "Country", name: "Melhor Performance Country em Dupla/Grupo", en: "Best Country Duo/Group Performance", kind: "song",
      nominees: [
        { title: "Butterfly", artist: "Zac Brown Band feat. Dolly Parton", yt: "" },
        { title: "Here", artist: "Mumford & Sons feat. Chris Stapleton", yt: "" },
        { title: "Horses And Divorces", artist: "Kacey Musgraves feat. Miranda Lambert", yt: "" },
        { title: "Light Of A Clear Blue Morning", artist: "Dolly Parton feat. Lainey Wilson, Miley Cyrus, Queen Latifah & Reba McEntire", yt: "" },
        { title: "Phone, Keys, Wallet", artist: "Lainey Wilson, John Mayer", yt: "" }
      ]
    },
    {
      id: "country-song", group: "Country", name: "Melhor Canção Country", en: "Best Country Song", kind: "song",
      nominees: [
        { title: "Beautiful Things", artist: "Megan Moroney", yt: "" },
        { title: "Choosin' Texas", artist: "Ella Langley", yt: "" },
        { title: "Dry Spell", artist: "Kacey Musgraves", yt: "" },
        { title: "Hardwired", artist: "Stephen Wilson Jr.", yt: "" },
        { title: "Phone, Keys, Wallet", artist: "Lainey Wilson, John Mayer", yt: "" }
      ]
    },
    {
      id: "country-album", group: "Country", name: "Melhor Álbum Country Contemporâneo", en: "Best Contemporary Country Album", kind: "album",
      nominees: [
        { title: "Mount Pleasant", artist: "Kelsea Ballerini", yt: "" },
        { title: "Cherry Valley", artist: "Carter Faith", yt: "" },
        { title: "Dandelion", artist: "Ella Langley", yt: "" },
        { title: "Cloud 9", artist: "Megan Moroney", yt: "" },
        { title: "Middle of Nowhere", artist: "Kacey Musgraves", yt: "" }
      ]
    },

    // ---------------- LATINO / GLOBAL ----------------
    {
      id: "latin-pop", group: "Latino / Global", name: "Melhor Álbum de Pop Latino", en: "Best Latin Pop Album", kind: "album",
      nominees: [
        { title: "NO ME ARREPIENTO DE SENTIR TANTO", artist: "KAROL G", yt: "" },
        { title: "FEMME FATALE", artist: "Mon Laferte", yt: "" },
        { title: "MUDA", artist: "Carín León", yt: "" },
        { title: "¿Dónde Es El After?", artist: "Rawayana", yt: "" },
        { title: "Bendito Verano", artist: "ELENA ROSE", yt: "" }
      ]
    },
    {
      id: "urbana", group: "Latino / Global", name: "Melhor Álbum de Música Urbana", en: "Best Música Urbana Album", kind: "album",
      nominees: [
        { title: "Cosa Nuestra: Capítulo 0", artist: "Rauw Alejandro", yt: "" },
        { title: "Omerta", artist: "J Balvin, Ryan Castro", yt: "" },
        { title: "Hopi Sendé", artist: "Ryan Castro", yt: "" },
        { title: "OMAKASE", artist: "Álvaro Díaz", yt: "" },
        { title: "El Green Print: La Saga (Disc 1) — Feid vs Ferxxo", artist: "Feid", yt: "" },
        { title: "Do Not Disturb: Late Checkout", artist: "Young Miko", yt: "" }
      ]
    },
    {
      id: "african", group: "Latino / Global", name: "Melhor Performance de Música Africana", en: "Best African Music Performance", kind: "song",
      nominees: [
        { title: "Gratitude", artist: "Asake", yt: "" },
        { title: "Aye Kan (Are You Coming Back?)", artist: "Angélique Kidjo & Ayra Starr", yt: "" },
        { title: "No Tradition, No Africa", artist: "King Ayisoba feat. Rocky Dawuni", yt: "" },
        { title: "Big Daddy", artist: "Tems", yt: "" },
        { title: "Jogodo", artist: "Wizkid & Asake", yt: "" }
      ]
    },
    {
      id: "global", group: "Latino / Global", name: "Melhor Performance de Música Global", en: "Best Global Music Performance", kind: "song",
      nominees: [
        { title: "Varuvaaiy", artist: "Devan Ekambaram feat. Susha", yt: "" },
        { title: "Una Flor En Cada Estrella", artist: "Kerreke, Mireya, Alex E. Chávez", yt: "" },
        { title: "Bando [Orchestral]", artist: "Angélique Kidjo feat. Pharrell Williams & Quavo", yt: "" },
        { title: "Porcelana", artist: "ROSALÍA, Dougie F", yt: "" },
        { title: "Dai Dai", artist: "Shakira, Burna Boy", yt: "" }
      ]
    },
    {
      id: "asian-pop", group: "Latino / Global", name: "Melhor Performance de Pop Asiático", en: "Best Asian Pop Music Performance", kind: "song",
      nominees: [
        { title: "Sunset Kiss", artist: "BABYMETAL, Polyphia", yt: "" },
        { title: "Unang Kilig", artist: "BINI", yt: "" },
        { title: "Bang Bang", artist: "IVE", yt: "" },
        { title: "404 (New Era)", artist: "KiiiKiii", yt: "" },
        { title: "Yes", artist: "LISA", yt: "" },
        { title: "Visa", artist: "SB19", yt: "" }
      ]
    },

    // ---------------- OUTROS ----------------
    {
      id: "visual-song", group: "Outros", name: "Melhor Canção para Mídia Visual", en: "Best Song Written for Visual Media", kind: "song",
      nominees: [
        { title: "House (Wuthering Heights)", artist: "Charli xcx feat. John Cale", yt: "" },
        { title: "I Knew It, I Knew You (Toy Story 5)", artist: "Taylor Swift", yt: "" },
        { title: "Need Someone (The Pitt)", artist: "Andrew Bird, Gavin Brivik", yt: "" },
        { title: "No Place Like Home (Wicked: For Good)", artist: "Cynthia Erivo", yt: "" },
        { title: "RUNWAY (O Diabo Veste Prada 2)", artist: "Lady Gaga, Doechii", yt: "" }
      ]
    },
    {
      id: "music-video", group: "Outros", name: "Melhor Videoclipe", en: "Best Music Video", kind: "song",
      nominees: [
        { title: "Lost Boys", artist: "Phoebe Bridgers", yt: "" },
        { title: "Storm", artist: "GENER8ION, Yung Lean", yt: "" },
        { title: "hate that i made you love me", artist: "Ariana Grande", yt: "" },
        { title: "Click Clack Symphony.", artist: "RAYE feat. Hans Zimmer", yt: "" },
        { title: "Berghain", artist: "ROSALÍA feat. Björk & Yves Tumor", yt: "" }
      ]
    },
    {
      id: "album-cover", group: "Outros", name: "Melhor Capa de Álbum", en: "Best Album Cover", kind: "album",
      nominees: [
        { title: "God Gotta Afro & Gold Hoops", artist: "Rapsody", yt: "" },
        { title: "Sad and Beautiful World", artist: "Mavis Staples", yt: "" },
        { title: "This Mirror Weighs a Ton", artist: "Interpol", yt: "" },
        { title: "West End Girl", artist: "Lily Allen", yt: "" },
        { title: "WHAT HAPPENED TO THE STREETS?", artist: "21 Savage", yt: "" }
      ]
    }
  ]
};
