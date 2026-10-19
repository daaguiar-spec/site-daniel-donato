/* =====================================================================
   CONTEÚDO DA APRESENTAÇÃO — DANIEL DONATO
   Edite só os textos entre aspas. Não apague vírgulas, aspas ou chaves.
   Salvou e publicou → a página atualiza sozinha.
   ===================================================================== */

window.CONTEUDO = {

  /* ---------- CONTATO PADRÃO (usado quando o link não traz vendedor) ---------- */
  whatsapp: "559292383440",            // só números, com 55 + DDD
  email: "comercial@sinapseonline.com",
  telefoneExibido: "+55 92 98238-3440",

  /* ---------- 1 · CAPA ---------- */
  capa: {
    titulo: "Transforme o atendimento da sua empresa em uma experiência que o seu cliente",
    destaque: "nunca esquecerá.",
    subtitulo: "Palestras, treinamentos e imersões que traduzem os princípios da Disney para a realidade do seu negócio.",
    foto: "img/daniel-capa.webp",       // foto recortada, fica dentro da pasta apresentacao/img
    fundo: "/img/castelo.webp"
  },

  /* ---------- 2 · QUEM É O DANIEL ---------- */
  sobre: {
    titulo: "O jeito Disney de encantar,",
    destaque: "traduzido para o seu negócio.",
    texto: "Palestrante e consultor em Experiência do Cliente, Cultura e Desenvolvimento de Pessoas, com metodologia própria em 5 frentes: cultura, pessoas, atendimento, liderança e experiência.",
    foto: "/img/palestra.webp",
    numeros: [
      { valor: 20,    prefixo: "+", sufixo: "",      legenda: "visitas técnicas à Disney" },
      { valor: 50,    prefixo: "+", sufixo: " mil",  legenda: "profissionais transformados" },
      { valor: 20,    prefixo: "",  sufixo: " anos", legenda: "de consultoria empresarial" },
      { valor: 10,    prefixo: "",  sufixo: " anos", legenda: "no palco" }
    ],
    /* Credenciais: cada grupo vira uma coluna com título. */
    credenciais: [
      { grupo: "Certificações internacionais", itens: [
          "Guestologia Business · Seeds of Dreams Institute",
          "Backstage Magic e Keys to the Kingdom · Disney Institute"
      ]},
      { grupo: "Formação", itens: [
          "Administração",
          "MBA em Marketing e Relacionamento com o Cliente"
      ]},
      { grupo: "Autor", itens: [
          "“Checklist Cliente Feliz: Atendimento de Alto Impacto”"
      ]}
    ]  },

  /* ---------- 3 · VÍDEOS ----------
     Cole o link do YouTube (qualquer formato: youtube.com/watch?v=..., youtu.be/..., shorts).
     O PRIMEIRO da lista é o destaque. Linhas com link vazio não aparecem.
     Se nenhum vídeo tiver link, a seção inteira fica escondida. */
  videos: [
    { link: "", titulo: "Best of · Daniel Donato no palco", detalhe: "Evento · cidade · ano" },
    { link: "", titulo: "Atendimento Mágico · Um case Disney", detalhe: "Evento · cidade · ano" },
    { link: "", titulo: "Liderança que Inspira", detalhe: "Evento · cidade · ano" },
    { link: "", titulo: "Imersão MagicDay", detalhe: "Evento · cidade · ano" }
  ],

  /* ---------- 4 · SOLUÇÕES ---------- */
  solucoes: [
    {
      etiqueta: "I · Palestra",
      titulo: "Eventos e convenções",
      texto: "Para abrir, encerrar ou dar energia ao seu evento, com histórias reais dos bastidores.",
      foto: "/img/eventos.webp",
      itens: ["Atendimento Mágico · Um case Disney", "Liderança que Inspira", "Se Walt Disney fosse da Saúde?"],
      destaque: false
    },
    {
      etiqueta: "II · In company",
      titulo: "Treinamentos",
      texto: "Programas desenhados para a realidade e os desafios da sua equipe, com prática no dia a dia.",
      foto: "/img/in-company.webp",
      itens: ["Atendimento e vendas", "Liderança e cultura", "Saúde e humanização"],
      destaque: false
    },
    {
      etiqueta: "III · Imersão",
      titulo: "MagicDay",
      texto: "Um dia inteiro para viver na prática o padrão de encantamento que fideliza.",
      foto: "/img/imersao.webp",
      itens: ["Diagnóstico do atendimento atual", "Novos padrões definidos em grupo", "Plano de ação para aplicar já"],
      destaque: true
    }
  ],

  /* ---------- 5 · PRESENÇA NO BRASIL ----------
     Os estados atendidos são a lista "estados" logo abaixo (siglas). {n} vira "9 estados" automaticamente. */
  presenca: {
    etiqueta: "Onde já atuamos",
    titulo: "Presença",
    destaque: "Nacional.",
    texto: "Treinamentos já realizados em {n}, presencial e online."
  },

  /* ---------- 5 · QUEM CONFIA ---------- */
  /* Como mostrar os logos: "vitrine" (faixa clara, logos em cinza), "mural" (cartões) ou "faixas" (deslizando). */
  clientesEstilo: "vitrine",
  clientesVitrine: {
    etiqueta: "Clientes",
    titulo: "Quem já viveu a experiência",
    texto: "Indústrias, escolas, órgãos públicos, hotéis e varejo que confiaram no Daniel para desenvolver pessoas e transformar o atendimento."
  },

  estados: ["CE", "SP", "PR", "DF", "AM", "SE", "SC", "RN", "PI"],

  clientes: [
    { nome: "Caixa", logo: "/img/clientes/caixa.png" },
    { nome: "Tribunal de Justiça do Ceará", logo: "/img/clientes/tjce.png" },
    { nome: "Cagece", logo: "/img/clientes/cagece.png" },
    { nome: "Hemoce", logo: "/img/clientes/hemoce.png" },
    { nome: "Tracbel", logo: "/img/clientes/tracbel.png" },
    { nome: "Grupo SH", logo: "/img/clientes/grupo-sh.png" },
    { nome: "NET", logo: "/img/clientes/net.png" },
    { nome: "Fortes Tecnologia", logo: "/img/clientes/fortes-tecnologia.png" },
    { nome: "Colégio Christus", logo: "/img/clientes/christus.png" },
    { nome: "Colégio Lourenço Filho", logo: "/img/clientes/colegio-lourenco-filho.png" },
    { nome: "Colégio Eça de Queirós", logo: "/img/clientes/colegio-eca-de-queiros.png" },
    { nome: "Aquaville Resort", logo: "/img/clientes/aquaville-resort.png" },
    { nome: "Praiano Hotel", logo: "/img/clientes/praiano-hotel.png" },
    { nome: "RioMar Kennedy", logo: "/img/clientes/riomar-kennedy.png" },
    { nome: "Trusted Estates", logo: "/img/clientes/trusted-estates.png" },
    { nome: "Prefeitura de Japurá", logo: "/img/clientes/prefeitura-de-japura.png" },
    { nome: "Prefeitura de Lábrea", logo: "/img/clientes/prefeitura-de-labrea.png" },
    { nome: "SEMSA", logo: "/img/clientes/semsa.png" },
    { nome: "Handara", logo: "/img/clientes/handara.png" },
    { nome: "KDM Kanto da Moda", logo: "/img/clientes/kdm-kanto-da-moda.png" },
    { nome: "EDR Distribuidora", logo: "/img/clientes/edr-distribuidora.png" },
    { nome: "Grupo Transloc", logo: "/img/clientes/grupo-transloc.png" },
    { nome: "Atitude Serviços", logo: "/img/clientes/atitude-servicos.png" },
    { nome: "Nuths", logo: "/img/clientes/nuths.png" },
    { nome: "Máxima Saneamento", logo: "/img/clientes/maxima-saneamento.png" },
    { nome: "JAP Roteiros Exclusivos", logo: "/img/clientes/jap-roteiros-exclusivos.png" },
    { nome: "Reforçar", logo: "/img/clientes/reforcar.png" }
  ],

  /* Depoimentos: preencha texto, nome e cargo. Deixe "foto" vazia se não tiver.
     Depoimentos com texto vazio não aparecem. Ideal: 2 ou 3. */
  depoimentos: [
    { texto: "", nome: "", cargo: "", foto: "" },
    { texto: "", nome: "", cargo: "", foto: "" },
    { texto: "", nome: "", cargo: "", foto: "" }
  ],

  /* ---------- 6 · COMO FUNCIONA ---------- */
  passos: [
    { titulo: "Você conta o desafio", texto: "O evento, o público e o resultado que você espera." },
    { titulo: "O conteúdo é adaptado", texto: "Tema, exemplos e formato ajustados ao seu setor e à sua equipe." },
    { titulo: "A experiência acontece", texto: "Presencial ou online, em qualquer lugar do Brasil." }
  ],

  /* ---------- 7 · VAMOS CONVERSAR ---------- */
  final: {
    titulo: "Leve essa experiência",
    destaque: "para a sua equipe.",
    texto: "Conte sobre o seu evento ou desafio e receba uma proposta personalizada.",
    botao: "Falar no WhatsApp"
  }
};
