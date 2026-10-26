// Entrega a capa de um artigo do blog como arquivo (para o site, prévias e Google Imagens).
const SB = "https://ouxzzduwjxmtixfftpsy.supabase.co";
const KEY = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
module.exports = async (req, res) => {
  const id = String((req.query && req.query.id) || "");
  try {
    const r = await fetch(`${SB}/rest/v1/materias?id=eq.${encodeURIComponent(id)}&status=eq.publicado&dados->>siteDaniel=eq.true&select=img:dados->>imagem`, { headers: { apikey: KEY } });
    const l = r.ok ? await r.json() : [];
    const img = l[0] && l[0].img;
    const m = img && img.match(/^data:(image\/[a-z+]+);base64,(.+)$/);
    if (!m) { res.writeHead(302, { Location: img && /^https:\/\//.test(img) ? img : "/img/daniel-capa-4.webp" }); res.end(); return; }
    res.setHeader("Content-Type", m[1]);
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.status(200).send(Buffer.from(m[2], "base64"));
  } catch (e) { console.error(e); res.writeHead(302, { Location: "/img/daniel-capa-4.webp" }); res.end(); }
};
