# Currículo profissional

Página única em React, TypeScript, Tailwind CSS e Vite. Sem backend, fontes externas ou serviços essenciais. Os dados ainda não foram fornecidos: lacunas aparecem como `[A preencher]`.

## Executar

Node 24 e npm (no PowerShell, use `npm.cmd` caso a política de scripts bloqueie `npm`).

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

`build` inclui checagem de tipos e produz `dist/`. `npm run typecheck` executa só os tipos. Testes usam o build existente: execute `build` antes de `test`. No Windows usam o Edge instalado; em outros sistemas, use `CI=true` e instale Chromium com `npx playwright install --with-deps chromium`.

## Editar

Altere **`src/data/profile.ts`**: nome, apresentação, experiências, formação, competências, cursos e contatos. Campos opcionais podem ser omitidos e listas podem ficar vazias. Use somente informações reais; email, telefone internacional e LinkedIn só viram links quando válidos. Para o LinkedIn, use a URL HTTPS do perfil `/in/…`.

Atualize também título, descrição e metadados em `index.html` quando os dados forem conhecidos. O conteúdo é renderizado no cliente: o HTML inicial contém metadados, mas não o currículo completo; indexação e prévias não equivalem a uma página pré-renderizada.

## Publicar

Workflow em `.github/workflows/pages.yml`: push em `main` ou execução manual; `npm ci`, tipos, build e testes antes de publicar somente `dist/`. Base `/` para **https://elizetakelvin.github.io/**.

No GitHub, selecione **Settings → Pages → Build and deployment → Source: GitHub Actions**. Envie os arquivos ao repositório e acompanhe a execução em **Actions**. A configuração local não comprova uma publicação concluída.

Referências: [Vite / GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [workflows oficiais do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). O [Start Bootstrap Resume](https://startbootstrap.com/theme/resume) foi consultado apenas para o conceito de página única com navegação lateral e âncoras.
