/* Raio-X do Encantamento: perguntas, textos e níveis.
   Usado pela pesquisa (/raiox) e pelo painel (/raiox/painel) para montar o mesmo relatório. */
(function(){
const OPCOES=[["Sim, consistentemente",2],["Às vezes",1],["Ainda não",0]];
const P=[
["Propósito","Sua equipe entende que seu trabalho é criar boas experiências para os clientes?",
 "Sua equipe entende que o trabalho dela vai além da tarefa: é criar experiências. Mantenha esse propósito presente nas conversas do dia a dia.",
 "Quando a equipe enxerga só tarefas, o cliente sente um atendimento mecânico. Conectar as pessoas ao propósito é o primeiro passo, e é por ele que o Atendimento Mágico começa."],
["Atenção aos detalhes","Sua equipe percebe pequenos detalhes que fazem diferença para o cliente?",
 "Sua equipe percebe o que muitos não veem. Compartilhe esses bons exemplos para inspirar todos.",
 "O cliente raramente reclama dos detalhes: ele simplesmente não volta. O Atendimento Mágico treina o olhar da equipe para perceber o que faz diferença."],
["Personalização","Sua equipe procura entender as necessidades de cada cliente?",
 "Sua equipe enxerga cada cliente como único. Registre preferências e informações para tornar isso cada vez mais natural.",
 "Clientes que se sentem só mais um são facilmente conquistados pela concorrência. Sua equipe pode aprender técnicas para entender e surpreender cada cliente."],
["Protagonismo","Sua equipe se sente responsável pela experiência do cliente?",
 "Sua equipe assume a experiência do cliente como responsabilidade de todos. Reconheça publicamente essas atitudes.",
 "Quando ninguém se sente dono da experiência, os problemas ficam sem resposta. Desenvolver o protagonismo da equipe é um dos pilares do Atendimento Mágico."],
["Autonomia","Sua equipe tem liberdade para resolver problemas e surpreender clientes?",
 "Sua equipe tem liberdade para resolver e surpreender. Mantenha limites claros para essa liberdade ser usada com segurança.",
 "Cada “vou ver com meu gestor” custa tempo e paciência ao cliente. O treinamento mostra como dar liberdade à equipe com segurança e critério."],
["Liderança pelo exemplo","Os líderes praticam a cultura de atendimento que cobram da equipe?",
 "Seus líderes praticam o que cobram, e isso gera credibilidade. Continue sendo a referência para a equipe.",
 "A equipe reproduz o que vê nos líderes. O Atendimento Mágico também prepara a liderança para ser o exemplo da cultura que deseja construir."],
["Desenvolvimento","Sua empresa prepara continuamente a equipe para encantar clientes?",
 "Sua empresa investe na preparação da equipe. Mantenha esse desenvolvimento contínuo, e não apenas pontual.",
 "Sem preparo contínuo, a qualidade do atendimento depende da sorte. Que tal dar à sua equipe uma experiência de desenvolvimento que transforma a forma de atender?"],
["Olhar do cliente",
 "Você já viveu a experiência da sua empresa como cliente, ligando, comprando ou sendo atendido sem se identificar?",
 "Você conhece sua empresa pelos olhos do cliente. Mantenha esse hábito: ele revela o que nenhum relatório mostra.",
 "Quem só conhece a empresa por dentro não enxerga o que o cliente realmente vive. No Atendimento Mágico, você aprende a olhar cada contato com os olhos do cliente."],
["Clientes perdidos",
 "Sua empresa sabe quantos clientes deixaram de voltar nos últimos meses e quanto isso representa em vendas perdidas?",
 "Sua empresa acompanha quem deixa de voltar. Use esses dados para agir antes que o cliente vá embora.",
 "A maioria dos clientes insatisfeitos não reclama: simplesmente não volta, e essa perda não aparece em nenhum relatório. O Atendimento Mágico mostra como fidelizar antes de perder."],
["Alinhamento da equipe",
 "Se você perguntasse hoje a três colaboradores qual experiência o cliente deve viver na sua empresa, eles dariam a mesma resposta?",
 "Sua equipe fala a mesma língua sobre a experiência do cliente. Esse alinhamento é a base de um atendimento consistente.",
 "Se cada colaborador entende a experiência de um jeito, o cliente recebe um atendimento diferente a cada contato. O treinamento alinha toda a equipe em torno de um mesmo padrão."]
];
const NIVEIS=[
 {max:7,nome:"Cultura em desenvolvimento",txt:"A empresa apresenta oportunidades importantes para fortalecer sua cultura de atendimento e experiência do cliente.",
  passo:"Seus clientes podem estar recebendo uma experiência abaixo do que sua empresa é capaz de oferecer, e isso pesa diretamente nas vendas e na fidelização. Que tal preparar sua equipe para transformar cada atendimento em uma oportunidade de encantar e vender mais?"},
 {max:14,nome:"Cultura em evolução",txt:"Existem iniciativas positivas, mas ainda há oportunidades para desenvolver comportamentos, fortalecer a cultura e aumentar a consistência das experiências.",
  passo:"Sua empresa já faz coisas boas, mas a experiência ainda varia de cliente para cliente. Quando o encantamento se torna padrão, o cliente volta, compra mais e indica. Vamos levar sua equipe para esse próximo nível?"},
 {max:20,nome:"Cultura fortalecida",txt:"A empresa demonstra uma boa percepção sobre os elementos de uma cultura de encantamento. O próximo desafio é manter a consistência e continuar desenvolvendo as pessoas.",
  passo:"Sua empresa já tem uma boa base de encantamento. O desafio agora é manter a consistência e transformar a experiência em um diferencial que o cliente não encontra na concorrência. Que tal fortalecer ainda mais sua equipe?"}
];
window.RAIOX={OPCOES:OPCOES,P:P,NIVEIS:NIVEIS};
})();
