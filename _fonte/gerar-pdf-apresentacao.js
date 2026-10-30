// Gera apresentacao/apresentacao-daniel-donato.pdf a partir da página /apresentacao/,
// uma página do PDF por seção, do jeito que aparece numa tela de computador.
// Uso (na pasta do site, com um servidor local rodando em :8080):
//   node _fonte/gerar-pdf-apresentacao.js
// Depois rode: python3 _fonte/juntar-pdf.py
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const URL = process.env.URL || 'http://localhost:8080/apresentacao/';
  const OUT = process.env.OUT || '/tmp/pdf-apres';
  fs.mkdirSync(OUT, { recursive: true });
  fs.readdirSync(OUT).forEach(f => fs.unlinkSync(OUT + '/' + f));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' });
  await p.goto(URL, { waitUntil: 'load' });
  await p.evaluate(() => {
    localStorage.setItem('dd_admin', '1');
    document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; });
    document.documentElement.style.scrollSnapType = 'none';
    const st = document.createElement('style');
    st.textContent = '.topo,.pontos,.proximo,.convite,.seguir,.pdf-link,.sh-nav,.dep-nav{display:none!important}.r{opacity:1!important;transform:none!important}';
    document.head.appendChild(st);
  });
  await p.waitForTimeout(2500);
  const ids = await p.evaluate(() => [...document.querySelectorAll('section.tela')].filter(s => !s.classList.contains('hidden') && s.offsetHeight > 50).map(s => s.id));
  let n = 0;
  for (const id of ids) {
    await p.evaluate(id => { const s = document.getElementById(id); s.scrollIntoView(); s.classList.add('on');
      s.querySelectorAll('[data-valor]').forEach(b => { b.dataset.feito = 1; b.textContent = (b.dataset.pre || '') + b.dataset.valor + (b.dataset.suf || ''); }); }, id);
    await p.waitForTimeout(1800);
    await p.locator('#' + id).screenshot({ path: `${OUT}/${String(++n).padStart(2, '0')}-${id}.png` });
  }
  console.log(n, 'seções');
  await b.close();
})();
