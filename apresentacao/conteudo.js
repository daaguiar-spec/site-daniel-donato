/* =====================================================================
   CONTEÚDO DA APRESENTAÇÃO — DANIEL DONATO
   Edite só os textos entre aspas. Não apague vírgulas, aspas ou chaves.
   Salvou e publicou → a página atualiza sozinha.
   ===================================================================== */

window.CONTEUDO = {

  /* ---------- CONTATO PADRÃO (usado quando o link não traz vendedor) ---------- */
  whatsapp: "559292383440",            // só números, com 55 + DDD
  email: "comercial@sinapseonline.com",
  instagram: "danieldonato.com.br",     // só o usuário, sem @ (deixe vazio para esconder)
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

  /* ---------- 3 · PORTFÓLIO EM VÍDEO ----------
     Cole o link do YouTube (qualquer formato: youtube.com/watch?v=..., youtu.be/..., shorts/...).
     formato: "Palestras", "Imersões", "In company" ou "Eventos" (vira as abas de filtro).
     destaque: true no vídeo principal. Linhas com link vazio não aparecem.
     Sem nenhum link (vídeos e shorts), a seção inteira fica escondida. */
  videosSecao: {
    etiqueta: "Portfólio em vídeo",
    titulo: "Veja a experiência",
    destaque: "acontecendo.",
    shortsTitulo: "Momentos rápidos"
  },
  videos: [
    { arquivo: "videos/expoprag-abertura.mp4", capa: "videos/expoprag-abertura.jpg", titulo: "Palestra show na abertura da Expoprag", detalhe: "Expoprag Norte e Nordeste · Palestrante da abertura", formato: "Palestras", duracao: "1:12", destaque: true }
    /* Também aceita link do YouTube: { link: "https://youtu.be/...", titulo: "...", ... } */
  ],
  /* Vídeos curtos em pé. Use "arquivo" para vídeos da pasta apresentacao/videos (com "capa" = imagem de capa)
     ou "link" para um YouTube Shorts. Aparecem na faixa "Momentos rápidos". */
  shorts: [
    { arquivo: "videos/jap-ribeirao-preto.mp4", capa: "videos/jap-ribeirao-preto.jpg", titulo: "Experiência JAP · Ribeirão Preto (SP)" },
    { arquivo: "videos/imersao-magicday.mp4", capa: "videos/imersao-magicday.jpg", titulo: "Imersão MagicDay" },
    { arquivo: "videos/praiano-hotel.mp4", capa: "videos/praiano-hotel.jpg", titulo: "Treinamento Praiano Hotel" },
    { arquivo: "videos/atendimento-magico.mp4", capa: "videos/atendimento-magico.jpg", titulo: "Atendimento Mágico · Um case Disney" },
    { arquivo: "videos/crie-empreendedores.mp4", capa: "videos/crie-empreendedores.jpg", titulo: "CRIE · Clube de Empreendedores" },
    { arquivo: "videos/mickey-advogado.mp4", capa: "videos/mickey-advogado.jpg", titulo: "Se o Mickey fosse Advogado · Renan Azevedo" }
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

  /* ---------- DEPOIMENTOS EM VÍDEO ----------
     Vídeos na pasta apresentacao/videos/depoimentos. A ordem da lista é a ordem na tela.
     frase: trecho curto que aparece sobre o vídeo (opcional). logo: opcional (sem logo, mostra as iniciais).
     horizontal: true para vídeos deitados (abrem em tela larga). foco: posição do rosto no cartão ("30%" = mais à esquerda). */
  depoimentosVideo: {
    etiqueta: "Depoimentos",
    titulo: "Quem viveu,",
    destaque: "recomenda.",
    texto: "Ouça de quem já levou a experiência para a equipe.",
    itens: [
      { arquivo: "videos/depoimentos/marco-mourao.mp4", capa: "videos/depoimentos/marco-mourao.jpg", nome: "Marco Mourão", cargo: "CEO", empresa: "JAP Roteiros Exclusivos", local: "São Paulo", logo: "/img/clientes/jap-roteiros-exclusivos.png", frase: "" },
      { arquivo: "videos/depoimentos/danilo-dias.mp4", capa: "videos/depoimentos/danilo-dias.jpg", nome: "Dr. Danilo Dias", cargo: "Cirurgião Plástico", empresa: "", logo: "", frase: "", horizontal: true, foco: "44%" },
      { arquivo: "videos/depoimentos/patricia-dias.mp4", capa: "videos/depoimentos/patricia-dias.jpg", nome: "Patrícia Dias", cargo: "Diretora", empresa: "Blue D SPA", logo: "", frase: "", horizontal: true, foco: "52%" },
      { arquivo: "videos/depoimentos/tour-leader-jap.mp4", capa: "videos/depoimentos/tour-leader-jap.jpg", nome: "", cargo: "Tour Leader", empresa: "JAP Roteiros Exclusivos", logo: "/img/clientes/jap-roteiros-exclusivos.png", frase: "" },
      { arquivo: "videos/depoimentos/felipe-craveiro.mp4", capa: "videos/depoimentos/felipe-craveiro.jpg", nome: "Felipe Craveiro", cargo: "Executivo Comercial", empresa: "ACS Automação", logo: "", frase: "", horizontal: true, foco: "54%" },
      { arquivo: "videos/depoimentos/masterclass.mp4", capa: "videos/depoimentos/masterclass.jpg", nome: "Participantes", cargo: "Masterclass Atendimento Mágico", empresa: "", logo: "", frase: "", horizontal: true, foco: "46%" },
      { arquivo: "videos/depoimentos/colaboradora-praiano.mp4", capa: "videos/depoimentos/colaboradora-praiano.jpg", nome: "", cargo: "Colaboradora", empresa: "Praiano Hotel", logo: "/img/clientes/praiano-hotel.png", frase: "" }
    ]
  },

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
