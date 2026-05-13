# Coding Patterns - Vant.Business

Padroes praticos para manter o projeto consistente.

## Frontend

- Preferir componentes pequenos e claros em `src/components`.
- Separar dados estaticos em `src/data` quando a informacao for reutilizavel.
- Evitar CSS global quando uma classe Tailwind local resolver.
- Validar responsividade quando alterar layouts principais.

## Conteudo

- Manter textos publicos com tom profissional, direto, tecnologico e acessivel.
- Evitar promessa exagerada sobre IA, automacao ou resultado financeiro.
- Diferenciar conteudo editorial, captura de lead e oferta comercial.

## APIs

- Validar entrada antes de gravar ou enviar email.
- Nao expor segredos no frontend.
- Centralizar mensagens de erro quando houver repeticao real.

## Validacao

- Rodar `npm run build` para mudancas de frontend, rotas, conteudo ou config.
- Rodar `npm run check:tool-logos` para mudancas na biblioteca de ferramentas.
