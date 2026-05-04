# VANT Business — Portfólio Inteligente

## Sobre o projeto

O **VANT Business** é um portfólio profissional interativo criado para apresentar habilidades, experiências e projetos de **Victor Hugo Santos de Jesus** de forma personalizada conforme a área de interesse do recrutador.

Diferente de um currículo tradicional, o site permite que o recrutador selecione uma área da vaga e visualize automaticamente os projetos, habilidades e experiências mais relevantes para aquele contexto. A proposta é transformar o portfólio em uma experiência consultiva, organizada e mais fácil de avaliar.

## Problema que o projeto resolve

Currículos estáticos nem sempre destacam as informações mais importantes para cada vaga. Um mesmo profissional pode ter experiências em backend, automação, integração de sistemas, Salesforce, MuleSoft e produto digital, mas o recrutador pode não encontrar rapidamente o que é mais relevante.

Esse problema aumenta quando projetos, links, estudos, currículo e experiências ficam espalhados em diferentes plataformas ou apresentados sem contexto.

## Solução desenvolvida

O VANT Business centraliza currículo, projetos, habilidades e links profissionais em uma experiência interativa. O **Modo Recrutador** permite selecionar uma área de interesse e reorganizar o perfil profissional com base nos dados cadastrados no próprio projeto.

A interface cruza dados de projetos, habilidades, experiências e áreas profissionais para exibir uma visão personalizada do perfil de Victor Hugo.

## Funcionalidades

- Home profissional com posicionamento técnico
- Modo Recrutador com seleção por área de vaga
- Filtro automático de habilidades relevantes
- Filtro automático de projetos alinhados à vaga
- Filtro de experiências relacionadas
- Seção de projetos com filtros por área
- Modal de estudo de caso para cada projeto
- Seção de currículo e trajetória profissional
- Links para GitHub, LinkedIn, Trailhead e currículo PDF
- Design responsivo
- SEO básico
- Dados separados da interface

## Tecnologias utilizadas

- **React**: usado para componentizar a interface, organizar seções e criar interações como filtros, seleção de perfil e modal de projeto.
- **Vite**: usado como ferramenta de build e ambiente de desenvolvimento rápido para aplicações React.
- **JavaScript**: usado na lógica de renderização, filtros, mapeamento de dados e interação do Modo Recrutador.
- **Tailwind CSS**: usado para construir o design responsivo, padronizar espaçamentos, cores, cards, botões e estados visuais.
- **Vercel**: plataforma prevista para deploy da aplicação web.
- **Git/GitHub**: usados para versionamento, organização do código e publicação do projeto técnico.

## Arquitetura do projeto

A aplicação foi organizada para separar interface, dados e elementos reutilizáveis.

```txt
src/
  components/
  components/ui/
  data/
  App.jsx
  main.jsx
  index.css
```

- **components**: componentes visuais da interface, como Header, Hero, Modo Recrutador, Projetos, Habilidades, Currículo, Contato e Footer.
- **components/ui**: elementos reutilizáveis simples, como botões, tags e cabeçalhos de seção.
- **data**: dados do portfólio separados da interface, incluindo projetos, habilidades, experiências e perfis do Modo Recrutador.
- **App.jsx**: composição principal das seções do site.
- **index.css**: estilos globais, configurações base e diretivas do Tailwind CSS.

## Estrutura de pastas

```txt
vant-business/
├── public/
│   └── curriculo-victor-hugo.pdf
├── src/
│   ├── components/
│   ├── components/ui/
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experiences.js
│   │   └── roles.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/victor-hugos/vant-business.git
```

2. Entre na pasta do projeto:

```bash
cd vant-business
```

3. Instale as dependências:

```bash
npm install
```

4. Rode o projeto:

```bash
npm run dev
```

5. Acesse no navegador:

```txt
http://localhost:5173
```

> Observação: se o nome do repositório for diferente, ajuste a URL do clone antes de executar o comando.

## Como atualizar projetos

