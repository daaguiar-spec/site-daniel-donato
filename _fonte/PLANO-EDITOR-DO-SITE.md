# Plano: Editor do site (pedido em 23/10/2026, ainda NÃO implementado)

> Para o Claude: leia este arquivo inteiro antes de começar. Daniel pediu para
> implementar isto "depois". Quando ele disser "vamos fazer o editor do site",
> é isto aqui.

## O que o Daniel pediu
Poder editar sozinho, pelo admin (danieldonato.com.br/admin), **todos os textos,
fotos e links do site**, sem precisar pedir ao Claude (para não gastar créditos).

## Solução combinada
1. **Aba "Editar site" no admin** (mesmo login da Redação do CX em Foco, Supabase
   do portal: projeto `ouxzzduwjxmtixfftpsy`).
   - Conteúdo separado por seção: abertura (kicker, título, subtítulo, botões, foto),
     Conheça o Daniel (texto e credenciais), números (+20 visitas técnicas etc.),
     palestras (4 temas + páginas individuais), consultoria, livro (link Kiwify),
     clientes, blog, rodapé/redes sociais, WhatsApp.
   - Textos: campo editável + Salvar. Fotos: botão "Trocar foto" com upload para o
     Supabase Storage (como as capas do portal). Links e números editáveis.
2. **Os textos atuais continuam escritos dentro das páginas HTML** (base/fallback).
   Cada elemento editável recebe uma marca (ex.: `data-ed="hero.titulo"`). Um script
   lê o Supabase e troca só o que foi alterado. Se o Supabase falhar, o site continua
   completo. Bom para o Google.
3. **Botão "Publicar no site"**: chama um *Deploy Hook* da Vercel. A Vercel roda um
   build que busca o conteúdo no Supabase e grava os textos/fotos novos direto no HTML
   (assim o Google lê a versão nova sem depender de JavaScript).
   Fluxo do Daniel: editar → Salvar (já aparece) → Publicar no site.
4. **Continua precisando do Claude:** mudanças de layout, seções novas, cores,
   efeitos, páginas novas.
5. A pasta `/apresentacao/` é mantida à parte (tem seu próprio esquema de edição:
   COMO-EDITAR.md, conteudo.js, gerar-link.html). Não mexer sem o Daniel pedir.
6. Sugestão de ordem: começar pela página inicial (textos + fotos), mostrar prévia,
   depois palestras, páginas individuais e consultoria.

## Como o site é feito hoje (para retomar)
- Hospedagem: Vercel, projeto `site-daniel-donato` (conta Sinapse, plano Pro),
  publicado automaticamente a cada push na branch `main` deste repositório.
- Domínio: danieldonato.com.br (DNS no Wix: A → 216.150.1.1, CNAME www → Vercel).
- Os HTML da raiz (index, palestras, consultoria) são **gerados** por `_fonte/build2.py`
  a partir do design no Claude (artifact Design "Main.dc.html", "Mobile.dc.html",
  "Palestras.dc.html", "Consultoria.dc.html"). As 4 páginas individuais de palestras
  são geradas por `_fonte/gen_pal.py`.
  Atenção: editar os HTML da raiz direto funciona, mas o próximo build sobrescreve;
  manter design e build em sincronia.
- Estatísticas: tabela `site_eventos` + função `site_estatisticas` no Supabase
  (`_fonte/supabase-site-estatisticas.sql`), script `_fonte/rastreio.js` em todas as
  páginas, painel `_fonte/admin.html` → `/admin.html`. Também há Vercel Web Analytics.
- SEO: canonical, Open Graph, dados estruturados (Person/ProfessionalService, FAQ nas
  palestras), sitemap.xml, robots.txt, redirecionamentos 301 das URLs antigas do Wix
  em vercel.json, 404.html.
