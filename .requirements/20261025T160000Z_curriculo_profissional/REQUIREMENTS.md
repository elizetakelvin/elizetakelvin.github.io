# Currículo profissional

## As Is
Repositório sem commits e sem aplicação; somente skills e seu lockfile. Branch configurada: main. Nenhum dado pessoal fornecido.

## To Be
Página estática original em React, TypeScript, Tailwind e Vite, com navegação por âncoras e publicação de dist/ no GitHub Pages.

## Requirements
1. Centralizar dados tipados; identificar lacunas e omitir campos opcionais com segurança.
2. Oferecer apresentação, sobre, experiência, formação, competências, cursos e contato.
3. Navegação fixa no desktop; menu móvel acessível que fecha ao selecionar seção e com Escape.
4. Garantir semântica, teclado, foco, movimento reduzido, responsividade desde 320px e contatos válidos.
5. Build estático em dist/, base / e workflow oficial com validações antes do deploy.

## Acceptance Criteria
1. Nenhum dado profissional inventado; campos vazios exibem [A preencher] ou são omitidos.
2. Todas as seções têm destinos nativos válidos e títulos coerentes.
3. Botão expõe aria-expanded e aria-controls; teclado abre, seleciona e fecha; foco chega ao destino.
4. Testes de viewport, zoom, links, âncoras e movimento reduzido passam; inspeção visual do build em desktop, tablet e celular.
5. Tipos, build e testes passam; workflow usa main, npm ci, Node 24, ambiente github-pages, permissões e dependência de jobs.

## Testing Plan
Playwright sobre o build: ciclo vermelho/verde para menu e âncoras; testes de contatos, estados vazios, teclado, movimento reduzido, recursos, erros e overflow. Capturas em 1440, 768 e 320px. Checagem TypeScript e build Vite.

## Implementation Plan
1. Preparar stack e teste de menu; executar antes da implementação para confirmar falha.
2. Implementar navegação e dados; executar o teste para confirmar sucesso.
3. Adicionar casos de contato inválido/válido antes do validador e testar.
4. Compor seções e estilo; testar build em múltiplas larguras e revisar capturas.
5. Configurar Pages e documentar execução, dados e publicação.

Referências: documentação oficial Vite, React, Tailwind, Playwright e GitHub Pages. Serena, Kindly e Lad indisponíveis neste ambiente; Python ausente para a busca auxiliar de UI/UX.
