/* PDF da proposta (layout "capa A"): capa com foto, páginas internas numeradas, investimento e próximos passos com QR Code.
   Monta páginas A4 (794 × 1123 px) fora da tela, fotografa cada uma com html2canvas e junta no jsPDF. */
(function(){
var P = window.PROPOSTA_UTIL;
var W = 794, H = 1123, MX = 56, TOPO = 100, BASE = 72;
var esc = P.esc;
function hl(t){ return P.destaque(t); }

var CSS = '' +
'.pdfp{position:fixed;left:-20000px;top:0;z-index:-1}' +
'.pdfp .pg{width:' + W + 'px;height:' + H + 'px;background:#FFFDF9;position:relative;overflow:hidden;font-family:Manrope,system-ui,sans-serif;color:#2A2520;font-variant-ligatures:none;letter-spacing:.01px;word-spacing:normal;text-rendering:auto;-webkit-font-smoothing:antialiased;margin-bottom:20px}' +
/* letter-spacing mínimo força o html2canvas a posicionar letra por letra: evita palavras grudadas em alguns Chrome/Windows */
'.pdfp *{box-sizing:border-box;letter-spacing:.01px}' +
'.pdfp .sr{font-family:"Playfair Display",Georgia,serif;font-weight:500}' +
'.pdfp .eb{font-size:10.5px;font-weight:800;letter-spacing:.26em;text-transform:uppercase;color:#9A7A3C}' +
'.pdfp .logo{display:flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.3em;font-weight:700;color:#5E5548}' +
'.pdfp .logo i{width:34px;height:34px;border:1.4px solid #B8964F;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"Playfair Display",serif;color:#9A7A3C;font-size:14px;letter-spacing:0}' +
/* capa */
'.pdfp .circ{position:absolute;right:-120px;top:190px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle at 50% 45%,#F4EBDA 0,#F4EBDA 55%,rgba(244,235,218,0) 72%)}' +
'.pdfp .arc{position:absolute;right:-80px;top:230px;width:540px;height:540px;border-radius:50%;border:1px solid #D9C69A}' +
'.pdfp .foto{position:absolute;right:-50px;bottom:150px;height:760px}' +
'.pdfp .ctxt{position:absolute;left:' + MX + 'px;top:230px;width:400px}' +
'.pdfp .ctxt h1{font-family:"Playfair Display",serif;font-weight:500;font-size:60px;line-height:1.04;margin:14px 0 18px;color:#2A2520}' +
'.pdfp .ctxt h1 em{display:block;color:#9A7A3C;font-style:italic}' +
'.pdfp .ctxt h1.longo{font-size:46px}.pdfp .ctxt h1.mlongo{font-size:38px}' +
'.pdfp .linha{width:56px;height:2px;background:#B8964F;margin:0 0 20px}' +
'.pdfp .csol{font-family:"Playfair Display",serif;font-size:20px;color:#4A4339;line-height:1.35;margin:0 0 18px;font-weight:500}' +
'.pdfp .cap{font-size:13px;line-height:1.65;color:#4A4339;max-width:300px;margin:0}.pdfp .cap em{color:#9A7A3C}' +
'.pdfp .cbase{position:absolute;left:0;right:0;bottom:0;height:150px;background:#2A2520;color:#EDE6D8;padding:34px ' + MX + 'px;display:grid;grid-template-columns:1.25fr 1.1fr 1fr;gap:22px;align-items:start}' +
'.pdfp .cbase small{display:block;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:#C9A45C;font-weight:800;margin-bottom:7px}' +
'.pdfp .cbase div{font-size:13px;line-height:1.5}.pdfp .cbase span{color:#B5AA95}' +
/* interno */
'.pdfp .cab{position:absolute;top:0;left:0;right:0;height:64px;padding:0 ' + MX + 'px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #EAE2D3;font-size:10.5px;color:#8A7F6E}' +
'.pdfp .cab .logo{font-size:9.5px}.pdfp .cab .logo i{width:26px;height:26px;font-size:11px}' +
'.pdfp .rod{position:absolute;bottom:0;left:0;right:0;height:48px;padding:0 ' + MX + 'px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #EAE2D3;font-size:10px;color:#9A8F7E}' +
'.pdfp .corpo{position:absolute;top:' + TOPO + 'px;left:' + MX + 'px;right:' + MX + 'px}' +
'.pdfp .blk{padding-bottom:34px}' +
'.pdfp .sec{display:flex;align-items:baseline;gap:14px;margin:0 0 14px}.pdfp .sec b{font-family:"Playfair Display",serif;font-size:34px;color:#D9C69A;font-weight:500;line-height:1}' +
'.pdfp .sec h2{margin:0;font-family:"Playfair Display",serif;font-weight:500;font-size:25px;line-height:1.2;color:#2A2520}.pdfp .sec h2 em{color:#9A7A3C}' +
'.pdfp p{line-height:1.65;font-size:13px;color:#4A4339;margin:0}' +
'.pdfp .g2{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:18px}' +
'.pdfp .k{font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#8A7F6E;margin-bottom:6px}' +
'.pdfp .lista{list-style:none;margin:0;padding:0}.pdfp .lista li{display:flex;gap:10px;font-size:13px;line-height:1.5;padding:7px 0;border-bottom:1px solid #F0E9DC;color:#3A342C}' +
'.pdfp .lista li:before{content:"\\2726";color:#B8964F;font-size:10px;margin-top:3px;flex:none}' +
'.pdfp .lista.ok li:before{content:"\\2713";color:#6F9A5B;font-weight:800;font-size:12px;margin-top:1px}' +
'.pdfp .obj{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 28px}' +
'.pdfp .obj li{display:flex;gap:12px;font-size:13px;line-height:1.5;color:#3A342C}.pdfp .obj li i{font-style:normal;font-family:"Playfair Display",serif;color:#B8964F;font-size:18px;line-height:1.1;flex:none;width:24px}' +
'.pdfp .passos{display:grid;margin-top:18px;border-top:2px solid #B8964F}' +
'.pdfp .passos div{padding:14px 14px 0 0;position:relative}.pdfp .passos div:before{content:"";position:absolute;top:-7px;left:0;width:12px;height:12px;border-radius:50%;background:#FFFDF9;border:2px solid #B8964F}' +
'.pdfp .passos b{display:block;font-family:"Playfair Display",serif;font-size:17px;font-weight:500;color:#2A2520;margin:6px 0 4px}.pdfp .passos span{font-size:11.5px;line-height:1.5;color:#5E5548;display:block}' +
'.pdfp .ficha{display:grid;border:1px solid #EAE2D3;border-radius:10px;margin:6px 0 0}' +
'.pdfp .ficha div{padding:12px 14px;border-right:1px solid #EAE2D3}.pdfp .ficha div:last-child{border:0}.pdfp .ficha small{display:block;font-size:9px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#9A7A3C;margin-bottom:3px}.pdfp .ficha span{font-size:12.5px;line-height:1.4;display:block}' +
'.pdfp .inv{border:1px solid #D9C69A;border-radius:14px;padding:24px 28px;background:#FFFCF5}' +
'.pdfp .tot{display:flex;justify-content:space-between;align-items:baseline;gap:20px;border-bottom:1px solid #EAE2D3;padding-bottom:14px}' +
'.pdfp .tot span{font-size:10.5px;font-weight:800;letter-spacing:.22em;color:#8A7F6E}.pdfp .tot b{font-family:"Playfair Display",serif;font-size:42px;font-weight:500;color:#9A7A3C;white-space:nowrap}' +
'.pdfp table{width:100%;border-collapse:collapse;margin-top:10px;font-size:13px}.pdfp td{padding:9px 0;border-bottom:1px solid #F0E9DC;vertical-align:top;color:#3A342C}.pdfp td.v{text-align:right;font-weight:700;white-space:nowrap;padding-left:16px}' +
'.pdfp td small{display:block;color:#7D725F;font-size:11.5px;margin-top:2px}' +
'.pdfp .cond{margin-top:14px;font-size:12px;line-height:1.7;color:#4A4339}.pdfp .cond div{margin-top:2px}.pdfp .cond b{color:#2A2520}' +
'.pdfp .selo{display:inline-block;margin-top:10px;font-size:11.5px;font-weight:700;color:#2F6B3B;background:#EEF6EF;border:1px solid #A9CDB0;border-radius:99px;padding:3px 12px}' +
'.pdfp .ops{display:grid;gap:12px}.pdfp .op{border:1px solid #EAE2D3;border-radius:12px;padding:16px 18px;background:#fff;position:relative}' +
'.pdfp .op.rec{border-color:#C9A45C;background:#FFFCF5}.pdfp .op .tag{position:absolute;top:-9px;right:16px;background:#9A7A3C;color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;border-radius:99px;padding:3px 10px}' +
'.pdfp .op .hd{display:flex;justify-content:space-between;align-items:baseline;gap:16px}.pdfp .op h3{margin:0;font-family:"Playfair Display",serif;font-weight:500;font-size:19px}' +
'.pdfp .op .val{font-family:"Playfair Display",serif;font-size:24px;color:#9A7A3C;white-space:nowrap}.pdfp .op .val s{font-family:Manrope,sans-serif;font-size:12px;color:#9A8F7E;margin-right:8px}' +
'.pdfp .op p{font-size:12px;margin-top:4px}.pdfp .op ul{margin:8px 0 0;padding:0;list-style:none;font-size:11.5px;color:#5E5548;line-height:1.6}' +
'.pdfp .prox{display:flex;gap:24px;align-items:center;background:#2A2520;color:#EDE6D8;border-radius:14px;padding:22px 24px 22px 28px}.pdfp .prox>div:first-child{flex:1;min-width:0}' +
'.pdfp .prox h3{margin:4px 0 0;font-family:"Playfair Display",serif;font-weight:500;font-size:22px;color:#fff}' +
'.pdfp .prox ol{margin:12px 0 0;padding:0;list-style:none;font-size:13px;line-height:1.5;color:#DCD3C2}.pdfp .prox ol b{color:#fff}' +
'.pdfp .prox li{display:flex;align-items:center;gap:10px;margin-top:7px}.pdfp .prox li i{flex:none;width:20px;height:20px;border-radius:50%;border:1px solid #C9A45C;color:#E8CF95;font-style:normal;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center}' +
'.pdfp .qr{flex:none;width:136px;height:154px;overflow:hidden;align-self:center;background:#fff;border-radius:10px;padding:8px 8px 7px;text-align:center;font-size:9.5px;color:#5E5548}.pdfp .qr img{width:120px;height:120px;max-width:120px;display:block;margin:0 auto 4px}' +
'.pdfp .corpo.apertado .blk{padding-bottom:20px}.pdfp .corpo.apertado .lista li{padding:5px 0}.pdfp .corpo.apertado .inv{padding:18px 22px}';

function el(html){ var d = document.createElement('div'); d.innerHTML = html; return d.firstChild; }

function capa(p, d, info){
  var nome = p.cliente || '', cls = nome.length > 26 ? 'mlongo' : nome.length > 16 ? 'longo' : '';
  var sol = String(d.solucao || ''), m = sol.match(/^(.+?[!.?])\s+(.+)$/);
  var solH = m ? esc(m[1]) + '<br><i style="color:#9A7A3C">' + esc(m[2]) + '</i>' : esc(sol);
  return '<div class="pg">' +
    '<div style="position:absolute;top:44px;left:' + MX + 'px" class="logo"><i>DD</i>DANIEL DONATO</div>' +
    '<div style="position:absolute;top:56px;right:' + MX + 'px;font-size:10px;color:#8A7F6E;letter-spacing:.2em;font-weight:700">PROPOSTA COMERCIAL</div>' +
    '<div class="circ"></div><div class="arc"></div><img class="foto" src="' + info.foto + '" crossorigin="anonymous">' +
    '<div class="ctxt"><div class="eb">Proposta para</div><h1 class="' + cls + '"><em>' + esc(nome) + '</em></h1><div class="linha"></div>' +
    (sol ? '<div class="csol">' + solH + '</div>' : '') +
    (d.apresentacao ? '<p class="cap">' + hl(d.apresentacao) + '</p>' : '') + '</div>' +
    '<div class="cbase"><div><small>Preparada por</small>Daniel Donato<br><span>Sinapse Brasil · Fortaleza/CE</span></div>' +
    '<div><small>Para</small>' + esc(d.contato || p.cliente) + (d.contato ? '<br><span>' + esc(p.cliente) + '</span>' : '') + '</div>' +
    '<div><small>' + (info.validade ? 'Enviada · Válida até' : 'Enviada em') + '</small>' + esc(info.enviada) + (info.validade ? '<br><span>' + esc(info.validade) + '</span>' : '') + '</div></div></div>';
}

function blocos(p, d, info){
  var out = [], n = 0, det = d.detalhes || {};
  function num(){ n++; return (n < 10 ? '0' : '') + n; }
  var vsOp = P.opcoesValidas(d), multi = vsOp.length > 1;
  var ficha = [['Formato', det.formato], ['Carga horária', multi ? '' : (vsOp.length ? (vsOp[0].carga_horaria || det.carga_horaria) : det.carga_horaria)],
    ['Participantes', multi ? '' : (vsOp.length ? (vsOp[0].participantes || det.participantes) : det.participantes)], ['Local', det.local], ['Data', det.data_evento]].filter(function(x){ return x[1]; });
  if (ficha.length) out.push('<div class="blk"><div class="ficha" style="grid-template-columns:repeat(' + ficha.length + ',1fr)">' + ficha.map(function(x){ return '<div><small>' + esc(x[0]) + '</small><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div></div>');

  var ex = d.experiencia || {}, viv = (ex.vivenciado || []).filter(Boolean), fmt = (ex.formato || []).filter(Boolean);
  if (ex.titulo || ex.texto || viv.length){
    out.push('<div class="blk"><div class="sec"><b>' + num() + '</b><h2>' + (ex.titulo ? hl(ex.titulo) : 'A <em>experiência.</em>') + '</h2></div>' +
      (ex.texto ? '<p style="max-width:620px">' + esc(ex.texto) + '</p>' : '') +
      (viv.length || fmt.length ? '<div class="g2">' +
        (viv.length ? '<div><div class="k">O que será vivenciado</div><ul class="lista">' + viv.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' : '<div></div>') +
        (fmt.length ? '<div><div class="k">Formato</div><ul class="lista">' + fmt.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' : '<div></div>') + '</div>' : '') + '</div>');
  }
  var obj = (d.objetivos || []).filter(Boolean);
  if (obj.length) out.push('<div class="blk"><div class="sec"><b>' + num() + '</b><h2>O que queremos <em>provocar.</em></h2></div><ol class="obj">' +
    obj.map(function(x, i){ return '<li><i>' + (i < 9 ? '0' : '') + (i + 1) + '</i><span>' + esc(x) + '</span></li>'; }).join('') + '</ol></div>');
  var rs = (d.resultados || []).filter(function(r){ return r && (r.titulo || r.texto); });
  if (rs.length){
    var col = Math.min(rs.length, 5);
    out.push('<div class="blk"><div class="sec"><b>' + num() + '</b><h2>Ao final, seu time será <em>provocado a</em></h2></div>' +
      '<div class="passos" style="grid-template-columns:repeat(' + col + ',1fr);' + (rs.length > 5 ? 'row-gap:22px' : '') + '">' + rs.map(function(r){ return '<div><b>' + esc(r.titulo) + '</b><span>' + esc(r.texto) + '</span></div>'; }).join('') + '</div></div>');
  }

  /* investimento */
  var h = '<div class="blk"><div class="sec"><b>' + num() + '</b><h2>Investimento</h2></div>';
  if (multi){
    var esc_ = p.aceite && p.aceite.opcao != null ? p.aceite.opcao : null;
    h += '<p style="margin:0 0 14px">' + (esc_ == null ? 'Escolha a opção que faz mais sentido para a sua equipe.' : 'Opção escolhida no aceite destacada.') + '</p><div class="ops">' + vsOp.map(function(o){
      var dd = P.dadosOpcao(d, o), pc = P.parcelas(dd), destaque = esc_ != null ? esc_ === o.i : o.recomendada;
      return '<div class="op' + (destaque ? ' rec' : '') + '">' + (destaque ? '<span class="tag">' + (esc_ != null ? 'Escolhida' : 'Recomendada') + '</span>' : '') +
        '<div class="hd"><h3>' + esc(o.nome) + '</h3><div class="val">' + (P.num(o.desconto) ? '<s>' + P.brl(o.valor) + '</s>' : '') + P.brl(P.total(dd)) + '</div></div>' +
        ([o.carga_horaria, o.participantes].filter(Boolean).length ? '<p>' + esc([o.carga_horaria, o.participantes].filter(Boolean).join(' · ')) + '</p>' : '') +
        (o.descricao ? '<p>' + esc(o.descricao) + '</p>' : '') +
        (pc.length ? '<ul>' + pc.map(function(x){ return '<li><b>' + x.percentual + '% · ' + P.brl(x.valor) + '</b> ' + esc(x.quando) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    }).join('') + '</div>';
  } else {
    var dv = vsOp.length === 1 ? P.dadosOpcao(d, vsOp[0]) : d, itens = (dv.itens || []).filter(function(it){ return it && (it.nome || P.num(it.valor)); });
    h += '<div class="inv"><div class="tot"><span>INVESTIMENTO TOTAL</span><b>' + P.brl(P.total(dv)) + '</b></div>';
    if (itens.length > 1 || P.num(dv.desconto)) h += '<table>' + itens.map(function(it){ return '<tr><td>' + esc(it.nome) + (it.descricao ? '<small>' + esc(it.descricao) + '</small>' : '') + '</td><td class="v">' + P.brl(it.valor) + '</td></tr>'; }).join('') +
      (P.num(dv.desconto) ? '<tr><td>Desconto</td><td class="v" style="color:#2F6B3B">− ' + P.brl(dv.desconto) + '</td></tr>' : '') + '</table>';
    var pc = P.parcelas(dv);
    if (pc.length) h += '<table>' + pc.map(function(x){ return '<tr><td>' + x.percentual + '% ' + esc(x.quando) + '</td><td class="v">' + P.brl(x.valor) + '</td></tr>'; }).join('') + '</table>';
    if (P.num(dv.desconto) && P.subtotal(dv)){ var pct = Math.round(P.num(dv.desconto) / P.subtotal(dv) * 1000) / 10; h += '<span class="selo">' + String(pct).replace('.', ',') + '% de desconto' + (String(d.motivoDesconto || '').trim() ? ' · ' + esc(d.motivoDesconto) : '') + '</span>'; }
    h += info.cond + '</div>';
  }
  if (multi) h += '<div class="inv" style="margin-top:14px;padding:14px 20px">' + info.cond + '</div>';
  h += '</div>';
  out.push(h);

  var inc = (d.inclui || []).filter(Boolean), est = (d.estrutura || []).filter(Boolean);
  if (inc.length || est.length) out.push('<div class="blk"><div class="g2" style="margin-top:0">' +
    (inc.length ? '<div><div class="k">Está incluído</div><ul class="lista ok">' + inc.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' : '<div></div>') +
    (est.length ? '<div><div class="k">Estrutura necessária no local</div><ul class="lista">' + est.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' : '<div></div>') + '</div></div>');

  out.push('<div class="blk"><div class="prox"><div><div class="eb" style="color:#C9A45C">Próximos passos</div><h3>Para confirmar, é simples:</h3><ol>' +
    '<li><i>1</i><span>Aponte a câmera do celular para o código ao lado</span></li><li><i>2</i><span>Toque em <b>Aceitar a proposta</b></span></li><li><i>3</i><span>Receba o contrato e assine pelo gov.br, sem custo</span></li></ol></div>' +
    '<div class="qr">' + info.qr + '<div>Proposta online</div></div></div></div>');
  return out;
}

function condicoes(p, d, val){
  var c = [];
  if (String(d.motivoDesconto || '').trim() && (P.num(d.desconto) || P.opcoesValidas(d).some(function(o){ return P.num(o.desconto); })) && P.opcoesValidas(d).length > 1) c.push('<b>Condição especial:</b> ' + esc(d.motivoDesconto));
  if (d.formaPagamento) c.push('<b>Forma de pagamento:</b> ' + esc(d.formaPagamento));
  var vm = P.viagemModo(d); if (vm && vm !== 'sem') c.push('<b>Despesas de viagem:</b> ' + esc((d.viagem.texto || '').trim() || P.viagemTextoCliente(d)));
  if ((d.naoInclui || []).filter(Boolean).length) c.push('<b>Não incluso no valor:</b> ' + d.naoInclui.filter(Boolean).map(esc).join(' · '));
  if (val) c.push('<b>Validade da proposta:</b> ' + esc(val));
  if (d.observacoes) c.push(esc(d.observacoes).replace(/\n/g, '<br>'));
  return c.length ? '<div class="cond">' + c.map(function(x){ return '<div>' + x + '</div>'; }).join('') + '</div>' : '';
}

function paginas(caixa, p, d, info){
  var cab = '<div class="cab"><div class="logo"><i>DD</i>DANIEL DONATO</div><span>Proposta para <b style="color:#2A2520">' + esc(p.cliente) + '</b></span></div>';
  var rod = function(){ return '<div class="rod"><span>' + esc(info.rodape) + '</span><span class="npg"></span></div>'; };
  var limite = H - TOPO - BASE, pgs = [];
  function nova(){ var pg = el('<div class="pg">' + cab + '<div class="corpo"></div>' + rod() + '</div>'); caixa.appendChild(pg); pgs.push(pg); return pg.querySelector('.corpo'); }
  var corpo = nova();
  blocos(p, d, info).forEach(function(html){
    var b = el(html); corpo.appendChild(b);
    if (corpo.scrollHeight > limite && corpo.children.length > 1){ corpo.classList.add('apertado'); }
    if (corpo.scrollHeight > limite && corpo.children.length > 1){ corpo.classList.remove('apertado'); corpo.removeChild(b); corpo = nova(); corpo.appendChild(b); }
    if (corpo.scrollHeight > limite){ /* bloco maior que a página: reduz para caber */
      var f = limite / corpo.scrollHeight; corpo.style.transformOrigin = '0 0'; corpo.style.transform = 'scale(' + f + ')'; corpo.style.width = (100 / f) + '%';
    }
  });
  var total = pgs.length + 1;
  pgs.forEach(function(pg, i){ pg.querySelector('.npg').textContent = (i + 2) + ' / ' + total; });
}

function qrImg(link){ try{ if (!link || !window.qrcode) return ''; var q = window.qrcode(0, 'M'); q.addData(link); q.make(); return '<img src="' + q.createDataURL(8, 2) + '" alt="QR Code">'; }catch(e){ return ''; } }
function carregaImg(src){ return new Promise(function(ok){ var i = new Image(); i.onload = function(){ ok(true); }; i.onerror = function(){ ok(false); }; i.src = src; }); }

window.PDF_PROPOSTA = function(p, d, opts){
  var st = document.getElementById('pdfp-css'); if (!st){ st = document.createElement('style'); st.id = 'pdfp-css'; st.textContent = CSS; document.head.appendChild(st); }
  var caixa = document.createElement('div'); caixa.className = 'pdfp';
  var val = P.validade(d, p.publicado_em);
  var info = { foto: '/img/daniel-palco-2.webp', enviada: P.data(p.publicado_em) || P.data(new Date().toISOString()), validade: val,
    qr: qrImg(opts.link) || opts.qr || '', rodape: opts.rodape || 'Daniel Donato · Sinapse Brasil', cond: condicoes(p, d, val) };
  caixa.innerHTML = capa(p, d, info);
  document.body.appendChild(caixa);
  return Promise.all([carregaImg(info.foto), document.fonts && document.fonts.load ? Promise.all([
      document.fonts.load('500 20px "Playfair Display"'), document.fonts.load('italic 500 20px "Playfair Display"'),
      document.fonts.load('400 13px Manrope'), document.fonts.load('700 13px Manrope'), document.fonts.load('800 13px Manrope')]).catch(function(){}) : null])
  .then(function(r){ if (!r[0]){ var f = caixa.querySelector('.foto'); if (f) f.remove(); } paginas(caixa, p, d, info); return document.fonts && document.fonts.ready; })
  .then(function(){
    var pgs = [].slice.call(caixa.querySelectorAll('.pg'));
    var op = { backgroundColor: '#FFFDF9', scale: 2, useCORS: true, logging: false, width: W, height: H, windowWidth: W };
    return pgs.reduce(function(prom, pg){ return prom.then(function(l){ return html2canvas(pg, op).then(function(cv){ l.push(cv); return l; }); }); }, Promise.resolve([]));
  })
  .then(function(cvs){
    var doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    cvs.forEach(function(cv, i){ if (i) doc.addPage(); doc.addImage(cv.toDataURL('image/jpeg', .9), 'JPEG', 0, 0, 210, 297); });
    caixa.remove();
    return doc;
  }, function(e){ caixa.remove(); throw e; });
};
})();
