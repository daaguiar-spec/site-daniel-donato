# Proposta e contrato on-line · Daniel Donato

## Primeira vez (uma vez só)
1. Abra o Supabase → SQL Editor e rode o arquivo `_fonte/supabase-propostas.sql`.
   Antes, confira o e-mail na linha `insert into public.proposta_admins` (é quem pode entrar no painel).
2. Preencha os dados da sua empresa (razão social, CNPJ, endereço) em `proposta/modelo.js`, no bloco `contratada`.
3. Peça ao seu advogado para revisar as cláusulas padrão em `proposta/modelo.js`.

## Endereços
- Painel: `danieldonato.com.br/propostas` (mesmo login do /admin)
- Proposta do cliente: `danieldonato.com.br/proposta/?p=CÓDIGO`
- Demonstração sem banco: `/proposta/?demo`, `/proposta/?demo=ajustada`, `/proposta/?demo=contrato` e `/proposta/painel.html?demo`

## Fluxo
1. **Nova proposta** no painel → preencha valores, parcelas e cláusulas → **Salvar e enviar ao cliente**.
   O painel monta a mensagem com o link da apresentação (que ganha o botão "Ver a proposta") e o link da proposta.
2. O cliente pode **aceitar** (preenchendo os dados para o contrato), **pedir ajuste** ou **conversar no WhatsApp**.
   Você recebe e-mail a cada passo (mesmo e-mail dos avisos da apresentação, com cópia para o consultor).
3. Pedido de ajuste → edite no painel → **Publicar nova versão**. O cliente vê no mesmo link, com os pontos alterados marcados.
4. Aceite → confira contratante e cláusulas → **Liberar contrato**. O contrato aparece na aba "Contrato".
5. O cliente pode sugerir alteração por cláusula, ou baixar o PDF, assinar pelo gov.br e enviar pelo WhatsApp/e-mail.
6. Recebeu o contrato assinado → **Marcar como assinado**.

## PDF
Os botões "Baixar PDF" abrem a janela de impressão: escolha **Salvar como PDF**.
No iPhone: Compartilhar → Imprimir → Salvar em Arquivos (ou "Salvar como PDF").
