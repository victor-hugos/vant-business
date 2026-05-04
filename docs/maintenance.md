# Guia de manutenção — VANT Business

Este guia explica como manter o conteúdo do VANT Business atualizado sem precisar alterar a estrutura principal da interface.

## Como adicionar um novo projeto

Os projetos ficam em:

```txt
src/data/projects.js
```

Passo a passo:

1. Abra o arquivo `src/data/projects.js`.
2. Localize o array `projects`.
3. Copie a estrutura de um projeto existente.
4. Cole um novo objeto no array.
5. Altere os campos com os dados do novo projeto.
6. Garanta que o `id` seja único.
7. Preencha `relatedAreas`, pois esse campo alimenta os filtros da seção de projetos.
8. Preencha `githubUrl` e `liveUrl` somente quando existirem.
9. Salve o arquivo e teste a seção de projetos.

Campos principais:

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

## Como adicionar uma nova habilidade

As habilidades ficam em:

```txt
src/data/skills.js
```

Passo a passo:

1. Abra o arquivo `src/data/skills.js`.
2. Localize o array `skills`.
3. Adicione um novo objeto seguindo o padrão existente.
4. Use um `name` claro, pois esse nome também pode ser usado pelo Modo Recrutador.
5. Defina a `category` para agrupar a habilidade visualmente.
6. Informe o `level`.
7. Preencha `relatedAreas` com áreas ligadas à habilidade.
8. Escreva uma `description` curta e objetiva.
9. Salve o arquivo e confira a seção de habilidades.

Campos principais:

- `name`
- `category`
- `level`
- `relatedAreas`
- `description`

## Como adicionar uma nova experiência

As experiências ficam em:

```txt
src/data/experiences.js
```

Passo a passo:

1. Abra o arquivo `src/data/experiences.js`.
2. Localize o array `experiences`.
3. Adicione um novo objeto com os dados da experiência.
4. Preencha `company`, `role`, `period`, `type` e `description`.
5. Adicione atividades no array `activities`.
6. Preencha `relatedAreas` com as áreas conectadas à experiência.
7. Salve o arquivo e confira a seção de currículo.

Campos principais:

- `company`
- `role`
- `period`
- `type`
- `description`
- `activities`
- `relatedAreas`

## Como adicionar uma nova área no Modo Recrutador

As áreas do Modo Recrutador ficam em:

```txt
src/data/roles.js
```

Passo a passo:

1. Abra o arquivo `src/data/roles.js`.
2. Localize o objeto `roles`.
3. Crie uma nova chave para a área, por exemplo `dataAutomation`.
4. Adicione `title`, `description` e `recommendedSummary`.
5. Preencha `prioritySkills` com nomes existentes em `skills.js`.
6. Preencha `priorityProjects` com ids existentes em `projects.js`.
7. Preencha `relatedExperiences` com nomes de empresas existentes em `experiences.js`.
8. Salve o arquivo.
9. Teste o Modo Recrutador selecionando a nova área.

Campos principais:

- `title`
- `description`
- `recommendedSummary`
- `prioritySkills`
- `priorityProjects`
- `relatedExperiences`

Importante:

- Os nomes em `prioritySkills` devem bater com `skill.name`.
- Os ids em `priorityProjects` devem bater com `project.id`.
- Os nomes em `relatedExperiences` devem bater com `experience.company`.

## Como trocar o currículo PDF

O currículo PDF deve ficar em:

```txt
public/curriculo-victor-hugo.pdf
```

Para trocar o arquivo:

1. Gere ou baixe a nova versão do currículo em PDF.
2. Renomeie o arquivo para `curriculo-victor-hugo.pdf`.
3. Substitua o arquivo existente dentro da pasta `public`.
4. Mantenha exatamente o mesmo nome para que os botões do site continuem funcionando.
5. Rode o projeto e teste o link do currículo.

## Como atualizar links profissionais

Os links profissionais aparecem em alguns pontos da aplicação.

Procure principalmente em:

```txt
src/components/ContactSection.jsx
src/components/ResumeSection.jsx
src/components/RecruiterMode.jsx
src/components/Hero.jsx
```

O que conferir:

- Link do GitHub
- Link do LinkedIn
- Link do Trailhead
- Link do currículo PDF
- Link do portfólio
- Email de contato

Sempre evite deixar links vazios visíveis na interface.

## Checklist antes de publicar

- [ ] Rodar `npm run dev`
- [ ] Testar menu
- [ ] Testar Modo Recrutador
- [ ] Testar filtros de projetos
- [ ] Testar modal de estudo de caso
- [ ] Testar links externos
- [ ] Testar currículo PDF
- [ ] Testar responsividade
- [ ] Fazer commit no Git
- [ ] Fazer push para o GitHub
- [ ] Conferir deploy na Vercel
