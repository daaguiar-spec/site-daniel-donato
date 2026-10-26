// Blog do site: lista (/blog) e artigo (/blog/<id>), montados no servidor para o Google.
// O conteúdo vem das matérias do portal CX em Foco marcadas com "Publicar também no site do Daniel Donato".
const L = require("./_layout");
const SB = "https://ouxzzduwjxmtixfftpsy.supabase.co";
const KEY = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
const BASE = "https://www.danieldonato.com.br";
const ED = { atendimento: "Atendimento", experiencia: "Experiência do Cliente", lideranca: "Liderança" };

async function supa(q) {
  const r = await fetch(`${SB}/rest/v1/${q}`, { headers: { apikey: KEY } });
  if (!r.ok) throw new Error(`Supabase ${r.status}`);
  return r.json();
}
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function inline(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function corpoHTML(t) {
  return String(t || "").replace(/\r/g, "").split(/\n\s*\n/).map(b => {
    b = b.trim(); if (!b) return "";
    const l = b.split("\n");
    if (b.startsWith("## ")) return `<h2>${inline(b.slice(3))}</h2>`;
    if (l.every(x => x.startsWith(">"))) return `<blockquote>${inline(l.map(x => x.replace(/^>\s?/, "")).join(" "))}</blockquote>`;
    if (l.every(x => /^[-•]\s/.test(x))) return `<ul>${l.map(x => `<li>${inline(x.replace(/^[-•]\s/, ""))}</li>`).join("")}</ul>`;
    if (l.every(x => /^\d+[.)]\s/.test(x))) return `<ol>${l.map(x => `<li>${inline(x.replace(/^\d+[.)]\s/, ""))}</li>`).join("")}</ol>`;
    return `<p>${l.map(inline).join("<br>")}</p>`;
  }).join("");
}
function resumo(d, max = 170) {
  const t = d.linhaFina || String(d.corpo || "").replace(/[#>*\[\]()_-]/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t;
}
const dataBR = iso => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });
const imgUrl = (m) => m.dados && m.dados.imagem ? `/api/imagem?id=${encodeURIComponent(m.id)}` : "/img/daniel-capa-4.webp";

