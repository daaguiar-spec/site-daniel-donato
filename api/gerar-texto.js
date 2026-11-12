// Painel de propostas · "✨ Gerar com IA"
// Escreve textos da proposta adaptados ao segmento do cliente, usando o Claude (chave ANTHROPIC_API_KEY na Vercel).
// Só funciona para quem está logado no painel (confere o login no Supabase e se é administrador das propostas).

const SB = "https://ouxzzduwjxmtixfftpsy.supabase.co";
const KEY = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
const MODELO = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

function limpa(v, n) { return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000b-\u001f]/g, " ").trim().slice(0, n); }

async function ehAdmin(token) {
  if (!token) return false;
  const h = { apikey: KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" };
  const u = await fetch(`${SB}/auth/v1/user`, { headers: h });
  if (!u.ok) return false;
  const r = await fetch(`${SB}/rest/v1/rpc/eh_admin_proposta`, { method: "POST", headers: h, body: "{}" });
  if (!r.ok) return false;
  return (await r.json()) === true;
}

const TOM = `Você escreve textos de propostas comerciais para Daniel Donato (Sinapse Brasil, Fortaleza), palestrante e consultor de experiência do cliente inspirado nos princípios Disney de encantamento. Ele vende palestras, treinamentos in company e imersões.
Tom: humano, elegante, direto, sem exagero e sem clichês de marketing ("revolucionar", "jornada incrível", "potencializar ao máximo"). Frases curtas. Português do Brasil. Fale com a empresa cliente ("sua equipe", "seu time"). Pode citar a Disney com naturalidade, sem prometer resultados numéricos.
O ponto principal: adaptar ao SEGMENTO do cliente, com situações reais do dia a dia daquele tipo de negócio (quem é o cliente final, onde acontecem os contatos, o que encanta ou frustra ali). Não invente fatos sobre a empresa.`;

const PEDIDOS = {
  apresentacao: {
    pede: `Escreva 3 opções diferentes de "Texto de apresentação" (1 a 2 frases, até 45 palavras cada) que aparece logo abaixo do nome da solução na capa da proposta.`,
    formato: `{"opcoes":["texto 1","texto 2","texto 3"]}`,
    exemplo: "Uma experiência in company inspirada nos princípios Disney de encantamento, adaptada à realidade da sua equipe."
  },
  experiencia: {
    pede: `Escreva 3 opções diferentes para o bloco "A experiência". Cada opção tem: "titulo" (até 10 palavras; coloque entre *asteriscos* o trecho final que fica em dourado itálico, por exemplo "Uma experiência para transformar *a forma de atender.*"), "texto" (1 a 2 frases, até 40 palavras) e "vivenciado" (exatamente 4 itens curtos, até 7 palavras cada, do que o time vai vivenciar).`,
    formato: `{"opcoes":[{"titulo":"...","texto":"...","vivenciado":["...","...","...","..."]}, ... 3 opções]}`,
    exemplo: JSON.stringify({ titulo: "Uma experiência para transformar *a forma de atender.*", texto: "Uma palestra inspiradora, baseada em princípios da Cultura Disney, para ampliar a percepção sobre atendimento, relacionamento e experiência do cliente.", vivenciado: ["Cases e aprendizados da Disney", "Princípios da experiência do cliente", "Cultura do encantamento e atenção aos detalhes", "Conexão, comunicação e superação de expectativas"] })
  },
  objetivos: {
    pede: `Escreva 3 opções diferentes de lista "O que queremos provocar" (objetivos). Cada opção tem exatamente 5 itens, cada item com até 12 palavras, sem ponto final.`,
    formato: `{"opcoes":[["item","item","item","item","item"], ... 3 opções]}`,
    exemplo: JSON.stringify(["Mais consciência sobre o impacto de cada interação com o cliente", "Uma postura mais protagonista no atendimento", "Comunicação mais cuidadosa e intencional", "Atenção aos pequenos detalhes que fazem diferença na experiência", "Mais conexão entre atendimento, relacionamento e resultado"])
  },
  resultados: {
    pede: `Escreva 3 opções diferentes do bloco "Ao final, seu time será provocado a". Cada opção tem exatamente 5 passos; cada passo tem "titulo" (um verbo no infinitivo, uma palavra, com inicial maiúscula) e "texto" (complemento de até 14 palavras que continua a frase do verbo, com ponto final).`,
    formato: `{"opcoes":[[{"titulo":"Perceber","texto":"..."}, ... 5 passos], ... 3 opções]}`,
    exemplo: JSON.stringify([{ titulo: "Perceber", texto: "Que cada contato com o cliente constrói ou destrói valor." }, { titulo: "Assumir", texto: "Uma postura mais protagonista diante das situações do dia a dia." }, { titulo: "Encantar", texto: "Entendendo que experiência não depende apenas de grandes ações, mas de pequenos detalhes." }, { titulo: "Comunicar", texto: "De maneira mais humana, clara e intencional." }, { titulo: "Agir", texto: "Transformando os aprendizados em comportamentos observáveis." }])
  }
};

function valida(campo, o) {
  const s = x => typeof x === "string" && x.trim();
  if (!o || !Array.isArray(o.opcoes)) return null;
  const ok = o.opcoes.filter(x =>
    campo === "apresentacao" ? s(x) :
    campo === "experiencia" ? x && s(x.titulo) && s(x.texto) && Array.isArray(x.vivenciado) && x.vivenciado.every(s) :
    campo === "objetivos" ? Array.isArray(x) && x.length && x.every(s) :
    Array.isArray(x) && x.length && x.every(p => p && s(p.titulo) && s(p.texto)));
  return ok.length ? ok.slice(0, 3) : null;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ erro: "Use POST" }); return; }
  try {
    if (!process.env.ANTHROPIC_API_KEY) { res.status(500).json({ erro: "Falta a chave ANTHROPIC_API_KEY nas variáveis do projeto do site na Vercel." }); return; }
    const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!(await ehAdmin(token))) { res.status(401).json({ erro: "Sessão expirada. Saia e entre de novo no painel." }); return; }
    const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const campo = limpa(b.campo, 20), ped = PEDIDOS[campo];
    if (!ped) { res.status(400).json({ erro: "Campo desconhecido." }); return; }
    const c = b.contexto || {};
    const segmento = limpa(c.segmento, 120);
    if (!segmento) { res.status(400).json({ erro: "Preencha o segmento do cliente." }); return; }
    const ctx = [
      "Segmento do cliente: " + segmento,
      c.empresa && "Empresa: " + limpa(c.empresa, 120),
      c.solucao && "Solução contratada: " + limpa(c.solucao, 160),
      c.formato && "Formato: " + limpa(c.formato, 80),
      c.carga && "Carga horária: " + limpa(c.carga, 40),
      c.participantes && "Participantes: " + limpa(c.participantes, 60),
      c.atual && "Texto atual do campo (pode servir de base): " + limpa(typeof c.atual === "string" ? c.atual : JSON.stringify(c.atual), 1500),
      c.extra && "Observação do Daniel: " + limpa(c.extra, 300)
    ].filter(Boolean).join("\n");
    const prompt = `${ped.pede}\n\nContexto da proposta:\n${ctx}\n\nExemplo do estilo atual (genérico, sem segmento): ${ped.exemplo}\n\nResponda APENAS com JSON válido, sem texto antes ou depois, neste formato: ${ped.formato}`;
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODELO, max_tokens: 2000, system: TOM, messages: [{ role: "user", content: prompt }] })
    });
    const d = await r.json();
    if (!r.ok) {
      const msg = (d && d.error && d.error.message) || "erro desconhecido";
      res.status(502).json({ erro: /credit|balance/i.test(msg) ? "Os créditos da API acabaram. Recarregue no Claude Console." :
        /api.key|authentication/i.test(msg) ? "A chave ANTHROPIC_API_KEY é inválida. Confira na Vercel." : "A IA não respondeu: " + msg }); return;
    }
    const txt = (d.content || []).filter(x => x.type === "text").map(x => x.text).join("");
    let j; try { j = JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1)); } catch (e) { j = null; }
    const opcoes = valida(campo, j);
    if (!opcoes) { res.status(502).json({ erro: "A IA respondeu num formato inesperado. Tente de novo." }); return; }
    res.status(200).json({ opcoes });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao gerar: " + String(e && e.message || e).slice(0, 200) });
  }
};
