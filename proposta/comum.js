/* Funções usadas pela página da proposta e pelo painel. Não precisa editar. */
(function(){
var P = window.PROPOSTA_UTIL = {};

P.SB = 'https://ouxzzduwjxmtixfftpsy.supabase.co';
P.KEY = 'sb_publishable_oWqksOTQBirkVbz2GQ7mKA_UUhttXlt';

P.STATUS = {
  rascunho:           { t: 'Rascunho',              c: 'cinza' },
  enviada:            { t: 'Enviada',               c: 'azul'  },
  visualizada:        { t: 'Visualizada',           c: 'azul'  },
  em_ajuste:          { t: 'Pediu ajuste',          c: 'laranja' },
  aprovada:           { t: 'Proposta aceita',       c: 'verde' },
  contrato_liberado:  { t: 'Contrato enviado',      c: 'ouro'  },
  contrato_em_ajuste: { t: 'Ajuste no contrato',    c: 'laranja' },
  assinado:           { t: 'Contrato assinado',     c: 'verde' },
  recusada:           { t: 'Recusada',              c: 'cinza' },
  arquivada:          { t: 'Arquivada',             c: 'cinza' }
};

P.esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
P.num = function(v){ var n = typeof v === 'number' ? v : parseFloat(String(v || '0').replace(/\./g,'').replace(',', '.')); return isFinite(n) ? n : 0; };
P.brl = function(v){ return P.num(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
P.data = function(iso){ if(!iso) return ''; var d = new Date(iso); return isNaN(d) ? String(iso) : d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }); };
P.dataHora = function(iso){ if(!iso) return ''; var d = new Date(iso); return isNaN(d) ? '' : d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' }); };
P.hoje = function(){ return new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long', year: 'numeric' }); };

P.subtotal = function(d){ return (d.itens || []).reduce(function(a, i){ return a + P.num(i.valor); }, 0); };
P.total = function(d){ return Math.max(0, P.subtotal(d) - P.num(d.desconto)); };
P.parcelas = function(d){
  var t = P.total(d), lista = d.pagamento || [], soma = 0;
  return lista.map(function(p, i){
    var v = i === lista.length - 1 ? Math.round((t - soma) * 100) / 100 : Math.round(t * P.num(p.percentual)) / 100;
    soma += v; return { percentual: P.num(p.percentual), quando: p.quando || '', valor: v };
  });
};
P.validade = function(d, publicado){
  if (d.validade) return P.data(d.validade);
  var dias = P.num(d.validadeDias); if (!dias || !publicado) return '';
  var x = new Date(publicado); x.setDate(x.getDate() + dias); return P.data(x.toISOString());
};

/* valor por extenso (reais e centavos) */
var U = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','catorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
var D = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
var C = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
function ate999(n){
  if (n === 0) return ''; if (n === 100) return 'cem';
  var c = Math.floor(n / 100), r = n % 100, p = [];
  if (c) p.push(C[c]);
  if (r < 20) { if (r) p.push(U[r]); }
  else { var d = Math.floor(r / 10), u = r % 10; p.push(D[d] + (u ? ' e ' + U[u] : '')); }
  return p.join(' e ');
}
function inteiro(n){
  if (n === 0) return 'zero';
  var grupos = [], esc = [['',''],['mil','mil'],['milhão','milhões'],['bilhão','bilhões']], i = 0;
  while (n > 0 && i < esc.length) { grupos.push(n % 1000); n = Math.floor(n / 1000); i++; }
  var partes = [];
  for (var g = grupos.length - 1; g >= 0; g--) {
    var v = grupos[g]; if (!v) continue;
    var t = (g === 1 && v === 1) ? 'mil' : ate999(v) + (g ? ' ' + (v === 1 ? esc[g][0] : esc[g][1]) : '');
    partes.push({ t: t, v: v, g: g });
  }
  return partes.map(function(p, k){
    if (k === 0) return p.t;
    var ultimo = k === partes.length - 1;
    return (ultimo && (p.v < 100 || p.v % 100 === 0) ? ' e ' : ' ') + p.t;
  }).join('');
}
P.extenso = function(v){
  v = Math.round(P.num(v) * 100) / 100;
  var r = Math.floor(v), c = Math.round((v - r) * 100), out = [];
  if (r) { var t = inteiro(r); out.push(t + ((r % 1000000 === 0) ? ' de' : '') + (r === 1 ? ' real' : ' reais')); }
  if (c) out.push(inteiro(c) + (c === 1 ? ' centavo' : ' centavos'));
  return out.length ? out.join(' e ') : 'zero real';
};

/* troca {{campos}} do contrato */
P.campos = function(prop, modelo){
  var d = prop.dados || {}, det = d.detalhes || {}, ct = prop.contratante || {}, cd = (modelo && modelo.contratada) || {}, pgc = (modelo && modelo.pagamento) || {};
  var lista = P.parcelas(d);
  var parc = lista.map(function(p){ return p.percentual + '% (' + P.brl(p.valor) + ') ' + p.quando; });
  var pg = parc.length > 1 ? parc.slice(0, -1).join('; ') + ' e ' + parc[parc.length - 1] : (parc[0] || '');
  var ROM = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  var itens = lista.map(function(p, i){ return (ROM[i] || (i + 1)) + '. ' + P.brl(p.valor) + ' (' + P.extenso(p.valor) + '), correspondentes a ' + p.percentual + '% do valor total, ' + p.quando + (i === lista.length - 1 ? '.' : ';'); }).join('\n');
  function semPonto(x){ return String(x || '').trim().replace(/[.;]+$/, ''); }
  var banco = [pgc.titular, pgc.pixExibido ? 'Chave Pix (' + (pgc.pixTipo || 'chave') + '): ' + pgc.pixExibido : '', pgc.banco ? 'Banco: ' + pgc.banco : '', pgc.agencia ? 'Agência: ' + pgc.agencia : '', pgc.conta ? 'Conta: ' + pgc.conta : ''].filter(Boolean).join(' · ');
  return {
    contratante_razao: ct.razao, contratante_cnpj: ct.cnpj, contratante_endereco: ct.endereco,
    contratante_representante: ct.representante, contratante_cpf: ct.cpf,
    contratante_cargo: (prop.aceite && prop.aceite.cargo) || 'representante legal',
    contratada_razao: cd.razao, contratada_cnpj: cd.cnpj, contratada_endereco: cd.endereco, contratada_representante: cd.representante,
    contratada_qualificacao: cd.qualificacao, contato_comprovante: cd.comprovantes,
    solucao: d.solucao, data_evento: det.data_evento, local: det.local, carga_horaria: det.carga_horaria,
    participantes: det.participantes, formato: det.formato,
    valor_total: P.brl(P.total(d)), valor_extenso: P.extenso(P.total(d)), pagamento: pg, parcelas_lista: itens, forma_pagamento: d.formaPagamento,
    dados_bancarios: banco,
    inclui: (d.inclui || []).filter(Boolean).map(semPonto).join('; '),
    estrutura: (d.estrutura || []).filter(Boolean).map(semPonto).join('; '),
    cidade_foro: (prop.contrato && prop.contrato.cidadeForo) || (modelo && modelo.cidadeForo), data_hoje: P.hoje()
  };
};
P.preenche = function(texto, campos, html){
  return String(texto || '').split(/(\{\{\s*[a-z_]+\s*\}\})/g).map(function(parte){
    var m = parte.match(/^\{\{\s*([a-z_]+)\s*\}\}$/);
    if (!m) return html ? P.esc(parte).replace(/\n/g, '<br>') : parte;
    var v = campos[m[1]];
    if (v == null || String(v).trim() === '') return html ? '<mark class="falta">[a preencher]</mark>' : '[a preencher]';
    return html ? '<span class="campo">' + P.esc(v).replace(/\n/g, '<br>') + '</span>' : String(v);
  }).join('');
};

/* compara versões para destacar o que mudou */
P.igual = function(a, b){ return JSON.stringify(a == null ? null : a) === JSON.stringify(b == null ? null : b); };
P.mudancas = function(atual, anterior){
  var m = { itens: {}, campos: {}, clausulas: {}, alguma: false };
  if (!anterior) return m;
  var a = atual.dados || {}, b = anterior.dados || {};
  (a.itens || []).forEach(function(it, i){
    var velho = (b.itens || [])[i];
    if (!velho || !P.igual(it, velho)) { m.itens[i] = velho ? { antes: velho } : { novo: true }; m.alguma = true; }
  });
  ['desconto','pagamento','formaPagamento','inclui','naoInclui','estrutura','experiencia','objetivos','resultados','detalhes','solucao','apresentacao','observacoes'].forEach(function(k){
    if (!P.igual(a[k], b[k])) { m.campos[k] = true; m.alguma = true; }
  });
  if (P.total(a) !== P.total(b)) { m.campos.total = { antes: P.total(b) }; m.alguma = true; }
  if (atual.contrato && anterior.contrato) {
    var ca = atual.contrato.clausulas || [], cb = anterior.contrato.clausulas || [];
    ca.forEach(function(c, i){ if (!cb[i] || !P.igual(c, cb[i])) { m.clausulas[i] = true; m.alguma = true; } });
    if (!P.igual(atual.contrato.abertura, anterior.contrato.abertura)) { m.campos.abertura = true; m.alguma = true; }
  }
  return m;
};

P.destaque = function(t){ return P.esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>'); };

/* ---------- Pix copia e cola (BR Code estático, padrão do Banco Central) ---------- */
function tlv(id, v){ v = String(v); return id + ('0' + v.length).slice(-2) + v; }
function semAcento(t, n){ return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 .\-]/g, '').toUpperCase().trim().slice(0, n); }
P.crc16 = function(str){
  var crc = 0xFFFF;
  for (var i = 0; i < str.length; i++){
    crc ^= str.charCodeAt(i) << 8;
    for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
  }
  return ('000' + crc.toString(16).toUpperCase()).slice(-4);
};
P.pix = function(cfg, valor, txid){
  var chave = String(cfg.pixChave || '').trim(); if (!chave) return '';
  var p = tlv('00', '01') + tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', chave)) + tlv('52', '0000') + tlv('53', '986');
  if (P.num(valor) > 0) p += tlv('54', P.num(valor).toFixed(2));
  p += tlv('58', 'BR') + tlv('59', semAcento(cfg.nome || 'RECEBEDOR', 25)) + tlv('60', semAcento(cfg.cidade || 'FORTALEZA', 15));
  p += tlv('62', tlv('05', String(txid || '***').replace(/[^A-Za-z0-9]/g, '').slice(0, 25) || '***'));
  p += '6304';
  return p + P.crc16(p);
};

P.copia = function(o){ return JSON.parse(JSON.stringify(o || {})); };
})();
