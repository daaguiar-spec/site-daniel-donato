import json, sys
sys.path.insert(0, sys.argv[1])
import gen_pal
R=open(sys.argv[1]+'/extra/rastreio.js',encoding='utf-8').read()
VA='<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>\n<script defer src="/_vercel/insights/script.js"></script>\n'
BLOGCSS=r'''
.bh{position:relative;overflow:hidden;border-bottom:1px solid #2A251C}
.bh:before{content:"";position:absolute;inset:0;background:url(/img/castelo.webp) center/cover;opacity:.22}
.bh:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0B0A08 35%,rgba(11,10,8,.5))}
.bh .w{position:relative;z-index:1;padding-top:44px;padding-bottom:56px}
.bh h1{font-size:56px}.bh .sub{margin:0}
.grade{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.card{display:flex;flex-direction:column;text-decoration:none;background:#fff;border:1px solid #E5DCC9;border-radius:16px;overflow:hidden;color:#1A1712;transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(26,23,18,.12)}
.card .im{aspect-ratio:16/10;background:#2A2116 center/cover}
.card .tx{padding:20px 22px 24px;display:flex;flex-direction:column;gap:8px}
.card small{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A6A2E}
.card b{font-family:Cormorant,Georgia,serif;font-size:25px;font-weight:600;line-height:1.12}
.card p{margin:0;font-size:15px;line-height:1.6;color:#4A443A}
.card.big{grid-column:1/-1;flex-direction:row}.card.big .im{flex:1.2;aspect-ratio:auto;min-height:340px}.card.big .tx{flex:1;padding:36px;justify-content:center}.card.big b{font-size:36px}
.vaz{font-size:17px;color:#4A443A;line-height:1.7}
.art{max-width:760px;margin:0 auto}
.art .kick{margin-bottom:6px}
.art h1{font-size:50px;line-height:1.05;margin:14px 0 16px}
.art .fina{font-size:20px;line-height:1.55;color:#C9BEA8;margin:0 0 22px}
.art .by{display:flex;gap:14px;align-items:center;font-size:14px;color:#B5AA95}.art .by strong{color:#EDE6D8}
.capa{margin:34px auto 0;max-width:1000px}.capa img{width:100%;border-radius:18px;display:block;border:1px solid #2A251C}
.capa figcaption{font-size:13px;color:#9C8F78;margin-top:10px;text-align:center}
.corpo{max-width:720px;margin:0 auto;font-size:18.5px;line-height:1.8;color:#2A251C}
.corpo p{margin:0 0 22px}.corpo h2{font-family:Cormorant,Georgia,serif;font-weight:600;font-size:34px;line-height:1.15;margin:40px 0 14px;text-transform:none;color:#1A1712}
.corpo blockquote{margin:30px 0;padding:6px 0 6px 24px;border-left:3px solid #C9A45C;font-family:Cormorant,Georgia,serif;font-size:27px;line-height:1.35;font-style:italic;color:#1A1712}
.corpo ul,.corpo ol{margin:0 0 22px;padding-left:24px}.corpo li{margin:0 0 8px}
.corpo a{color:#8A6A2E;text-decoration:underline;text-underline-offset:3px}
.cx{max-width:720px;margin:44px auto 0;background:#0B0A08;color:#EDE6D8;border-radius:18px;padding:34px;display:flex;gap:24px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.cx b{display:block;font-family:Cormorant,Georgia,serif;font-size:28px;font-weight:500;line-height:1.1;color:#E8CF95;text-transform:uppercase}.cx span{font-size:15px;color:#C9BEA8}
.fonte{max-width:720px;margin:26px auto 0;font-size:13.5px;color:#7D725F}.fonte a{color:#8A6A2E}
@media (max-width:900px){.bh h1{font-size:40px}.grade{grid-template-columns:1fr}.card.big{flex-direction:column}.card.big .im{min-height:220px}.card.big .tx{padding:22px}.card.big b{font-size:28px}
.art h1{font-size:36px}.art .fina{font-size:17px}.corpo{font-size:17px}.corpo h2{font-size:28px}.cx{padding:26px}}
'''
WA='https://api.whatsapp.com/send?phone=5585999711108'
head_common=gen_pal.FONTS+'\n<style>'+gen_pal.CSS+BLOGCSS+'</style>\n'+VA
nav=f'''<header class="nav"><div class="w">
<a class="logo" href="/"><b>DD</b>Daniel Donato</a>
<nav class="menu" aria-label="Principal"><a href="/#sobre">Sobre</a><a href="/palestras.html">Palestras</a><a href="/consultoria.html">Consultoria</a><a href="/#livro">Livro</a><a href="/#clientes">Clientes</a><a href="/blog" aria-current="page">Blog</a></nav>
<a class="tel" href="{WA}" target="_blank" rel="noopener">(85) 99971-1108</a>
<button type="button" class="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Menu"><a href="/#sobre">Sobre</a><a href="/palestras.html">Palestras</a><a href="/consultoria.html">Consultoria</a><a href="/#livro">Livro</a><a href="/#clientes">Clientes</a><a href="/blog">Blog</a><a href="{WA}" target="_blank" rel="noopener">WhatsApp (85) 99971-1108</a></nav>'''
foot=f'''<footer class="foot"><div class="w">
<span><strong>Daniel Donato</strong>WhatsApp (85) 99971-1108 · comercial@sinapseonline.com</span>
<nav aria-label="Redes sociais"><a href="https://www.instagram.com/danieldonato.mentor" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/ddanieldonato" target="_blank" rel="noopener">Facebook</a><a href="https://www.linkedin.com/in/danieldonatopalestrante" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.youtube.com/channel/UCGXZ9_fECgopOlwj3yzHtbg" target="_blank" rel="noopener">YouTube</a></nav>
<span class="c">© 2026 Daniel Donato · Conteúdo independente, sem vínculo oficial com The Walt Disney Company.</span>
</div></footer>
<a class="wa" href="{WA}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A140A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.3A8.4 8.4 0 1 1 21 11.5z"/></svg></a>
<script>(function(){{var b=document.querySelector('.burger'),m=document.getElementById('mnav');b.addEventListener('click',function(){{var o=!m.classList.contains('open');m.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}});m.addEventListener('click',function(e){{if(e.target.tagName==='A'){{m.classList.remove('open');b.setAttribute('aria-expanded','false')}}}})}})();</script>
'''+R
out='// Gerado por _fonte/blog/gen_layout.py — cabeçalho, rodapé e estilos do blog no visual do site.\nmodule.exports = '+json.dumps({'head':head_common,'nav':nav,'foot':foot,'wa':WA},ensure_ascii=False)+';\n'
open(sys.argv[2],'w',encoding='utf-8').write(out)
print('layout ok', len(out))
