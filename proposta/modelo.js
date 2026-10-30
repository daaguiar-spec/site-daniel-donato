/* =====================================================================
   MODELO DA PROPOSTA E DO CONTRATO — DANIEL DONATO
   Este é o ponto de partida de toda proposta nova criada no painel.
   No painel você muda tudo por cliente; aqui fica só o padrão.

   No texto das cláusulas, as palavras entre {{ }} são trocadas sozinhas
   pelos dados da proposta e do cliente:
   {{contratante_razao}} {{contratante_cnpj}} {{contratante_endereco}}
   {{contratante_representante}} {{contratante_cpf}}
   {{contratada_razao}} {{contratada_cnpj}} {{contratada_endereco}} {{contratada_representante}}
   {{solucao}} {{data_evento}} {{local}} {{carga_horaria}} {{participantes}} {{formato}}
   {{valor_total}} {{valor_extenso}} {{pagamento}} {{forma_pagamento}} {{estrutura}}
   {{cidade_foro}} {{data_hoje}}

   ATENÇÃO: o texto do contrato abaixo é um modelo inicial. Peça para o
   seu advogado revisar antes de usar com clientes.
   ===================================================================== */

window.MODELO_PROPOSTA = {

  /* Dados da CONTRATADA (você). Aparecem no contrato. */
  contratada: {
    razao: "[Razão social da sua empresa]",
    cnpj: "[CNPJ]",
    endereco: "[Endereço completo]",
    representante: "Daniel Donato",
    email: "comercial@sinapseonline.com"
  },

  cidadeForo: "Fortaleza/CE",

  /* Como assinar pelo gov.br (aparece no contrato, em passos). */
  passosGovBr: [
    "Toque em “Baixar PDF” e salve o contrato no celular ou no computador.",
    "Abra assinador.iti.br e entre com a sua conta gov.br (nível prata ou ouro).",
    "Escolha o arquivo do contrato, posicione a assinatura e confirme com o código que chega no app gov.br.",
    "Baixe o arquivo assinado e envie para nós pelo botão “Já assinei”."
  ],

  /* Proposta nova começa assim. */
  dados: {
    solucao: "Treinamento Atendimento Mágico",
    apresentacao: "Uma experiência in company inspirada nos princípios Disney de encantamento, adaptada à realidade da sua equipe.",
    /* Blocos de conteúdo (aparecem antes dos valores).
       Nos títulos, o trecho entre *asteriscos* fica em dourado itálico. */
    experiencia: {
      titulo: "Uma experiência para transformar *a forma de atender.*",
      texto: "Uma palestra inspiradora, baseada em princípios da Cultura Disney, para ampliar a percepção sobre atendimento, relacionamento e experiência do cliente.",
      vivenciado: [
        "Cases e aprendizados da Disney",
        "Princípios da experiência do cliente",
        "Cultura do encantamento e atenção aos detalhes",
        "Conexão, comunicação e superação de expectativas"
      ],
      formato: [
        "Storytelling envolvente",
        "Interatividade e participação ativa do público"
      ]
    },
    objetivos: [
      "Mais consciência sobre o impacto de cada interação com o cliente",
      "Uma postura mais protagonista no atendimento",
      "Comunicação mais cuidadosa e intencional",
      "Atenção aos pequenos detalhes que fazem diferença na experiência",
      "Mais conexão entre atendimento, relacionamento e resultado"
    ],
    resultados: [
      { titulo: "Perceber", texto: "Que cada contato com o cliente constrói ou destrói valor." },
      { titulo: "Assumir", texto: "Uma postura mais protagonista diante das situações do dia a dia." },
      { titulo: "Encantar", texto: "Entendendo que experiência não depende apenas de grandes ações, mas de pequenos detalhes." },
      { titulo: "Comunicar", texto: "De maneira mais humana, clara e intencional." },
      { titulo: "Agir", texto: "Transformando os aprendizados em comportamentos observáveis." }
    ],
    detalhes: {
      formato: "Presencial · in company",
      data_evento: "A combinar",
      local: "Na sua empresa",
      carga_horaria: "8 horas",
      participantes: "Até 40 pessoas"
    },
    inclui: [
      "Certificado digital para os participantes.",
      "Versão digital do livro “Checklist Cliente Feliz”",
      "E-book “Além dos Bastidores da Disney”",
      "Material de apoio digital para os participantes."
    ],
    estrutura: [
      "Sala com cadeiras para todos os participantes",
      "Projetor ou TV com entrada HDMI",
      "Som com microfone sem fio",
      "Mesa de apoio para o palestrante"
    ],
    naoInclui: [
      "Passagens, hospedagem e alimentação fora de Fortaleza (quando houver)"
    ],
    itens: [
      { nome: "Treinamento Atendimento Mágico", descricao: "8 horas · até 40 participantes", valor: 12000 }
    ],
    desconto: 0,
    pagamento: [
      { percentual: 50, quando: "na assinatura do contrato" },
      { percentual: 50, quando: "ao final do treinamento" }
    ],
    formaPagamento: "PIX ou transferência bancária",
    validadeDias: 15,
    observacoes: ""
  },

  /* Contrato padrão. Cada item vira uma cláusula numerada. */
  contrato: {
    clausulas: [
      { titulo: "Das partes",
        texto: "CONTRATANTE: {{contratante_razao}}, inscrita no CNPJ sob o nº {{contratante_cnpj}}, com sede em {{contratante_endereco}}, neste ato representada por {{contratante_representante}}, CPF {{contratante_cpf}}.\nCONTRATADA: {{contratada_razao}}, inscrita no CNPJ sob o nº {{contratada_cnpj}}, com sede em {{contratada_endereco}}, neste ato representada por {{contratada_representante}}." },
      { titulo: "Do objeto",
        texto: "A CONTRATADA prestará à CONTRATANTE o serviço de {{solucao}}, no formato {{formato}}, com carga horária de {{carga_horaria}}, para {{participantes}}, conforme a proposta comercial aceita pela CONTRATANTE, que integra este contrato." },
      { titulo: "Da data e do local",
        texto: "O serviço será realizado em {{data_evento}}, em {{local}}. Qualquer mudança de data ou local deverá ser combinada por escrito entre as partes." },
      { titulo: "Do valor e da forma de pagamento",
        texto: "Pelo serviço, a CONTRATANTE pagará à CONTRATADA o valor total de {{valor_total}} ({{valor_extenso}}), da seguinte forma: {{pagamento}}. Os pagamentos serão feitos por {{forma_pagamento}}, mediante nota fiscal." },
      { titulo: "Das obrigações da CONTRATADA",
        texto: "Realizar o serviço com qualidade e pontualidade; adaptar o conteúdo à realidade da CONTRATANTE; fornecer o material de apoio previsto na proposta; manter sigilo sobre as informações da CONTRATANTE às quais tiver acesso." },
      { titulo: "Das obrigações da CONTRATANTE",
        texto: "Fornecer as informações necessárias para a preparação do conteúdo; disponibilizar a lista de participantes e a seguinte estrutura: {{estrutura}}; efetuar os pagamentos nas datas combinadas." },
      { titulo: "Do cancelamento e da remarcação",
        texto: "Remarcações solicitadas pela CONTRATANTE com pelo menos 15 (quinze) dias de antecedência não geram custo, ficando a nova data sujeita à agenda da CONTRATADA. Em caso de cancelamento pela CONTRATANTE, o valor pago na assinatura não será devolvido, servindo como compensação pela reserva da agenda e pela preparação do conteúdo." },
      { titulo: "Do uso de imagem",
        texto: "A CONTRATANTE autoriza a CONTRATADA a registrar e divulgar fotos e vídeos do evento em seus canais, sem exposição de informações confidenciais. A CONTRATANTE pode pedir, por escrito, que a divulgação não aconteça." },
      { titulo: "Da proteção de dados",
        texto: "As partes tratarão os dados pessoais envolvidos neste contrato conforme a Lei nº 13.709/2018 (LGPD), apenas para a execução do serviço." },
      { titulo: "Da assinatura eletrônica",
        texto: "As partes reconhecem como válida a assinatura deste contrato por meio eletrônico, inclusive pela assinatura eletrônica avançada do gov.br, nos termos da Lei nº 14.063/2020." },
      { titulo: "Do foro",
        texto: "Fica eleito o foro da comarca de {{cidade_foro}} para resolver qualquer questão relativa a este contrato." }
    ]
  }
};
