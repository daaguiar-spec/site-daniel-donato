// Aviso por e-mail quando um cliente abre o link personalizado da Apresentação comercial.
// A página chama /api/aviso só na PRIMEIRA abertura daquele cliente em cada aparelho.
// O e-mail é enviado pelo FormSubmit (formsubmit.co), sem senha nem chave:
// no primeiro aviso, o FormSubmit manda um e-mail de ATIVAÇÃO para o endereço abaixo; é só confirmar uma vez.
// Para trocar o destinatário sem mexer no código, defina AVISO_EMAIL nas variáveis de ambiente da Vercel.
const DESTINO = process.env.AVISO_EMAIL || "comercial@sinapseonline.com";
const SITE = "https://www.danieldonato.com.br";

function limpa(v, n) { return String(v || "").replace(/[\u0000-\u001f<>]/g, " ").trim().slice(0, n); }

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).end(); return; }
  const origem = String(req.headers.origin || req.headers.referer || "");
  if (origem && !/danieldonato\.com\.br|vercel\.app|localhost/.test(origem)) { res.status(403).end(); return; }
  let b = req.body || {};
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const cliente = limpa(b.cliente, 80), vendedor = limpa(b.vendedor, 60), dispositivo = limpa(b.dispositivo, 20);
  if (!cliente || /teste/i.test(cliente)) { res.status(204).end(); return; }
  const quando = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
  try {
    const r = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(DESTINO), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: SITE, Referer: SITE + "/apresentacao/" },
      body: JSON.stringify({
        _subject: "👀 " + cliente + " abriu a apresentação" + (vendedor ? " (" + vendedor + ")" : ""),
        _template: "table",
        _captcha: "false",
        Cliente: cliente,
        "Consultor de Experiência": vendedor || "—",
        Aparelho: dispositivo || "—",
        Quando: quando,
        Dica: "Bom momento para entrar em contato, enquanto a apresentação está fresca."
      })
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) { console.error(e); res.status(502).json({ ok: false }); }
};
