# dermoconsultora-app (PWA tablet) — V1

App PWA online (SPA estática) para tablet, com Modo Estudo + Modo Atendimento, consumindo somente o data freeze v1 como assets versionados.

## Direção do produto

O objetivo principal do projeto é formar dermoconsultoras para atuar com mais segurança, prática e autonomia. O app/PWA é o meio de entrega da formação, consulta, comparação, checklist e apoio ao atendimento.

## Status

- Fundação (M1): assets v1 + data layer + filtros/paginação + guardrails de comparação
- UI funcional (M2): telas navegáveis mínimas
- Ajustes (M2.1): busca tokenizada + linguagem segura + aviso de origem/disponibilidade
- PWA + persistência + deploy (M3): service worker, manifest, cache controlado e persistência local mínima
- Polish tablet + QA (M4): ajustes finos de layout/toque e validação do fluxo principal (inclui offline após 1º carregamento)
- Revisão de acessibilidade, linguagem e legibilidade (M4.2): modo claro padrão, dark mode opcional, ficha do produto reorganizada para atendimento e detalhes técnicos recolhidos
- Curso base (M5.1): Home reposicionada + trilha em `/study` + módulos em `/study/:moduleId` + template de módulo + exemplos de produtos reais em módulos-chave
- M4.3: ficha prática + enriquecimento factual (campos do site versionados em v2 + seções factuais na ficha)
- M5.2: atendimento guiado em `/attend` + simulações em `/simulations` + exercícios em `/exercises` (gabarito recolhido por padrão)
- M5.3: prática de loja no estudo (módulos práticos + treino de fala + sequência recomendada)
- M5.4: refinamento visual e textual (layout/spacing/microcopy) para conforto no tablet, sem criar novas funcionalidades
- M5.5: revisão de UX do atendimento/consulta/comparação + sincronização com URL (restaura estado, melhora previsibilidade e legibilidade)
- M5.6: progresso visual de leitura no estudo + scroll-to-top ao abrir módulos (persistência local na chave `dermoconsultora:study:read-modules`)
- M6 (pausada): elevação didática do curso (aprofundamento dos módulos + novos módulos práticos por categoria e por blocos de ativos, com mais perguntas de atendimento, frases seguras e exercícios)

## Stack

- Vite
- React
- TypeScript
- React Router (HashRouter) para hosting estático (host-agnostic)
- PWA: vite-plugin-pwa (generateSW)
- Testes: Vitest + Testing Library

## Comandos

```bash
pnpm install
pnpm run prepare:data:v1
pnpm run prepare:data:v2
pnpm vitest run
pnpm run typecheck
pnpm dev
pnpm build
pnpm preview
```

## Validações (gate)

- `pnpm vitest run`: testes automatizados (inclui rotas e componentes do curso)
- `pnpm run typecheck`: checagem de tipos sem gerar build
- `pnpm build`: gate final (roda `tsc -b` + build do Vite)

## Telas (M2–M6)

- Home: atalhos + status da base v1 + aviso curto de segurança.
- Study (`/study`): trilha de formação + favoritos (para estudo) + sequência recomendada (prática) com botão “Começar pela sequência”.
- CourseModule (`/study/:moduleId`): template do módulo (objetivo, conteúdo, exemplo prático, frase segura, evitar, exercício com resposta esperada e, quando aplicável, produtos reais relacionados e treino de fala).
- Consult: busca + filtros + resultados paginados + abrir ficha + adicionar p/ comparar.
- Attend (`/attend`): fluxo guiado de baixa carga cognitiva para atender cliente agora (necessidade → área → preferência rápida → sinal de alerta → próximos passos).
- Simulations (`/simulations`): simulações práticas de atendimento (cenários + perguntas + resposta segura + o que evitar + quando encaminhar + fechamento).
- Exercises (`/exercises`): exercícios curtos com gabarito recolhido por `<details>`.
- ProductDetail: resumo prático, informações do produto, interpretação do app, confirmação de rótulo, chamada ao farmacêutico e detalhes técnicos recolhidos.
- Compare: comparação de 2–4 produtos com guardrails (não tratar `*_outros` como substituto direto).
- SafetyChecklist: frases prontas seguras.

## Busca (M2.1)

