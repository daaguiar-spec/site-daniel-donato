# Apresentação comercial · Daniel Donato

## Onde colocar
Copie esta pasta `apresentacao` para dentro do site (no mesmo lugar onde está a pasta `img`).
Endereços depois de publicar:
- Apresentação: `site-daniel-donato.vercel.app/apresentacao/`
- Gerador de link para os vendedores: `site-daniel-donato.vercel.app/apresentacao/gerar-link.html`

## Como editar
Todo o conteúdo fica no arquivo `conteudo.js`. Altere só o que está entre aspas e mantenha as vírgulas.

- **Vídeos:** cole o link do YouTube em `link`. O primeiro da lista é o destaque. Sem nenhum link, a seção fica escondida.
- **Depoimentos:** preencha `texto`, `nome` e `cargo`. Os que estiverem sem texto não aparecem.
- **Números, temas, clientes e passos:** é só trocar o texto.
- **Fotos:** use o caminho de uma imagem da pasta `img` do site, por exemplo `/img/palestra.webp`.

## Link personalizado
Use o `gerar-link.html`, ou monte o link à mão:
`.../apresentacao/?cliente=Hotel Praiano&vendedor=João&fone=85988887777`

- `cliente`: nome que aparece na capa.
- `vendedor`: nome que aparece no fim da apresentação.
- `fone`: WhatsApp para onde vai o botão. Se ficar vazio, o botão vai para o número do comercial.

## Durante a visita
Clique em **Apresentar** (ou aperte F) para abrir em tela cheia. As setas do teclado ou a barra de espaço passam de uma tela para a outra.

## PDF da apresentação
O botão "Baixar esta apresentação em PDF" baixa o arquivo `apresentacao-daniel-donato.pdf` (uma página por seção, como na tela do computador).
Mudou textos, fotos ou vídeos? Peça ao Claude para gerar o PDF de novo (scripts em `_fonte/gerar-pdf-apresentacao.js` e `_fonte/juntar-pdf.py`).
