import json, sys, urllib.parse
BASE='https://www.danieldonato.com.br/'
WA='https://api.whatsapp.com/send?phone=5585999711108'
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
P=[
 dict(slug='palestra-atendimento-magico',num='I',tipo='Palestra',tema='Experiência do Cliente',
  t1='Palestra Atendimento Mágico:',t2='um case Disney',h1html='Palestra<br>Atendimento Mágico:<br><em>um case Disney</em>',h1cls='fit',nome='Atendimento Mágico: um case Disney',
  title='Palestra Atendimento Mágico: um case Disney | Daniel Donato',
  desc='Palestra de Daniel Donato sobre atendimento e experiência do cliente inspirada na Disney: padrões para encantar, fidelizar e criar o efeito UAU. Presencial ou online.',
  sub='Descubra os princípios que transformaram a Disney em uma das marcas mais admiradas do mundo e aprenda a criar experiências memoráveis que aumentam satisfação, fidelização e resultados.',
  img='palestra.webp',alt='Daniel Donato no palco ao lado do Mickey durante a palestra Atendimento Mágico',pos='50% 22%',
  h2a='O atendimento como',h2b='espetáculo',
  sobre=['Na Disney, cada contato com o cliente é tratado como parte de um espetáculo. Nesta palestra, Daniel Donato traduz esse jeito de pensar para a realidade da sua empresa, com exemplos vividos em mais de 20 visitas técnicas aos parques e lojas da Disney.','O conteúdo é ajustado ao seu segmento — varejo, saúde, serviços ou indústria — para que a equipe saia com atitudes práticas para aplicar no dia seguinte.'],
  leva=['Por que cada contato com o cliente é um “espetáculo” e como preparar a equipe para ele','Os padrões de atendimento que a Disney usa para encantar em escala','Como transformar clientes satisfeitos em clientes fiéis e promotores da marca','Atitudes simples que criam o efeito UAU no dia a dia da sua empresa'],
  quem=['Diretores','Gerentes','Supervisores','Atendimento','Vendas','Colaboradores em geral']),
 dict(slug='palestra-lideranca-que-inspira',num='II',tipo='Palestra',tema='Liderança e Cultura',
  t1='Palestra Liderança que Inspira:',t2='o Jeito Disney de Desenvolver Pessoas',h1html='Palestra Liderança<br>que Inspira: <em class="in">o Jeito Disney<br>de Desenvolver Pessoas</em>',h1cls='fit2',nome='Liderança que Inspira: o Jeito Disney de Desenvolver Pessoas',
  title='Palestra Liderança que Inspira: o Jeito Disney de Desenvolver Pessoas | Daniel Donato',
  desc='Palestra de Daniel Donato sobre liderança, cultura e engajamento inspirada na Disney, para gestores que querem equipes mais comprometidas e alinhadas.',
  sub='Uma palestra prática sobre cultura, liderança e engajamento para gestores que desejam formar equipes mais comprometidas, produtivas e alinhadas.',
  img='in-company.webp',alt='Daniel Donato com a equipe de uma empresa',pos='50% 40%',
  h2a='A experiência do cliente começa',h2b='na liderança',
  sobre=['Na Disney, o encantamento que o cliente percebe nasce de uma cultura construída todos os dias pelos líderes. Nesta palestra, Daniel Donato mostra como esse modelo de liderança forma equipes que entendem o propósito e o praticam.','Com exemplos práticos e adaptados ao seu setor, os gestores saem com ferramentas para engajar, reconhecer e desenvolver as pessoas do seu time.'],
  leva=['O papel do líder na construção de uma cultura de encantamento','Como alinhar a equipe a um propósito que todos entendem e praticam','Engajamento no dia a dia: reconhecer, desenvolver e dar exemplo','Por que a experiência do colaborador vem antes da experiência do cliente'],
  quem=['Diretores','Gerentes','Supervisores','Líderes em geral']),
 dict(slug='palestra-walt-disney-area-da-saude',num='III',tipo='Palestra',tema='Saúde',
  t1='Palestra Se Walt Disney',t2='Fosse da Área da Saúde?',h1cls='fit',nome='Se Walt Disney Fosse da Área da Saúde?',
  title='Palestra Se Walt Disney Fosse da Área da Saúde? | Daniel Donato',
  desc='Palestra de Daniel Donato sobre experiência do paciente, humanização e excelência no atendimento em hospitais, clínicas e serviços de saúde, inspirada na Disney.',
  sub='Como transformar a experiência do paciente por meio da excelência no atendimento, da cultura organizacional e da humanização dos serviços de saúde.',
  img='eventos.webp',alt='Plateia lotada em evento com Daniel Donato no palco',pos='50% 40%',
  h2a='A jornada do paciente com',h2b='os olhos da Disney',
  sobre=['Em hospitais, clínicas e serviços de saúde, quem chega está fragilizado, e cada detalhe do atendimento pesa. Nesta palestra, Daniel Donato aplica os princípios da Disney à jornada do paciente, da recepção à assistência.','O conteúdo é pensado para toda a equipe de saúde, com exemplos práticos de acolhimento, empatia e cultura de serviço.'],
  leva=['A jornada do paciente vista com os olhos da Disney','Acolhimento e empatia como padrão, e não como exceção','Cultura de serviço que envolve toda a equipe, da recepção à assistência','Pequenos detalhes que mudam a percepção de quem está fragilizado'],
  quem=['Diretores','Médicos','Enfermeiras','Auxiliares de enfermagem','Atendentes','Secretárias']),
 dict(slug='imersao-magicday',num='IV',tipo='Imersão',tema='Atendimento de Alto Impacto',
  t1='Imersão MagicDay:',t2='Atendimento de Alto Impacto',nome='MagicDay: Atendimento de Alto Impacto',
  title='Imersão MagicDay: Atendimento de Alto Impacto | Daniel Donato',
  desc='MagicDay, imersão de Daniel Donato inspirada nos bastidores da Disney para líderes e equipes elevarem o padrão de atendimento e criarem o efeito UAU.',
  sub='Uma experiência intensiva inspirada nos bastidores da Disney para líderes e equipes que desejam elevar o padrão de atendimento, fortalecer a cultura e criar o verdadeiro efeito UAU.',
  img='imersao.webp',alt='Daniel Donato conduzindo uma imersão para uma turma',pos='50% 45%',
  h2a='Uma experiência para',h2b='viver na prática',
  sobre=['O MagicDay é uma imersão para quem quer ir além da teoria. Líderes e equipes vivenciam os conceitos da Disney, fazem um diagnóstico do atendimento atual e definem novos padrões juntos.','Ao final, a equipe sai com ações concretas para aplicar logo após a imersão, com liderança e linha de frente alinhadas.'],
  leva=['Vivência prática dos conceitos, não apenas teoria','Diagnóstico do atendimento atual e definição de novos padrões','Construção de ações que a equipe aplica logo após a imersão','Alinhamento entre liderança e linha de frente'],
  quem=['Diretores','Gerentes','Supervisores','Líderes em geral']),
]
CSS=r'''*{box-sizing:border-box}html,body{margin:0;background:#0B0A08;color:#EDE6D8;font-family:'Manrope',system-ui,sans-serif;overflow-x:clip;-webkit-text-size-adjust:100%}
a{color:inherit}a:focus-visible,summary:focus-visible,button:focus-visible{outline:2px solid #E8CF95;outline-offset:3px}
.w{max-width:1180px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:20;height:72px;background:rgba(11,10,8,.94);backdrop-filter:blur(8px);border-bottom:1px solid #2A251C;display:flex;align-items:center}
.nav .w{display:flex;justify-content:space-between;align-items:center;width:100%}
.logo{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:.28em;font-size:12px;text-decoration:none;text-transform:uppercase}
.logo b{width:40px;height:40px;border:1px solid #C9A45C;border-radius:50%;display:grid;place-items:center;font-family:Cormorant,Georgia,serif;font-weight:500;font-size:20px;color:#C9A45C;letter-spacing:0}
.menu{display:flex;gap:26px}.menu a{font-size:12px;font-weight:700;letter-spacing:.14em;text-decoration:none;text-transform:uppercase}.menu a[aria-current]{color:#E8CF95}
.tel{border:1px solid #C9A45C;border-radius:99px;padding:10px 18px;font-size:11px;font-weight:700;letter-spacing:.14em;color:#E8CF95;text-decoration:none}
.burger{display:none;width:44px;height:44px;border-radius:50%;border:1px solid #3A3226;background:none;flex-direction:column;justify-content:center;align-items:center;gap:5px;cursor:pointer}.burger span{display:block;width:18px;height:1.5px;background:#EDE6D8}
.mnav{display:none;position:fixed;inset:72px 0 0;background:#0B0A08;z-index:19;padding:24px 20px;flex-direction:column}.mnav.open{display:flex}
.mnav a{padding:18px 0;border-bottom:1px solid #2A251C;font-size:14px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;text-decoration:none}
.crumb{font-size:12px;color:#9C8F78;letter-spacing:.04em;margin:0 0 22px}.crumb a{text-decoration:none}.crumb a:hover{color:#E8CF95}.crumb span{color:#C9A45C;font-weight:600}
.hero{position:relative;overflow:hidden}
.hero .w{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;min-height:580px;padding-top:40px;padding-bottom:50px}
.hero:before{content:"";position:absolute;inset:0;background:url(img/castelo.webp) center/cover;opacity:.28}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0B0A08 30%,rgba(11,10,8,.45))}
.hero .w>*{position:relative;z-index:1}
.kick{display:flex;align-items:center;gap:14px;font-size:12px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#C9A45C}.kick:before{content:"";width:34px;height:1px;background:#C9A45C}
h1{font-family:Cormorant,Georgia,serif;font-weight:500;font-size:60px;line-height:1.03;margin:18px 0 20px}h1.fit{font-size:clamp(34px,4.3vw,60px)}h1.fit,h1.fit em{white-space:nowrap}h1.fit2{font-size:clamp(32px,4vw,57px)}h1.fit2,h1.fit2 em{white-space:nowrap}h1 em.in{display:inline}h1 em{display:block;color:#E2C58C;font-weight:600}
.sub{font-size:17px;line-height:1.7;color:#C9BEA8;max-width:540px;margin:0 0 30px}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.g{display:inline-block;background:linear-gradient(180deg,#F0D99E 0%,#C9A45C 55%,#A8843F 100%);color:#1A140A;padding:17px 28px;border-radius:10px;font-weight:800;font-size:12px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;box-shadow:0 10px 30px rgba(201,164,92,.22)}
.o{display:inline-block;border:1px solid #5A4B2E;color:#E8CF95;padding:16px 26px;border-radius:10px;font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none}
.ph{width:100%;height:520px;object-fit:cover;border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.6);border:1px solid #2A251C;display:block}
.facts{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #2A251C;border-bottom:1px solid #2A251C}
.facts div{padding:26px 22px;border-right:1px solid #2A251C}.facts div:last-child{border-right:0}
.facts small{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9C8F78;font-weight:700;margin-bottom:6px}.facts span{font-family:Cormorant,Georgia,serif;font-size:24px;color:#E8CF95}
.lt{background:#F6F1E7;color:#1A1712}
.sec{padding:90px 0}
.eb{font-size:14px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#8A6A2E;margin:0 0 12px}
h2{font-family:Cormorant,Georgia,serif;font-weight:500;font-size:44px;line-height:1.05;margin:0 0 34px;text-transform:uppercase}h2 em{color:#8A6A2E}
.two{display:grid;grid-template-columns:1fr 1fr;gap:60px}
.p{font-size:17px;line-height:1.8;color:#4A443A;margin:0 0 16px}
.ls{list-style:none;padding:0;margin:0;display:grid;gap:14px}
.ls li{background:#fff;border:1px solid #E5DCC9;border-radius:12px;padding:18px 20px 18px 54px;position:relative;font-size:16px;line-height:1.55}
.ls li:before{content:"✦";position:absolute;left:20px;top:17px;color:#C9A45C;font-size:18px}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0 0;padding:0;list-style:none}.chips li{border:1px solid #C9A45C;color:#8A6A2E;border-radius:99px;padding:9px 16px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.dk .eb{color:#C9A45C}.dk h2 em{color:#E2C58C}
.fm{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.fm div{background:#15130F;border:1px solid #2A251C;border-radius:16px;padding:28px}
.fm h3{font-family:Cormorant,Georgia,serif;font-size:26px;color:#EDE6D8;margin:0 0 8px;font-weight:600}.fm p{margin:0;color:#B5AA95;line-height:1.6;font-size:15px}
.uf{display:flex;gap:10px;flex-wrap:wrap;margin:26px 0 0;padding:0;list-style:none}.uf li{border:1px solid #3A3226;border-radius:10px;padding:10px 16px;font-family:Cormorant,Georgia,serif;font-size:24px;color:#E8CF95}
.faq details{border-bottom:1px solid #E5DCC9;padding:20px 0}.faq summary{font-family:Cormorant,Georgia,serif;font-size:25px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:20px}.faq summary::-webkit-details-marker{display:none}.faq summary:after{content:"+";color:#C9A45C}.faq details[open] summary:after{content:"–"}
.faq p{margin:12px 0 0;color:#4A443A;line-height:1.7}
.ot{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.ot a{display:block;text-decoration:none;border-radius:16px;overflow:hidden;background:#15130F;border:1px solid #2A251C;transition:border-color .2s,transform .2s}.ot a:hover{border-color:#5A4B2E;transform:translateY(-3px)}
.ot img{display:block;width:100%;height:170px;object-fit:cover}.ot b{display:block;padding:8px 20px 22px;font-family:Cormorant,Georgia,serif;font-size:23px;font-weight:600;line-height:1.15}
.ot small{display:block;padding:18px 20px 0;color:#C9A45C;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.cta{text-align:center;padding:90px 0;background:#080706}.cta h2{color:#C9A45C}
.foot{border-top:1px solid #2A251C;padding:40px 0;font-size:13px;color:#9C8F78}.foot .w{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap;align-items:center}
.foot strong{display:block;font-family:Cormorant,Georgia,serif;font-size:22px;font-weight:600;color:#C9A45C;text-transform:uppercase}
.foot nav{display:flex;flex-wrap:wrap;gap:12px 20px}.foot nav a{color:#C9A45C;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.foot .c{width:100%;font-size:12px;color:#7D725F}
.wa{position:fixed;right:18px;bottom:18px;width:58px;height:58px;border-radius:50%;background:linear-gradient(180deg,#F0D99E,#C9A45C);display:grid;place-items:center;z-index:15;box-shadow:0 10px 30px rgba(0,0,0,.4)}
@media (max-width:900px){.w{padding:0 20px}.menu,.tel{display:none}.burger{display:flex}
.hero .w,.two{grid-template-columns:1fr;gap:30px}.hero .w{min-height:0;padding-top:28px;padding-bottom:50px}
h1{font-size:40px}h1.fit{font-size:clamp(26px,8.2vw,40px)}h1.fit2{font-size:clamp(24px,7.8vw,38px)}.ph{height:320px}.facts{grid-template-columns:1fr 1fr}.facts div:nth-child(2){border-right:0}.facts div:nth-child(-n+2){border-bottom:1px solid #2A251C}.facts span{font-size:21px}.facts div{padding:20px 14px}
h2{font-size:32px}.sec,.cta{padding:60px 0}.fm,.ot{grid-template-columns:1fr}.btns a{width:100%;text-align:center}.foot{padding-bottom:100px}}'''
def esc(s): return s.replace('&','&amp;').replace('"','&quot;').replace('<','&lt;')
def page(x, testfont=''):
    url=BASE+x['slug']+'.html'
    wa=WA+'&text='+urllib.parse.quote('Olá! Quero uma proposta para: '+x['nome'])
    faq=[('Quanto tempo dura a '+x['tipo'].lower()+'?','A duração é definida com você, de acordo com o formato do evento ou do treinamento.'),
         ('O conteúdo pode ser adaptado para o meu segmento?','Sim. Antes do evento, Daniel conversa com a sua equipe para entender o desafio e adaptar os exemplos à realidade da empresa.'),
         ('Daniel Donato atende fora de Fortaleza?','Sim, em todo o Brasil, presencialmente ou online.'),
         ('Como solicitar uma proposta?','Pelo WhatsApp (85) 99971-1108, contando a data, o público e o objetivo do evento.')]
    ld={"@context":"https://schema.org","@graph":[
      {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":BASE},{"@type":"ListItem","position":2,"name":"Palestras","item":BASE+"palestras.html"},{"@type":"ListItem","position":3,"name":x['nome'],"item":url}]},
      {"@type":"Service","name":x['tipo']+' '+x['nome'],"description":x['sub'],"url":url,"image":BASE+'img/'+x['img'],"serviceType":x['tipo'],"areaServed":"BR","audience":{"@type":"Audience","audienceType":', '.join(x['quem'])},"provider":{"@type":"Person","@id":BASE+"#daniel","name":"Daniel Donato","url":BASE}},
      {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faq]}]}
    outros=[o for o in P if o is not x]
    ot=''.join(f'<a href="{o["slug"]}.html"><img src="img/{o["img"]}" alt="{esc(o["alt"])}" loading="lazy" style="object-position:{o["pos"]}"><small>{o["num"]} · {o["tipo"]}</small><b>{o["nome"]}</b></a>' for o in outros)
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(x['title'])}</title>
<meta name="description" content="{esc(x['desc'])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(x['title'])}">
<meta property="og:description" content="{esc(x['desc'])}">
<meta property="og:image" content="{BASE}img/{x['img']}">
<meta property="og:url" content="{url}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Daniel Donato">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B0A08">
{FONTS}
<style>{testfont}{CSS}</style>
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script>
</head>
<body>
<header class="nav"><div class="w">
<a class="logo" href="./"><b>DD</b>Daniel Donato</a>
<nav class="menu" aria-label="Principal"><a href="./#sobre">Sobre</a><a href="palestras.html" aria-current="page">Palestras</a><a href="consultoria.html">Consultoria</a><a href="./#livro">Livro</a><a href="./#clientes">Clientes</a><a href="/blog">Blog</a></nav>
<a class="tel" href="{WA}" target="_blank" rel="noopener">(85) 99971-1108</a>
<button type="button" class="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Menu"><a href="./#sobre">Sobre</a><a href="palestras.html">Palestras</a><a href="consultoria.html">Consultoria</a><a href="./#livro">Livro</a><a href="./#clientes">Clientes</a><a href="/blog">Blog</a><a href="{WA}" target="_blank" rel="noopener">WhatsApp (85) 99971-1108</a></nav>
<main>
<section class="hero"><div class="w">
<div>
<nav class="crumb" aria-label="Você está em"><a href="./">Início</a> › <a href="palestras.html">Palestras</a> › <span>{x['nome'].split(':')[0]}</span></nav>
<span class="kick">{x['tipo']} · {x['tema']}</span>
<h1{' class="'+x['h1cls']+'"' if x.get('h1cls') else ''}>{x.get('h1html') or (x['t1']+' <em>'+x['t2']+'</em>')}</h1>
<p class="sub">{x['sub']}</p>
<div class="btns"><a class="g" href="{wa}" target="_blank" rel="noopener">Solicitar proposta</a><a class="o" href="palestras.html">Ver outras palestras</a></div>
</div>
<img class="ph" src="img/{x['img']}" alt="{esc(x['alt'])}" style="object-position:{x['pos']}">
</div></section>
<div class="w"><div class="facts"><div><small>Formato</small><span>Presencial ou online</span></div><div><small>Ideal para</small><span>Eventos e in company</span></div><div><small>Conteúdo</small><span>Adaptado à empresa</span></div><div><small>Atendimento</small><span>Todo o Brasil</span></div></div></div>
<section class="lt sec"><div class="w two">
<div><p class="eb">Sobre {'a imersão' if x['tipo']=='Imersão' else 'a palestra'}</p><h2>{x['h2a']} <em>{x['h2b']}</em></h2>
{''.join(f'<p class="p">{s}</p>' for s in x['sobre'])}
<p class="eb" style="margin-top:30px">Para quem</p><ul class="chips">{''.join(f'<li>{q}</li>' for q in x['quem'])}</ul></div>
<div><p class="eb">O que sua equipe vai levar</p><ul class="ls">{''.join(f'<li>{l}</li>' for l in x['leva'])}</ul></div>
</div></section>
<section class="dk sec"><div class="w"><p class="eb">Formatos</p><h2>Do palco à <em>sala de treinamento</em></h2>
<div class="fm"><div><h3>Palestra para eventos</h3><p>Conteúdo envolvente para abrir, encerrar ou dar energia ao seu evento, com histórias reais dos bastidores da Disney.</p></div>
<div><h3>Treinamento in company</h3><p>Programas desenhados para a realidade e os desafios da sua equipe, com prática e aplicação no dia a dia.</p></div>
<div><h3>Online</h3><p>Transmissão ao vivo para equipes em diferentes cidades, com a mesma linguagem e interação.</p></div></div>
<p class="eb" style="margin-top:50px">Treinamentos já realizados em 9 estados</p><ul class="uf"><li>CE</li><li>SP</li><li>PR</li><li>DF</li><li>AM</li><li>SE</li><li>SC</li><li>RN</li><li>PI</li></ul></div></section>
<section class="lt sec faq"><div class="w" style="max-width:860px"><p class="eb">Perguntas frequentes</p><h2>Dúvidas sobre {'a' if x['tipo']=='Imersão' else 'a'} <em>{x['tipo'].lower()}</em></h2>
{''.join(f'<details{" open" if i==0 else ""}><summary>{q}</summary><p>{a}</p></details>' for i,(q,a) in enumerate(faq))}
</div></section>
<section class="dk sec"><div class="w"><p class="eb">Outros temas</p><h2>Outras <em>palestras</em></h2><div class="ot">{ot}</div></div></section>
<section class="cta"><div class="w"><h2>Leve {'esta imersão' if x['tipo']=='Imersão' else 'esta palestra'}<br>para sua equipe</h2><p class="sub" style="margin:0 auto 28px">Conte sobre seu evento e receba uma proposta personalizada.</p><a class="g" href="{wa}" target="_blank" rel="noopener">Falar no WhatsApp</a></div></section>
</main>
<footer class="foot"><div class="w">
<span><strong>Daniel Donato</strong>WhatsApp (85) 99971-1108 · comercial@sinapseonline.com</span>
<nav aria-label="Redes sociais"><a href="https://www.instagram.com/danieldonato.mentor" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/ddanieldonato" target="_blank" rel="noopener">Facebook</a><a href="https://www.linkedin.com/in/danieldonatopalestrante" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.youtube.com/channel/UCGXZ9_fECgopOlwj3yzHtbg" target="_blank" rel="noopener">YouTube</a></nav>
<span class="c">© 2026 Daniel Donato · Conteúdo independente, sem vínculo oficial com The Walt Disney Company.</span>
</div></footer>
<a class="wa" href="{wa}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A140A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.3A8.4 8.4 0 1 1 21 11.5z"/></svg></a>
<script>(function(){{var b=document.querySelector('.burger'),m=document.getElementById('mnav');b.addEventListener('click',function(){{var o=!m.classList.contains('open');m.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}});m.addEventListener('click',function(e){{if(e.target.tagName==='A'){{m.classList.remove('open');b.setAttribute('aria-expanded','false')}}}})}})();</script>
</body>
</html>
'''
if __name__=='__main__':
    out=sys.argv[1]; tf=open(sys.argv[2]).read() if len(sys.argv)>2 else ''
    for x in P: open(f"{out}/{x['slug']}.html",'w',encoding='utf-8').write(page(x,tf))
    print([x['slug'] for x in P])