- Busca tokenizada e fora de ordem (ex.: `gel darrow actine 14` encontra `Gel de Limpeza Darrow Actine 140g`).
- Match parcial razoável (ex.: `14` → `140g`, `hidrat` → `hidratante`).

## Identidade do produto (regra)

- Identidade canônica: `URL_produto` (comparação e seleção sempre usam essa chave).
- Rota de detalhe:
  - usa `source_hash` quando existir;
  - senão usa `product_id` quando for único;
  - fallback: URL (via `encodeURIComponent(URL_produto)`).

## Limitação importante (origem do dado)

- A base foi coletada do site da Drogasil. Isso não garante estoque na loja física.
- Sempre confirmar disponibilidade e rótulo antes de orientar.

## Persistência local (M3)

Via `localStorage` (prefixo `dc:v1:`):

- Modo preferido (Home): Estudo ou Consulta.
- Tema visual: modo claro por padrão e modo escuro opcional.
- Filtros recentes (Consulta): campo de busca e selects/chips.
- Favoritos (para estudo): favoritar na Consulta/Ficha e revisar em Estudo.
- Comparação: seleção de URLs para a tela de Comparar.

## PWA e offline (M3)

- Manifest gerado em `dist/manifest.webmanifest`.
- Service worker gerado em `dist/sw.js`.
- Cache:
  - App shell (precache): `index.html` + assets do build.
  - Dados: `/data/v1/*.json` com `StaleWhileRevalidate`.
  - Imagens: `/assets/images/**` sob demanda com `CacheFirst` e expiração.

Comportamento em offline:

- Se o app já foi aberto online pelo menos uma vez: a navegação e a consulta continuam funcionando com os dados cacheados.
- No primeiro uso offline (sem cache local): o app mostra um aviso claro pedindo para conectar uma vez e recarregar.

## Tablet (M4)

- Topbar sticky para navegação acessível durante scroll.
- Tap targets maiores (botões com altura mínima confortável para toque).
- Em largura menor (tablet “em pé”): filtros e ações do card ficam mais simples (menos esmagados).

## Acessibilidade, linguagem e legibilidade (M4.2)

- O app inicia em modo claro; o modo escuro permanece disponível por botão no topo e é salvo localmente.
- A ficha do produto prioriza a decisão de atendimento: o que é o produto, para que necessidade pode fazer sentido, o que pode ser dito com segurança e o que deve ser confirmado no rótulo.
- Campos técnicos como `data_quality_score`, `data_quality_notes`, `source_hash`, `product_id`, URL completa e campos crus ficam dentro de “Ver detalhes técnicos da base”, fechado por padrão.
- Labels técnicas são traduzidas por helpers de apresentação em `src/presentation/formatters.ts`.
- O app continua sem diagnosticar, prescrever, prometer cura ou inventar dados factuais.

## Fonte de dados (regra)

- Não consumir `drogasil-dermo-scraper/output/` diretamente no runtime do app.
- O app consome assets versionados (v1 e, quando disponível, v2), originados do freeze:
  - `drogasil-dermo-scraper/output/data-freeze/v1/`
  - `drogasil-dermo-scraper/output/data-freeze/v2/`

Assets esperados:

- `public/data/v1/base_drogasil_dermoconsulta_enriquecida.json`
- `public/data/v1/images_manifest.json`
- `public/data/v1/data_freeze_manifest.json`
- `public/data/v1/README.md`
- `public/data/v2/base_drogasil_dermoconsulta_enriquecida.json` (quando publicado)
- `public/data/v2/images_manifest.json` (quando publicado)
- `public/data/v2/data_freeze_manifest.json` (quando publicado)
- `public/data/v2/README.md` (quando publicado)

O app tenta carregar `data/v2` por padrão e faz fallback automático para `data/v1` quando v2 não existir.

Imagens:

- `public/assets/images/thumb/`
- `public/assets/images/medium/`

## Deploy host-agnostic (M3)

- `pnpm build` gera `dist/`.
- O build de produção usa `base: "./"` (paths relativos), então funciona em qualquer subpath, desde que `dist/` seja servido como uma pasta estática.
- O escopo do service worker é a pasta onde `dist/` está hospedada. Para manter o app installable e o cache correto, publique `dist/` como a raiz do app no host (no subpath escolhido).
