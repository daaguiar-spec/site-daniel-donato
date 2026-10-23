<script>
(function(){
var U='https://ouxzzduwjxmtixfftpsy.supabase.co/rest/v1/site_eventos',K='sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt';
try{if(localStorage.getItem('dd_admin')==='1')return;}catch(e){}
if(/^(localhost|127\.)/.test(location.hostname)||location.protocol==='file:')return;
function vis(){try{var v=localStorage.getItem('ddv');if(!v){v=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('ddv',v)}return v}catch(e){return 'anonimo'}}
function disp(){var w=Math.min(innerWidth,screen.width||innerWidth);return w<=680?'Celular':w<=1024?'Tablet':'Computador'}
function orig(){var p=true;try{if(sessionStorage.getItem('ddo'))p=false;else sessionStorage.setItem('ddo','1')}catch(e){}
if(!p)return null;var q=new URLSearchParams(location.search).get('utm_source');if(q)return q.slice(0,40);
var r=document.referrer;if(!r)return 'Acesso direto';var h='';try{h=new URL(r).hostname.replace(/^www\./,'')}catch(e){}
if(!h||h===location.hostname.replace(/^www\./,''))return null;
if(/google\./.test(h))return 'Google';if(/bing\./.test(h))return 'Bing';if(/whatsapp|wa\.me/.test(h))return 'WhatsApp';
if(/linkedin|lnkd/.test(h))return 'LinkedIn';if(/instagram/.test(h))return 'Instagram';if(/facebook|fb\./.test(h))return 'Facebook';
if(/youtube/.test(h))return 'YouTube';if(/cxinfoco|portal-cx-news/.test(h))return 'CX em Foco';return 'Outros sites'}
var AP=/^\/apresentacao/.test(location.pathname),QS=new URLSearchParams(location.search);
function env(d){if(AP){var c=(QS.get('cliente')||'').trim().slice(0,80),v=(QS.get('vendedor')||'').trim().slice(0,60);if(c)d.cliente=c;if(v)d.vendedor=v}d.visitante=vis();d.dispositivo=disp();d.pagina=(location.pathname||'/').slice(0,200);
try{fetch(U,{method:'POST',keepalive:true,headers:{'apikey':K,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(d)}).catch(function(){})}catch(e){}}
env({tipo:'visita',origem:orig()});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="whatsapp"],a[href*="wa.me"]');if(a)env({tipo:'whatsapp'})},true);
})();
</script>
