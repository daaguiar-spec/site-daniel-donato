// Avisos da Apresentação comercial no celular, pelo app ntfy (https://ntfy.sh): "abriu agora" e "resumo da visita".
// A página manda os dados para cá; aqui viram notificações nos canais configurados na Vercel:
//   NTFY_GERAL        = canal que recebe TODOS os avisos (Daniel)
//   NTFY_CONSULTORES  = "Nome do Consultor=canal; Outro Nome=canal" (cada um recebe só os próprios clientes)
// Os nomes dos canais ficam só na Vercel (o código do site é público).

function dec(v) { try { return decodeURIComponent(String(v || "")); } catch (e) { return String(v || ""); } }
function local(h) { const c = dec(h["x-vercel-ip-city"]), uf = dec(h["x-vercel-ip-country-region"]), p = dec(h["x-vercel-ip-country"]); return [c, uf].filter(Boolean).join("/") + (p && p !== "BR" ? " (" + p + ")" : ""); }
function limpa(v, n) { return String(v || "").replace(/[\u0000-\u0009\u000b-\u001f<>]/g, " ").trim().slice(0, n); }
function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim(); }
function canais(ven, teste) {
  const lista = [];
  if (process.env.NTFY_GERAL) lista.push(process.env.NTFY_GERAL.trim());
  if (!teste && ven) String(process.env.NTFY_CONSULTORES || "").split(";").forEach(par => {
    const i = par.indexOf("="); if (i < 1) return;
    if (norm(par.slice(0, i)) === norm(ven)) lista.push(par.slice(i + 1).trim());
  });
  return [...new Set(lista.filter(t => /^[A-Za-z0-9_-]{6,64}$/.test(t)))];
}

module.exports = async (req, res) => {
  if (req.method === "GET" && "teste" in (req.query || {})) {   // diagnóstico: abre /api/aviso?teste no navegador
    const tops = canais("", false), out = { canal_geral: !!process.env.NTFY_GERAL, canal_valido: tops.length > 0,
      consultores: String(process.env.NTFY_CONSULTORES || "").split(";").filter(s => s.includes("=")).length };
    try {
      const r = await Promise.all(tops.map(topic => fetch("https://ntfy.sh/", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, title: "Teste do site", message: "Os avisos da apresentação estão funcionando.", tags: ["tada"] }) })
        .then(async x => x.status + " " + (await x.text()).slice(0, 120))));
      out.ntfy = r;
    } catch (e) { out.erro = String(e).slice(0, 200); }
    res.status(200).json(out); return;
  }
  if (req.method !== "POST") { res.status(405).end(); return; }
  const origem = String(req.headers.origin || req.headers.referer || "");
  if (origem && !/danieldonato\.com\.br|vercel\.app|localhost/.test(origem)) { res.status(403).end(); return; }
  let b = req.body || {};
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  if (Buffer.isBuffer(b)) { try { b = JSON.parse(b.toString("utf8")); } catch (e) { b = {}; } }
  const cliente = limpa(b.cliente, 80), vendedor = limpa(b.vendedor, 60);
  if (!cliente) { res.status(204).end(); return; }
  const teste = /teste/i.test(cliente);
  const tops = canais(vendedor, teste);
  if (!tops.length) { res.status(204).end(); return; }

  const resumo = b.tipo === "resumo";
  const linhas = [];
  const add = (k, v) => { v = limpa(v, 400); if (v && v !== "—") linhas.push(k + ": " + v); };
  add("Consultor", vendedor);
  add("Aparelho", limpa(b.aparelho, 20) + (local(req.headers) ? " · " + local(req.headers) : ""));
  if (resumo) {
    add("Visita", b.visita); add("Tempo", b.tempo); add("Chegou até", b.ate);
    add("Vídeos", b.videos); add("Abriu", b.abriu); add("Cliques", b.cliques);
  }
  const quis = !!b.quis;
  const titulo = (teste ? "[TESTE] " : "") + (resumo
    ? (b.atualizacao ? "Atualização: " : "Resumo: ") + cliente + " · " + limpa(b.tempo, 20) + (quis ? " · quis conversar" : "")
    : cliente + " abriu a apresentação agora");
  const msg = linhas.join("\n") + (resumo ? "" : "\nVocê recebe o resumo quando ele sair da apresentação.");

  try {
    const rs = await Promise.all(tops.map(topic => fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic, title: titulo, message: msg.slice(0, 3500),
        tags: [resumo ? (quis ? "white_check_mark" : "clipboard") : "eyes"],
        priority: !resumo || quis ? 4 : 3,
        click: "https://www.danieldonato.com.br/admin.html"
      })
    })));
    rs.forEach(r => { if (!r.ok) console.error("ntfy", r.status); });
    console.log("aviso", b.tipo, cliente, vendedor, tops.length, rs.map(r => r.status).join(","));
    res.status(200).json({ ok: true });
  } catch (e) { console.error(e); res.status(502).json({ ok: false }); }
};
