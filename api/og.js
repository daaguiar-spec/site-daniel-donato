// Serve /proposta/ e /apresentacao/ com a prévia do link (WhatsApp, e-mail) personalizada
// com o nome da empresa, do contato e da solução. O conteúdo da página é o mesmo de
// proposta/pagina.html e apresentacao/pagina.html; aqui só trocamos título e descrição.
const fs = require("fs");
const path = require("path");
const SB = "https://ouxzzduwjxmtixfftpsy.supabase.co";
const KEY = "sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt";
const BASE = "https://www.danieldonato.com.br";

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const limpa = (v, n) => String(v || "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n);

function meta(html, chave, valor, attr) {
  attr = attr || (chave.startsWith("og:") ? "property" : "name");
  const re = new RegExp(`<meta ${attr}="${chave.replace(/[.:]/g, "\\$&")}" content="[^"]*">`);
  const tag = `<meta ${attr}="${chave}" content="${esc(valor)}">`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", tag + "\n</head>");
}

// O WhatsApp espera alguns segundos pela prévia; se o banco demorar, tenta de novo uma vez.
async function proposta(codigo) {
  for (let i = 0; i < 2; i++) {
    const p = await propostaUmaVez(codigo, i ? 3500 : 3000);
    if (p) return p;
  }
  return null;
}
async function propostaUmaVez(codigo, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(`${SB}/rest/v1/rpc/proposta_ver`, {
      method: "POST", signal: ctrl.signal,
      headers: { apikey: KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ p_codigo: codigo, p_registrar: false })
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; } finally { clearTimeout(t); }
}

async function pagina(nome, req) {
  try { return fs.readFileSync(path.join(process.cwd(), nome, "pagina.html"), "utf8"); }
  catch (e) {
    const r = await fetch(`https://${req.headers.host}/${nome}/pagina.html`);
    if (!r.ok) throw new Error("pagina " + r.status);
    return r.text();
  }
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const nome = q.pagina === "apresentacao" ? "apresentacao" : "proposta";
  const busca = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")).replace(/([?&])pagina=[^&]*&?/, "$1").replace(/[?&]$/, "") : "";
  let html;
  try { html = await pagina(nome, req); }
  catch (e) { res.statusCode = 302; res.setHeader("Location", `/${nome}/pagina.html${busca}`); return res.end(); }

  try {
    let titulo = "", desc = "";
    if (nome === "proposta") {
      const cod = limpa(q.p || q.codigo, 40).replace(/[^a-z0-9]/gi, "");
      const p = cod ? await proposta(cod) : null;
      if (p && p.cliente) {
        const d = p.dados || {};
        const contato = limpa(d.contato, 60);
        titulo = `Proposta para ${limpa(p.cliente, 80)} | Daniel Donato`;
        desc = (contato ? `Olá, ${contato}! ` : "") + `Preparamos a proposta de ${limpa(d.solucao, 90).replace(/[.!;:,\s]+$/, "") || "palestra, treinamento ou imersão"} para ${limpa(p.cliente, 80)}. Toque para ver os valores e as condições e aceitar on-line.`;
      }
    } else {
      const cliente = limpa(q.cliente, 80), contato = limpa(q.contato, 60);
      if (cliente && !/teste/i.test(cliente) || contato) {
        titulo = `Apresentação para ${cliente || contato} | Daniel Donato`;
        desc = (contato ? `Olá, ${contato}! ` : "") + "Conheça as palestras, treinamentos e imersões de Daniel Donato, inspirados no jeito Disney de encantar clientes.";
      }
    }
    if (titulo) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(titulo)}</title>`);
      html = meta(html, "og:title", titulo);
      html = meta(html, "og:description", desc);
      html = meta(html, "description", desc);
      html = meta(html, "twitter:title", titulo);
      html = meta(html, "twitter:description", desc);
    }
    html = meta(html, "og:url", `${BASE}/${nome}/${busca}`);
  } catch (e) { console.error(e); }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  res.end(html);
};