function pagina({ title, desc, canon, og, type = "website", ld, corpo, status = 200, noindex = false }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canon)}">`}
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(og)}">
<meta property="og:url" content="${esc(canon)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Daniel Donato">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B0A08">
${ld ? `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>` : ""}
${L.head}
</head>
<body>
${L.nav}
<main>
${corpo}
</main>
${L.foot}
</body>
</html>`;
}

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || "").replace(/\/+$/, "");
  const agora = Date.now() + 60000;
  let html, status = 200;
  try {
    if (!slug) {
      let l = await supa("materias?status=eq.publicado&dados->>siteDaniel=eq.true&select=id,publicado_em,titulo:dados->>titulo,linhaFina:dados->>linhaFina,corpo:dados->>corpo,editoria:dados->>editoria,tem:dados->>imagem&order=publicado_em.desc&limit=200");
      l = l.filter(m => new Date(m.publicado_em).getTime() <= agora);
      const cards = l.map((m, i) => {
        const d = { linhaFina: m.linhaFina, corpo: m.corpo };
        const im = m.tem ? `/api/imagem?id=${encodeURIComponent(m.id)}` : "/img/daniel-capa-4.webp";
        return `<a class="card${i === 0 ? " big" : ""}" href="/blog/${encodeURIComponent(m.id)}"><div class="im" role="img" aria-label="${esc(m.titulo)}" style="background-image:url('${esc(im)}')"></div><div class="tx"><small>${esc(ED[m.editoria] || "Artigo")} · ${esc(dataBR(m.publicado_em))}</small><b>${esc(m.titulo)}</b><p>${esc(resumo(d))}</p></div></a>`;
      }).join("");
      const ld = { "@context": "https://schema.org", "@type": "Blog", name: "Blog Daniel Donato", url: `${BASE}/blog`, author: { "@type": "Person", "@id": `${BASE}/#daniel`, name: "Daniel Donato" },
        blogPost: l.slice(0, 20).map(m => ({ "@type": "BlogPosting", headline: m.titulo, url: `${BASE}/blog/${encodeURIComponent(m.id)}`, datePublished: m.publicado_em })) };
      html = pagina({
        title: "Blog | Daniel Donato · Atendimento, experiência do cliente e Jeito Disney",
        desc: "Artigos e novidades de Daniel Donato sobre atendimento, experiência do cliente, liderança e o Jeito Disney de encantar.",
        canon: `${BASE}/blog`, og: `${BASE}/img/daniel-capa-4.webp`, ld,
        corpo: `<section class="bh"><div class="w"><nav class="crumb" aria-label="Você está em"><a href="/">Início</a> › <span>Blog</span></nav><span class="kick">Blog</span><h1>Artigos e <em style="display:inline">novidades</em></h1><p class="sub">Atendimento, experiência do cliente, liderança e o Jeito Disney de encantar, na prática.</p></div></section>
<section class="lt sec"><div class="w">${cards ? `<div class="grade">${cards}</div>` : `<p class="vaz">Os primeiros artigos aparecem aqui em breve.</p>`}</div></section>
<section class="cta"><div class="w"><h2>Leve essa experiência<br>para sua equipe</h2><p class="sub" style="margin:0 auto 28px">Conte sobre seu evento ou desafio e receba uma proposta personalizada.</p><a class="g" href="${L.wa}" target="_blank" rel="noopener">Falar no WhatsApp</a></div></section>`
      });
    } else {
      const l = await supa(`materias?id=eq.${encodeURIComponent(slug)}&status=eq.publicado&dados->>siteDaniel=eq.true&select=id,publicado_em,atualizado_em,dados`);
      const m = l[0];
      if (!m || new Date(m.publicado_em).getTime() > agora) {
        status = 404;
        html = pagina({ title: "Artigo não encontrado | Daniel Donato", desc: "Este artigo não está disponível.", canon: `${BASE}/blog`, og: `${BASE}/img/daniel-capa-4.webp`, noindex: true,
          corpo: `<section class="lt sec"><div class="w" style="text-align:center"><p class="eb">Blog</p><h2>Artigo não encontrado</h2><p class="vaz">Ele pode ter mudado de endereço.</p><p><a class="g" href="/blog">Ver todos os artigos</a></p></div></section>` });
      } else {
        const d = m.dados || {};
        const url = `${BASE}/blog/${encodeURIComponent(m.id)}`;
        const desc = resumo(d, 160);
        const og = d.imagem ? `${BASE}/api/imagem?id=${encodeURIComponent(m.id)}` : `${BASE}/img/daniel-capa-4.webp`;
        let outros = [];
        try { outros = (await supa(`materias?status=eq.publicado&dados->>siteDaniel=eq.true&id=neq.${encodeURIComponent(m.id)}&select=id,publicado_em,titulo:dados->>titulo,linhaFina:dados->>linhaFina,corpo:dados->>corpo,editoria:dados->>editoria,tem:dados->>imagem&order=publicado_em.desc&limit=3`)).filter(x => new Date(x.publicado_em).getTime() <= agora); } catch (e) {}
        const ld = { "@context": "https://schema.org", "@graph": [
          { "@type": "BlogPosting", headline: d.titulo, description: desc, image: [og], datePublished: m.publicado_em, dateModified: d.atualizadoEm || m.atualizado_em || m.publicado_em,
            author: { "@type": "Person", name: d.autor || "Daniel Donato", ...(!d.autor || /daniel donato/i.test(d.autor) ? { "@id": `${BASE}/#daniel`, url: BASE } : {}) },
            publisher: { "@type": "Person", "@id": `${BASE}/#daniel`, name: "Daniel Donato", url: BASE }, mainEntityOfPage: url, articleSection: ED[d.editoria] || "", keywords: (d.tags || []).join(", ") },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` }, { "@type": "ListItem", position: 3, name: d.titulo, item: url }] }] };
        const ot = outros.map(o => `<a href="/blog/${encodeURIComponent(o.id)}"><img src="${o.tem ? `/api/imagem?id=${encodeURIComponent(o.id)}` : "/img/daniel-capa-4.webp"}" alt="" loading="lazy"><small>${esc(ED[o.editoria] || "Artigo")}</small><b>${esc(o.titulo)}</b></a>`).join("");
        html = pagina({
          title: `${d.titulo} | Daniel Donato`, desc, canon: url, og, type: "article", ld,
          corpo: `<section class="bh"><div class="w"><div class="art"><nav class="crumb" aria-label="Você está em"><a href="/">Início</a> › <a href="/blog">Blog</a> › <span>${esc(ED[d.editoria] || "Artigo")}</span></nav>
<span class="kick">${d.tipo === "artigo" ? "Opinião · " : ""}${esc(ED[d.editoria] || "Artigo")}</span>
<h1>${esc(d.titulo)}</h1>${d.linhaFina ? `<p class="fina">${esc(d.linhaFina)}</p>` : ""}
<div class="by"><span>Por <strong>${esc(d.autor || "Daniel Donato")}</strong>${d.cargoAutor ? ` · ${esc(d.cargoAutor)}` : ""}</span><span>${esc(dataBR(m.publicado_em))}</span></div></div></div></section>
<section class="lt sec" style="padding-top:56px"><div class="w">
${d.imagem ? `<figure class="capa" style="margin-top:0"><img src="/api/imagem?id=${encodeURIComponent(m.id)}" alt="${esc(d.legenda || d.titulo)}">${d.legenda ? `<figcaption>${esc(d.legenda)}</figcaption>` : ""}</figure>` : ""}
<article class="corpo"${d.imagem ? ' style="margin-top:44px"' : ""}>${corpoHTML(d.corpo)}</article>
<div class="cx"><div><b>Leve o Jeito Disney<br>para sua equipe</b><span>Palestras, treinamentos e imersões com Daniel Donato.</span></div><a class="g" href="${L.wa}&text=${encodeURIComponent("Olá! Li o artigo \"" + d.titulo + "\" e quero saber mais sobre as palestras.")}" target="_blank" rel="noopener">Falar no WhatsApp</a></div>
<p class="fonte">Também publicado no portal <a href="https://www.cxinfoco.com.br/materia/${encodeURIComponent(m.id)}" target="_blank" rel="noopener">CX em Foco</a>.</p>
</div></section>
${ot ? `<section class="dk sec"><div class="w"><p class="eb">Continue lendo</p><h2>Outros <em>artigos</em></h2><div class="ot">${ot}</div><p style="margin-top:28px"><a class="o" href="/blog">Ver todos os artigos</a></p></div></section>` : ""}`
        });
      }
    }
  } catch (e) {
    console.error(e); status = 503;
    html = pagina({ title: "Blog | Daniel Donato", desc: "Blog de Daniel Donato.", canon: `${BASE}/blog`, og: `${BASE}/img/daniel-capa-4.webp`, noindex: true,
      corpo: `<section class="lt sec"><div class="w" style="text-align:center"><h2>Blog temporariamente indisponível</h2><p class="vaz">Tente de novo em alguns instantes.</p></div></section>` });
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", status === 200 ? "public, s-maxage=120, stale-while-revalidate=3600" : "no-store");
  res.status(status).send(html);
};
