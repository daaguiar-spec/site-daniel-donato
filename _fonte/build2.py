import re,json,base64,shutil,os,sys
def parts(path):
    s=open(path,encoding='utf-8').read()
    body=s.split('<x-dc>')[1].split('</x-dc>')[0]
    helmet=re.search(r'<helmet>(.*?)</helmet>',body,re.S).group(1)
    body=re.sub(r'<helmet>.*?</helmet>','',body,flags=re.S)
    return helmet,body
dh,db=parts('project/Main.dc.html'); mh,mb=parts('project/Mobile.dc.html')
db=db.replace('{{gold}}','#C9A45C').replace('position: sticky; top: 0;','position: sticky; top: env(safe-area-inset-top, 0px);')
db=re.sub(r'<img (?![^>]*loading=)',r'<img loading="lazy" ',db)
mb=mb.replace(' onClick="{{openMenu}}"',' data-menu="open"').replace(' onClick="{{closeMenu}}"',' data-menu="close"').replace(' {{menuCls}}','').replace('{{menuOpen}}','false')
mstyle=re.search(r'<style>(.*?)</style>',mh,re.S).group(1)
mstyle=re.sub(r'html,body\{[^}]*\}\n','',mstyle,count=1).replace('\na{color:#C9A45C}','\n:where(.m) a{color:#C9A45C}')
mstyle=mstyle
dh=dh.replace('body{margin:0;background:#0B0A08;overflow-x:hidden}','html,body{background:#0B0A08;overflow-x:clip;-webkit-text-size-adjust:100%;text-size-adjust:100%}\nbody{margin:0;overflow-x:clip}\na:focus-visible{outline:2px solid #E8CF95;outline-offset:3px}\n@media (prefers-reduced-motion: reduce){*{transition:none!important}}')
switch='\n.v-mob{display:none}\n@media (max-width: 767px){.v-desk{display:none}.v-mob{display:block}}\n'
head=dh.strip().replace('</style>',mstyle+switch+'</style>',1)
BLOG=r'''<script>
/* Artigos: busca as 3 últimas matérias publicadas no portal CX em Foco */
(function(){
var URL='https://ouxzzduwjxmtixfftpsy.supabase.co/rest/v1/materias?status=eq.publicado&select=id,publicado_em,dados&order=publicado_em.desc&limit=24';
var KEY='sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt';
var PORTAL='https://www.cxinfoco.com.br/materia/';
var ED={atendimento:'Atendimento',experiencia:'Experiência do Cliente',lideranca:'Liderança'};
var MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
function data(iso){var d=new Date(iso);return isNaN(d)?'':('0'+d.getDate()).slice(-2)+' '+MES[d.getMonth()]+' '+d.getFullYear()}
function resumo(d){var t=d.linhaFina||String(d.corpo||'').replace(/[#>*_\[\]()-]/g,' ').replace(/\s+/g,' ').trim();return t.length>170?t.slice(0,167).replace(/\s\S*$/,'')+'…':t}
function okImg(u){return typeof u==='string'&&(/^data:image\//.test(u)||/^https:\/\//.test(u))}
fetch(URL,{headers:{apikey:KEY}}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(lista){
 var agora=Date.now()+60000;
 lista=(lista||[]).filter(function(m){return m&&m.dados&&m.dados.titulo&&new Date(m.publicado_em).getTime()<=agora});
 var meus=lista.filter(function(m){return m.dados.siteDaniel===true});lista=meus.concat(lista.filter(function(m){return m.dados.siteDaniel!==true})).slice(0,3);
 if(lista.length<3)return;
 var desk=document.querySelectorAll('#blog a[href*="portal-cx-news"][style*="flex-direction"]');
 var mob=document.querySelectorAll('#m-blog a.m-art');
 lista.forEach(function(m,i){var d=m.dados,meu=d.siteDaniel===true,href=meu?'/blog/'+encodeURIComponent(m.id):PORTAL+encodeURIComponent(m.id),kick=(ED[d.editoria]||'Artigo')+' · '+data(m.publicado_em),capa=okImg(d.imagem)?d.imagem:null;
  var a=desk[i];if(a){a.href=href;if(meu){a.removeAttribute('target');a.removeAttribute('rel')}var c=a.querySelector('.cxn-cover');if(c){if(capa)c.style.backgroundImage='url("'+capa.replace(/"/g,'%22')+'")';c.setAttribute('aria-label','Foto da matéria: '+d.titulo)}
   var sp=a.querySelectorAll('span');if(sp[0])sp[0].textContent=kick;var t=a.querySelector('.cxn-t');if(t)t.textContent=d.titulo;var f=a.querySelector('.cxn-f');if(f)f.textContent=resumo(d)}
  var b=mob[i];if(b){b.href=href;if(meu){b.removeAttribute('target');b.removeAttribute('rel')}var ci=b.querySelector('.m-art-img');if(ci){if(capa)ci.style.backgroundImage='url("'+capa.replace(/"/g,'%22')+'")';ci.setAttribute('aria-label','Foto da matéria: '+d.titulo)}
   var k=b.querySelector('.m-art-kick');if(k)k.textContent=kick;var mt=b.querySelector('.m-art-t');if(mt)mt.textContent=d.titulo}
 });
}).catch(function(){});
})();
</script>'''
MAGIA=r'''<script>
(function(){var reduz=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var cores=['255,236,190','227,196,122','201,162,74','255,250,235'];
document.querySelectorAll('canvas.dd-magia').forEach(function(cv){var box=cv.parentElement,ctx=cv.getContext('2d'),W,H,pts=[],com=[],vis=true,ult=0,prox=1500;
function novo(ini){var f=W>900?.62:.6;var x=Math.random()<.55?W*(f+(Math.random()-.5)*.5):Math.random()*W;return{x:x,y:ini?Math.random()*H:H+10,r:Math.random()*1.8+.4,v:Math.random()*.35+.12,osc:Math.random()*6.28,amp:Math.random()*.6+.2,cor:cores[(Math.random()*4)|0],fase:Math.random()*6.28,pisca:Math.random()*.04+.015,est:Math.random()<.12}}
function tam(){var d=Math.min(window.devicePixelRatio||1,2);W=box.clientWidth;H=box.clientHeight;if(!W||!H)return;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);var n=Math.round(Math.min(140,W*H/9000));pts=[];for(var i=0;i<n;i++)pts.push(novo(true))}
function est(x,y,r,a,c){ctx.fillStyle='rgba('+c+','+a+')';ctx.beginPath();ctx.moveTo(x,y-r*3);ctx.quadraticCurveTo(x,y,x+r*3,y);ctx.quadraticCurveTo(x,y,x,y+r*3);ctx.quadraticCurveTo(x,y,x-r*3,y);ctx.quadraticCurveTo(x,y,x,y-r*3);ctx.fill()}
function q(t){if(!vis||!W){if(!reduz)requestAnimationFrame(q);return}var dt=Math.min(t-(ult||t),50);ult=t;ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
for(var i=0;i<pts.length;i++){var p=pts[i];if(p.c){p.fase+=.03;if(p.fase>3.1){pts.splice(i,1);i--;continue}}p.y-=p.v*dt/16;p.osc+=.01*dt/16;p.fase+=p.pisca*dt/16;var x=p.x+Math.sin(p.osc)*14*p.amp;var a=(.35+.65*Math.abs(Math.sin(p.fase)))*Math.min(1,p.y/(H*.25));if(p.y<-10){pts[i]=novo(false);continue}if(p.est)est(x,p.y,p.r,a*.9,p.cor);var g=ctx.createRadialGradient(x,p.y,0,x,p.y,p.r*4);g.addColorStop(0,'rgba('+p.cor+','+a+')');g.addColorStop(1,'rgba('+p.cor+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,p.y,p.r*4,0,6.283);ctx.fill()}
prox-=dt;if(prox<=0){var e=Math.random()<.5;com.push({x:e?-50:W*(.3+Math.random()*.4),y:H*(.08+Math.random()*.3),vx:W/140+4,vy:H/700+.8,r:[]});prox=4000+Math.random()*4000}
for(var k=com.length-1;k>=0;k--){var c=com[k];c.x+=c.vx*dt/16;c.y+=c.vy*dt/16;c.vy+=.02*dt/16;c.r.push({x:c.x,y:c.y});if(c.r.length>38)c.r.shift();for(var j=0;j<c.r.length;j++){var s=c.r[j],f=j/c.r.length;ctx.fillStyle='rgba(255,236,190,'+(f*.55)+')';ctx.beginPath();ctx.arc(s.x,s.y,f*2.2,0,6.283);ctx.fill();if(Math.random()<.06&&pts.length<220)pts.push({x:s.x,y:s.y,r:Math.random()+.3,v:-.25,osc:0,amp:.2,cor:cores[0],fase:1.5,pisca:.05,est:false,c:true})}est(c.x,c.y,2.2,.95,'255,250,235');if(c.x>W+80||c.y>H*.9)com.splice(k,1)}
ctx.globalCompositeOperation='source-over';if(!reduz)requestAnimationFrame(q)}
tam();window.addEventListener('resize',tam);new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis&&!W)tam()}).observe(box);if(reduz)q(16);else requestAnimationFrame(q)})})();
</script>'''
menujs='''<script>\n(function(){var m=document.getElementById('m-menu'),b=document.querySelector('.m-burger');function set(o){if(!m)return;m.classList.toggle('is-open',o);if(b)b.setAttribute('aria-expanded',o?'true':'false');document.documentElement.style.overflow=o?'hidden':'';}document.addEventListener('click',function(e){var t=e.target.closest('[data-menu]');if(t)set(t.getAttribute('data-menu')==='open');});document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});})();\n</script>'''
body=f'<div class="v-desk">\n{db.strip()}\n</div>\n<div class="v-mob">\n{mb.strip()}\n</div>\n'+menujs+MAGIA+BLOG
M={'f2bc32c00a53ced062b582573b31f85c':('silh/daniel-equipe-novo.webp','daniel-equipe-2.webp'),'997055216d3a902ad0dcb73a8edb4b2e':('daniel-palco.webp','daniel-palco.webp'),'3e94453992055b201111e327ac219842':('logos-faixa.webp','logos-clientes.webp'),'43eb30ae4c7c386c2dcc419ec2592ace':('daniel-hero4.webp','daniel-capa-4.webp'),'803fd17dae4c3ec745aed70539e5f054':('daniel-hero.webp','daniel-capa.webp'),'2916a0584aedcfdb5320a4b8d9c56d12':('daniel-equipe.webp','daniel-equipe.webp'),'42b6f130961cacb617c57757fb4098eb':('castelo.webp','castelo.webp'),'f645f7f80422fddffcb38f63014adc03':('livro.webp','livro-checklist-cliente-feliz.webp'),'abef858d515207919bea7443ddf8defc':('ev-imersao.webp','imersao.webp'),'cf5e1a4a3514ace720d2022b12341054':('ev-palestra.webp','palestra.webp'),'f4484c8af5fbea3d1403deffa1aec022':('ev-eventos.webp','eventos.webp'),'3bb05ba9fdd8cc106292b4f4c5857d5a':('ev-incompany.webp','in-company.webp'),'93659292e171048c0f2cda0f4a7aa649':('cons-clientes2.webp','consultoria-clientes.webp'),'958a86ba402a9c7c7796f21bb88bd12f':('cons-colab2.webp','consultoria-colaboradores.webp'),'5ac7e934f9b2424e6a42e58636d3c7de':('cons-oculto2.webp','consultoria-cliente-oculto.webp'),'81dcc2f81b1a3bfe0da6970d5f452fc0':('cons-processos2.webp','consultoria-processos.webp')}
logos=json.load(open('logo-ids.json'))
# test page (data URIs)
t=body
for k,(src,_) in M.items(): t=t.replace('/_blob/'+k,'data:image/webp;base64,'+base64.b64encode(open(src,'rb').read()).decode())
for n,b in logos.items(): t=t.replace('/_blob/'+b,'data:image/png;base64,'+base64.b64encode(open(f'sinapse/img/clientes/{n}.png','rb').read()).decode())
assert '/_blob/' not in t and '{{' not in t
open('site-teste.html','w',encoding='utf-8').write('<title>Daniel Donato</title>\n'+head+'\n'+t+'\n')
# hosting package
shutil.rmtree('pacote',ignore_errors=True); os.makedirs('pacote/img/clientes')
p=body
for k,(src,dst) in M.items(): shutil.copy(src,'pacote/img/'+dst); p=p.replace('/_blob/'+k,'img/'+dst)
for n,b in logos.items(): shutil.copy(f'sinapse/img/clientes/{n}.png',f'pacote/img/clientes/{n}.png'); p=p.replace('/_blob/'+b,f'img/clientes/{n}.png')
assert '/_blob/' not in p
desc='Daniel Donato, palestrante e especialista na Metodologia Disney de encantamento. Palestras, treinamentos e imersões em atendimento, liderança e cultura.'
open('pacote/index.html','w',encoding='utf-8').write(f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Daniel Donato | Palestrante e especialista na Metodologia Disney</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="Daniel Donato | Palestrante">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="img/daniel-capa-4.webp">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0B0A08">
{head}
</head>
<body>
{p}
</body>
</html>
''')
shutil.copy('LEIA-ME.txt' if os.path.exists('LEIA-ME.txt') else 'pacote/../LEIA-ME.txt','pacote/LEIA-ME.txt') if os.path.exists('LEIA-ME.txt') else None
print('ok', len(t)//1024, 'KB test')

# ---------- links between pages ----------
def fixlinks(h): return h.replace('Consultoria.dc.html','consultoria.html').replace('Palestras.dc.html','palestras.html').replace('Main.dc.html','index.html')
for f in ('site-teste.html','pacote/index.html'):
    _c=open(f,encoding='utf-8').read(); open(f,'w',encoding='utf-8').write(fixlinks(_c))
# ---------- inner pages ----------
def page(src,test,out,title,desc,og):
    ph,pb=parts(src)
    pb=pb.replace(' onClick="{{openMenu}}"',' data-menu="open"').replace(' onClick="{{closeMenu}}"',' data-menu="close"').replace(' {{menuCls}}','').replace('{{menuOpen}}','false')
    pb=pb+menujs.replace("getElementById('m-menu')","getElementById('pg-menu')").replace("querySelector('.m-burger')","querySelector('.pg-burger')")
    pb=fixlinks(pb); ph=ph.strip().replace('body{margin:0;background:#0B0A08}','html,body{margin:0;background:#0B0A08;overflow-x:clip;-webkit-text-size-adjust:100%;text-size-adjust:100%}\na:focus-visible{outline:2px solid #E8CF95;outline-offset:3px}')
    pt=pb
    for k,(s,_) in M.items(): pt=pt.replace('/_blob/'+k,'data:image/webp;base64,'+base64.b64encode(open(s,'rb').read()).decode())
    assert '/_blob/' not in pt and '{{' not in pt
    open(test,'w',encoding='utf-8').write(f'<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>{title}</title>\n{ph}\n</head>\n<body>\n{pt}\n</body>\n</html>\n')
    pp=pb
    for k,(s,d) in M.items(): pp=pp.replace('/_blob/'+k,'img/'+d)
    assert '/_blob/' not in pp
    open(out,'w',encoding='utf-8').write(f'<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>{title}</title>\n<meta name="description" content="{desc}">\n<meta property="og:title" content="{title}">\n<meta property="og:description" content="{desc}">\n<meta property="og:image" content="img/{og}">\n<meta name="theme-color" content="#0B0A08">\n{ph}\n</head>\n<body>\n{pp}\n</body>\n</html>\n')
    print(out,'ok')
page('project/Palestras.dc.html','site-palestras.html','pacote/palestras.html','Palestras e treinamentos | Daniel Donato','Palestras, treinamentos e imersões de Daniel Donato inspirados na metodologia Disney: atendimento, liderança, saúde e o MagicDay.','palestra.webp')
page('project/Consultoria.dc.html','site-consultoria.html','pacote/consultoria.html','Consultoria em processos | Daniel Donato','Consultoria em processos de atendimento com Daniel Donato: pesquisa de satisfação de clientes e colaboradores, cliente oculto e novos processos de atendimento.','daniel-equipe.webp')
# ---------- SEO pós-processamento ----------
import json as _j
BASE='https://www.danieldonato.com.br/'
PESSOA={"@context":"https://schema.org","@graph":[
 {"@type":"Person","@id":BASE+"#daniel","name":"Daniel Donato","url":BASE,"image":BASE+"img/daniel-capa-4.webp",
  "jobTitle":"Palestrante e consultor em Experiência do Cliente","description":"Palestrante e consultor especialista em Experiência do Cliente, Cultura Disney e Desenvolvimento de Pessoas.",
  "knowsAbout":["Experiência do Cliente","Atendimento ao cliente","Metodologia Disney","Liderança","Encantamento de clientes"],
  "address":{"@type":"PostalAddress","addressLocality":"Fortaleza","addressRegion":"CE","addressCountry":"BR"},
  "sameAs":["https://www.instagram.com/danieldonato.mentor","https://www.facebook.com/ddanieldonato","https://www.linkedin.com/in/danieldonatopalestrante","https://www.youtube.com/channel/UCGXZ9_fECgopOlwj3yzHtbg"]},
 {"@type":"ProfessionalService","@id":BASE+"#servico","name":"Daniel Donato | Palestras e Consultoria","url":BASE,"image":BASE+"img/daniel-capa-4.webp",
  "telephone":"+55-85-99971-1108","email":"comercial@sinapseonline.com","founder":{"@id":BASE+"#daniel"},"areaServed":"BR",
  "address":{"@type":"PostalAddress","addressLocality":"Fortaleza","addressRegion":"CE","addressCountry":"BR"},
  "serviceType":["Palestras","Treinamentos corporativos","Imersões","Consultoria em atendimento"]}]}
for fn,path,og in [('pacote/index.html','','daniel-capa-4.webp'),('pacote/palestras.html','palestras.html','palestra.webp'),('pacote/consultoria.html','consultoria.html','daniel-equipe.webp')]:
    t=open(fn,encoding='utf-8').read()
    t=t.replace('content="img/','content="'+BASE+'img/')
    extra=f'<link rel="canonical" href="{BASE}{path}">\n<meta property="og:url" content="{BASE}{path}">\n<meta property="og:locale" content="pt_BR">\n<meta property="og:site_name" content="Daniel Donato">\n<meta name="twitter:card" content="summary_large_image">\n'
    if fn.endswith('index.html'): extra+='<script type="application/ld+json">'+_j.dumps(PESSOA,ensure_ascii=False)+'</script>\n'
    t=t.replace('<meta name="theme-color"',extra+'<meta name="theme-color"',1)
    assert 'rel="canonical"' in t, fn
    open(fn,'w',encoding='utf-8').write(t)
print('seo ok')
# ---------- páginas individuais das palestras ----------
import gen_pal
for _x in gen_pal.P: open(f"pacote/{_x['slug']}.html",'w',encoding='utf-8').write(gen_pal.page(_x))
print('palestras individuais ok')
# ---------- Vercel Web Analytics ----------
import glob as _g
VA='<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>\n<script defer src="/_vercel/insights/script.js"></script>\n'
for _f in _g.glob('pacote/*.html'):
    _t=open(_f,encoding='utf-8').read()
    if '/_vercel/insights/' not in _t: _t=_t.replace('</head>',VA+'</head>',1); open(_f,'w',encoding='utf-8').write(_t)
print('analytics ok')
# ---------- estatísticas próprias (Supabase do portal) ----------
_R=open('extra/rastreio.js',encoding='utf-8').read()
for _f in _g.glob('pacote/*.html'):
    _t=open(_f,encoding='utf-8').read()
    if 'site_eventos' not in _t: _t=_t.replace('</body>',_R+'</body>',1); open(_f,'w',encoding='utf-8').write(_t)
shutil.copy('extra/admin.html','pacote/admin.html')
print('rastreio ok')

# ---------- links do Blog apontam para /blog ----------
for _f in _g.glob('pacote/*.html'):
    _t=open(_f,encoding='utf-8').read()
    for _a in ['href="./#blog"','href="index.html#blog"','href="#blog" style="text-decoration: none; color: #EDE6D8"']:
        _t=_t.replace(_a,_a.replace('./#blog','/blog').replace('index.html#blog','/blog').replace('"#blog"','"/blog"'))
    _t=_t.replace('<a href="https://www.cxinfoco.com.br" target="_blank" rel="noopener" style=','<a href="/blog" style=').replace('href="#m-blog" data-menu="close"','href="/blog" data-menu="close"')
    open(_f,'w',encoding='utf-8').write(_t)
print('blog links ok')
