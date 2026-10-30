/* =====================================================================
   MODELO DA PROPOSTA E DO CONTRATO — DANIEL DONATO
   Este é o ponto de partida de toda proposta nova criada no painel.
   No painel você muda tudo por cliente; aqui fica só o padrão.

   No texto das cláusulas, as palavras entre {{ }} são trocadas sozinhas
   pelos dados da proposta e do cliente:
   {{contratante_razao}} {{contratante_cnpj}} {{contratante_endereco}}
   {{contratante_representante}} {{contratante_cpf}} {{contratante_cargo}}
   {{contratada_razao}} {{contratada_cnpj}} {{contratada_endereco}} {{contratada_representante}}
   {{contratada_qualificacao}} {{contato_comprovante}}
   {{solucao}} {{data_evento}} {{local}} {{carga_horaria}} {{participantes}} {{formato}}
   {{valor_total}} {{valor_extenso}} {{pagamento}} {{parcelas_lista}} {{forma_pagamento}}
   {{dados_bancarios}} {{inclui}} {{estrutura}} {{cidade_foro}} {{data_hoje}}

   ATENÇÃO: o texto do contrato abaixo é um modelo inicial. Peça para o
   seu advogado revisar antes de usar com clientes.
   ===================================================================== */

window.MODELO_PROPOSTA = {

  /* Dados da CONTRATADA (você). Aparecem no contrato. */
  contratada: {
    razao: "SINAPSE CONSULTORIA EMPRESARIAL LTDA",
    cnpj: "11.277.870/0001-29",
    endereco: "Rua Leonardo Mota, 1394, Loja 06, Aldeota, Fortaleza/CE, CEP 60170-040",
    representante: "DANIEL DONATO DE AGUIAR",
    qualificacao: "brasileiro, casado, empresário, residente e domiciliado em Fortaleza/CE, CPF nº 844.346.003-20",
    comprovantes: "o e-mail comercial@sinapseonline.com ou o WhatsApp comercial (85) 99971-1108",
    email: "comercial@sinapseonline.com"
  },

  cidadeForo: "Fortaleza/CE",

  /* Dados para o cliente pagar (aparecem na aba Contrato, depois que você libera o contrato).
     nome e cidade vão dentro do código Pix (sem acento, até 25 e 15 letras). */
  pagamento: {
    pixChave: "11277870000129",
    pixTipo: "CNPJ",
    pixExibido: "11.277.870/0001-29",
    titular: "Sinapse Brasil",
    nome: "SINAPSE BRASIL",
    cidade: "Fortaleza",
    banco: "Nu Pagamentos S.A. (0260)",
    agencia: "0001",
    conta: "70785761-8"
  },

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
      { percentual: 50, quando: "em até 48 horas após a realização do treinamento" }
    ],
    formaPagamento: "PIX ou transferência bancária",
    validadeDias: 15,
    observacoes: ""
  },

  /* Contrato padrão (baseado no contrato usado com clientes, revisado em 30/10/2026).
     "abertura" vem antes das cláusulas; cada item de "clausulas" vira uma cláusula numerada.
     Use \n para pular linha. */
  contrato: {
    abertura: "Pelo presente instrumento particular, de um lado, {{contratante_razao}}, inscrita no CNPJ/CPF sob o nº {{contratante_cnpj}}, com sede em {{contratante_endereco}}, neste ato representada por {{contratante_representante}} ({{contratante_cargo}}), CPF nº {{contratante_cpf}}, doravante denominada CONTRATANTE, e, de outro lado, {{contratada_razao}}, inscrita no CNPJ sob o nº {{contratada_cnpj}}, com sede em {{contratada_endereco}}, neste ato representada por seu representante legal {{contratada_representante}}, {{contratada_qualificacao}}, doravante denominada CONTRATADA, celebram o presente contrato de prestação de serviços de {{solucao}}, que se regerá pelos termos e condições seguintes:",
    clausulas: [
      { titulo: "Do objeto",
        texto: "A CONTRATADA se compromete a realizar o serviço de {{solucao}}, nas seguintes condições: data e horário: {{data_evento}}; duração: {{carga_horaria}}; formato: {{formato}}; local: {{local}}; público: {{participantes}}.\nComo BÔNUS, os participantes receberão: {{inclui}}. Os materiais digitais serão enviados a um representante indicado pela CONTRATANTE.\nParágrafo único – Não haverá qualquer vínculo empregatício entre a CONTRATADA e a CONTRATANTE em razão da execução do serviço ora contratado." },
      { titulo: "Do valor e da forma de pagamento",
        texto: "Pelo serviço contratado, a CONTRATANTE pagará à CONTRATADA o valor total de {{valor_total}} ({{valor_extenso}}), da seguinte forma:\n{{parcelas_lista}}\nO pagamento da primeira parcela garante a reserva da data e do horário destinados à realização do serviço. Os pagamentos serão feitos por {{forma_pagamento}}, para a conta da CONTRATADA: {{dados_bancarios}}.\nParágrafo primeiro – A nota fiscal sobre o valor total será entregue à CONTRATANTE após o pagamento integral do serviço.\nParágrafo segundo – Nos valores acima estão incluídas todas e quaisquer despesas decorrentes de impostos, taxas, encargos sociais e outros ônus que recaiam sobre os serviços contratados.\nParágrafo terceiro – Para serviços realizados fora de Fortaleza/CE, as despesas de deslocamento, hospedagem e alimentação da CONTRATADA ficarão a cargo da CONTRATANTE, salvo se previsto de outra forma na proposta comercial.\nParágrafo quarto – A CONTRATANTE se compromete a enviar os comprovantes de pagamento, no mesmo dia em que forem efetuados, para {{contato_comprovante}}. Caso os pagamentos previstos nesta cláusula não sejam realizados, a CONTRATADA ficará automaticamente desobrigada de realizar o serviço." },
      { titulo: "Do certificado e da lista de participantes",
        texto: "A emissão e o envio do Certificado Digital de Participação são de responsabilidade da CONTRATADA.\nParágrafo único – Fica a cargo da CONTRATANTE enviar ao e-mail da CONTRATADA o NOME COMPLETO de todos os participantes em até 5 (cinco) dias úteis antes do evento." },
      { titulo: "Do uso de nome e imagem",
        texto: "A CONTRATADA concede à CONTRATANTE, e vice-versa, o direito de uso de seu nome e imagem exclusivamente para promoção e divulgação do evento em seus sites e redes sociais.\nParágrafo único – A CONTRATANTE autoriza a CONTRATADA a fazer registros de fotos e vídeos durante o evento e a utilizá-los em seu portfólio e em suas redes sociais, sem a divulgação de informações confidenciais da CONTRATANTE. Caso não concorde, a CONTRATANTE deverá informar por escrito antes do evento." },
      { titulo: "Das obrigações das partes",
        texto: "5.1 – Obrigações da CONTRATANTE:\n• Não impor à CONTRATADA qualquer atividade extra além da prevista na Cláusula 1ª;\n• Disponibilizar, durante o evento: {{estrutura}}, além de iluminação adequada e água mineral sem gás;\n• Não gravar o evento em áudio ou vídeo, seja para uso interno, seja para veiculação em qualquer mídia eletrônica privada ou pública, salvo autorização expressa e por escrito da CONTRATADA;\n• Manter em sigilo, não divulgando sob nenhuma forma ou pretexto, à mídia impressa, eletrônica ou a terceiros não incluídos na contratação, qualquer informação sobre a remuneração prevista neste contrato.\n5.2 – Obrigações da CONTRATADA:\n• Cumprir integralmente as atividades previstas na Cláusula 1ª deste contrato;\n• Utilizar os equipamentos disponibilizados pela CONTRATANTE de forma adequada e responsável;\n• Respeitar os prazos e horários estabelecidos para a realização do serviço;\n• Informar previamente à CONTRATANTE, quando solicitado, as necessidades técnicas e os materiais adicionais para a realização do serviço." },
      { titulo: "Das penalidades, do cancelamento e do caso fortuito ou força maior",
        texto: "Em caso de cancelamento unilateral e imotivado por parte da CONTRATANTE, será aplicada multa de 20% (vinte por cento) sobre o valor total do contrato, podendo o valor ser descontado dos pagamentos já realizados, com eventual restituição ou cobrança da diferença.\nEm caso de cancelamento unilateral e imotivado por parte da CONTRATADA, esta deverá devolver integralmente os valores recebidos, acrescidos de multa de 20% (vinte por cento) sobre o valor total do contrato.\nParágrafo único – Em caso de cancelamento por motivo de caso fortuito ou força maior, devidamente comprovado, não será aplicada multa, devendo as partes negociar a remarcação do serviço ou, não sendo possível, a devolução integral dos valores pagos." },
      { titulo: "Da remarcação",
        texto: "A remarcação da data do serviço, solicitada por qualquer das partes com pelo menos 15 (quinze) dias de antecedência, não gera custo nem multa, ficando a nova data sujeita ao acordo entre as partes e à agenda da CONTRATADA." },
      { titulo: "Da proteção de dados",
        texto: "As partes tratarão os dados pessoais envolvidos neste contrato, inclusive a lista de participantes, conforme a Lei nº 13.709/2018 (LGPD), exclusivamente para a execução do serviço contratado." },
      { titulo: "Da assinatura eletrônica",
        texto: "As partes reconhecem como válida a assinatura deste contrato por meio eletrônico, inclusive pela assinatura eletrônica avançada do gov.br, nos termos da Lei nº 14.063/2020, dispensando-se a assinatura em vias físicas." },
      { titulo: "Do foro",
        texto: "As partes elegem, de comum acordo, o foro da Comarca de {{cidade_foro}} para dirimir qualquer questão resultante do presente contrato. E, por estarem de acordo, as partes assinam este contrato eletronicamente, para um só efeito." }
    ]
  }
};
