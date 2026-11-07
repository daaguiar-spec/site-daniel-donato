// Grava o "resumo da visita" da Apresentação no Supabase.
// A página manda por aqui (mesmo endereço do site, via sendBeacon) porque, ao fechar a aba no computador,
// o navegador às vezes descarta o envio direto para o Supabase. A chave usada é a pública do site.
const U = "https://ouxzzduwjxmtixfftpsy.supabase.co/rest/v1/site_eventos";
const K = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).end(); return; }
  const origem = String(req.headers.origin || req.headers.referer || "");
  if (origem && !/danieldonato\.com\.br|vercel\.app|localhost/.test(origem)) { res.status(403).end(); return; }
  let b = req.body || {};
  if (Buffer.isBuffer(b)) b = b.toString("utf8");
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  if (b.tipo !== "resumo" || !b.cliente) { res.status(204).end(); return; }
  const d = { tipo: "resumo", pagina: String(b.pagina || "/apresentacao/").slice(0, 200), cliente: String(b.cliente).slice(0, 80),
    dispositivo: String(b.dispositivo || "").slice(0, 20), detalhe: b.detalhe || null };
  if (b.vendedor) d.vendedor = String(b.vendedor).slice(0, 60);
  if (b.visitante) d.visitante = String(b.visitante).slice(0, 64);
  try {
    const r = await fetch(U, { method: "POST", headers: { apikey: K, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(d) });
    if (!r.ok) console.error("registra", r.status, (await r.text()).slice(0, 300));
    res.status(r.ok ? 200 : 502).end();
  } catch (e) { console.error(e); res.status(502).end(); }
};