Os projetos ficam no arquivo:

```txt
src/data/projects.js
```

Para adicionar um novo projeto, crie um novo objeto no array `projects` com campos como:

- `id`
- `name`
- `type`
- `shortDescription`
- `fullDescription`
- `technologies`
- `relatedAreas`
- `highlights`
- `problem`
- `solution`
- `status`
- `githubUrl`
- `liveUrl`

Exemplo:

```js
{
  id: 'novo-projeto',
  name: 'Novo Projeto',
  type: 'Aplicação web',
  shortDescription: 'Resumo curto do projeto.',
  fullDescription: 'Descrição completa do contexto, objetivo e funcionamento do projeto.',
  technologies: ['React', 'Vite', 'Tailwind CSS'],
  relatedAreas: ['Frontend', 'Produto Digital'],
  highlights: ['Interface responsiva', 'Organização por componentes'],
  problem: 'Problema que motivou o projeto.',
  solution: 'Solução desenvolvida.',
  status: 'Em evolução',
  githubUrl: 'https://github.com/usuario/repositorio',
  liveUrl: 'https://exemplo.vercel.app'
}
```

## Como atualizar habilidades

As habilidades ficam no arquivo:

```txt
src/data/skills.js
```

Cada habilidade possui:

- `name`
- `category`
- `level`
- `relatedAreas`
- `description`

Esses dados alimentam tanto a seção de habilidades quanto o Modo Recrutador.

## Como atualizar o Modo Recrutador

O Modo Recrutador usa o arquivo:

```txt
src/data/roles.js
```

Cada área possui:

- `title`
- `description`
- `recommendedSummary`
- `prioritySkills`
- `priorityProjects`
- `relatedExperiences`

O sistema cruza esses dados com os arquivos de projetos, habilidades e experiências para montar um perfil recomendado por área de vaga.

## Lógica do Modo Recrutador

Em linguagem simples, o fluxo funciona assim:

1. O usuário seleciona uma área da vaga.
2. O sistema busca essa área em `roles.js`.
3. O sistema identifica as habilidades prioritárias.
4. O sistema identifica os projetos relacionados.
5. O sistema identifica as experiências conectadas.
6. A interface renderiza um perfil personalizado para o recrutador.

## Projetos destacados no portfólio

### Certifica Monstros

Plataforma de simulados, ranking, pontuação e acompanhamento de progresso.

### LeadFlow Automation

API de automação comercial para captação, validação, pontuação e classificação de leads.

### INSISINT

Produto digital para planejamento de conteúdo, geração de ideias e apoio estratégico com IA.

### MuleSoft + Salesforce Automation

Estudos e práticas envolvendo Salesforce Flow, MuleSoft Composer, APIs REST e integração de sistemas.

## Aprendizados demonstrados

- Componentização com React
- Separação entre dados e interface
- Criação de filtros dinâmicos
- Lógica condicional aplicada à experiência do usuário
- Organização de projetos em formato de estudo de caso
- Design responsivo com Tailwind CSS
- Documentação técnica
- Deploy de aplicação web
- Construção de portfólio como produto digital

## Próximas melhorias

- Criar páginas individuais para cada projeto
- Adicionar blog técnico
- Criar painel administrativo para editar projetos sem alterar código
- Adicionar analytics de cliques
- Criar versão em inglês
- Adicionar formulário de contato funcional
- Adicionar modo claro/escuro
- Adicionar testes automatizados
- Melhorar SEO com imagem Open Graph

## Links

- Portfólio: https://vant.business
- GitHub: https://github.com/victor-hugos
- LinkedIn: https://www.linkedin.com/in/victor-hugos
- Trailhead: https://www.salesforce.com/trailblazer/kzu5z6w88yrh1i1bvz

## Autor

**Victor Hugo Santos de Jesus**

Desenvolvedor de Sistemas / Automação

Foco em automação de processos, APIs, backend, integração de sistemas, Salesforce, MuleSoft e produtos digitais.
