// Mapa do site para o Google: páginas fixas + artigos do blog (atualiza sozinho).
const SB = "https://ouxzzduwjxmtixfftpsy.supabase.co";
const KEY = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
const B = "https://www.danieldonato.com.br";
const FIXAS = [["/", "1.0"], ["/palestras.html", "0.9"], ["/consultoria.html", "0.9"], ["/palestra-atendimento-magico.html", "0.8"], ["/palestra-lideranca-que-inspira.html", "0.8"], ["/palestra-walt-disney-area-da-saude.html", "0.8"], ["/imersao-magicday.html", "0.8"], ["/blog", "0.8"], ["/apresentacao/", "0.5"]];
module.exports = async (req, res) => {
  let l = [];
  try { const r = await fetch(`${SB}/rest/v1/materias?status=eq.publicado&dados->>siteDaniel=eq.true&select=id,publicado_em,atualizado_em&order=publicado_em.desc&limit=5000`, { headers: { apikey: KEY } }); if (r.ok) l = await r.json(); } catch (e) { console.error(e); }
  const agora = new Date();
  const urls = FIXAS.map(([p, pr]) => `<url><loc>${B}${p}</loc><priority>${pr}</priority></url>`)
    .concat(l.filter(x => new Date(x.publicado_em) <= agora).map(x => `<url><loc>${B}/blog/${encodeURIComponent(x.id)}</loc><lastmod>${new Date(x.atualizado_em || x.publicado_em).toISOString()}</lastmod><priority>0.7</priority></url>`));
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`);
};
