// Cidade aproximada de quem abre a página, pelos cabeçalhos de localização da Vercel (vem do IP; pode errar a cidade em redes móveis).
function d(v) { try { return decodeURIComponent(String(v || "")); } catch (e) { return String(v || ""); } }
module.exports = (req, res) => {
  const h = req.headers;
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ cidade: d(h["x-vercel-ip-city"]).slice(0, 60), uf: d(h["x-vercel-ip-country-region"]).slice(0, 10), pais: d(h["x-vercel-ip-country"]).slice(0, 4) });
};
