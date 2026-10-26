const path=process.argv[2], out=process.argv[3];
const corpo="A Disney não treina pessoas para agir quando estão felizes; treina para agir quando precisam.\n\n## O espetáculo começa antes\n\nCada contato com o cliente é parte de um espetáculo. Isso vale para o hotel, para a clínica e para a loja.\n\n> Encantar não é exceção. É padrão.\n\n- Recepção com nome\n- Tempo de espera explicado\n- Despedida que convida a voltar\n\nNo fim, o cliente lembra de **como se sentiu**. Saiba mais no [portal](https://www.cxinfoco.com.br).";
const M=[{id:'jeito-disney-de-encantar-na-saude',publicado_em:'2026-10-20T12:00:00Z',titulo:'O Jeito Disney de encantar chega aos hospitais do Ceará',linhaFina:'Imersão reuniu gestores de saúde em Fortaleza para repensar a jornada do paciente.',corpo,editoria:'experiencia',tem:null},
{id:'lideranca-que-inspira',publicado_em:'2026-10-12T12:00:00Z',titulo:'Liderança que inspira começa pelo exemplo',linhaFina:'Por que a experiência do colaborador vem antes da experiência do cliente.',corpo,editoria:'lideranca',tem:null},
{id:'atendimento-espetaculo',publicado_em:'2026-10-02T12:00:00Z',titulo:'Por que cada atendimento é um espetáculo',linhaFina:'',corpo,editoria:'atendimento',tem:null},
{id:'quatro',publicado_em:'2026-09-20T12:00:00Z',titulo:'Cinco atitudes que criam o efeito UAU',linhaFina:'Pequenos gestos que mudam a percepção do cliente.',corpo,editoria:'atendimento',tem:null}];
global.fetch=async(u)=>{u=decodeURIComponent(u);let body;
 if(u.includes('id=eq.')){const id=u.match(/id=eq\.([^&]+)/)[1];const m=M.find(x=>x.id===id);body=m?[{id:m.id,publicado_em:m.publicado_em,dados:{titulo:m.titulo,linhaFina:m.linhaFina,corpo:m.corpo,editoria:m.editoria,autor:'Daniel Donato',cargoAutor:'Palestrante',siteDaniel:true,tipo:'artigo'}}]:[]}
 else if(u.includes('id=neq.')){body=M.slice(1,4)} else body=M;
 return {ok:true,json:async()=>body}};
const h=require(path+'/api/blog.js');const fs=require('fs');
function run(q,f){return new Promise(r=>{const res={headers:{},setHeader(k,v){this.headers[k]=v},status(s){this.s=s;return this},send(b){fs.writeFileSync(out+'/'+f,b);console.log(f,this.s,b.length);r()}};h({query:q},res)})}
(async()=>{await run({},'blog.html');await run({slug:'jeito-disney-de-encantar-na-saude'},'post.html');await run({slug:'nao-existe'},'404b.html')})();
