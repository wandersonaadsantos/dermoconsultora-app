# Task 2 M5.3 — Talk Tracks (Treino de fala)

## Objetivo

Adicionar uma seção opcional **“Treino de fala”** na tela de módulo do curso para o módulo `treino-de-fala-objecoes`, exibindo cards com roteiros curtos de atendimento no formato:

- Cliente (fala do cliente)
- Você (resposta sugerida)
- Pergunta de checagem (pergunta rápida para validar segurança/entendimento)

## Escopo

### Inclui

- Criar `src/course/courseTalkTracks.ts` com os dados e tipos locais.
- Criar `src/components/course/TalkTrackCard.tsx` para renderizar um talk track.
- Atualizar `src/screens/CourseModule.tsx` para:
  - localizar talk tracks por `module.id`
  - renderizar a seção “Treino de fala” apenas quando existir conteúdo
- Adicionar teste de UI `src/screens/CourseModuleTalkTracks.test.tsx` garantindo que a seção aparece ao abrir `#/study/treino-de-fala-objecoes`.
- Rodar `pnpm vitest run` (e `typecheck` se necessário).

### Não inclui

- Não adicionar talk tracks a outros módulos nesta task.
- Não alterar `src/course/courseTypes.ts` (tipo definido localmente em `courseTalkTracks.ts`).

## Design de dados

Arquivo: `src/course/courseTalkTracks.ts`

- Exportar `CourseTalkTrack` (tipo local) e `courseTalkTracks`:
  - `CourseTalkTrack = { id: string; customer: string; you: string; checkQuestion: string }`
  - `courseTalkTracks: Record<string, CourseTalkTrack[]>`
- Chavear por `moduleId` (`CourseModule.id`).
- Popular apenas `treino-de-fala-objecoes` com uma lista de itens.

## Design de UI

Componente: `src/components/course/TalkTrackCard.tsx`

- Props: `{ talkTrack: CourseTalkTrack }`
- Estrutura visual seguindo padrões atuais (ex.: `notice`, `warning-title`).
- Exibir claramente os três campos, sem `<details>`.

Tela: `src/screens/CourseModule.tsx`

- Importar `courseTalkTracks` e `TalkTrackCard`.
- Resolver lista: `const talkTracks = courseTalkTracks[module.id] ?? null`.
- Render condicional:
  - se `talkTracks` for `null` ou `[]`, não renderiza nada
  - caso contrário, renderiza `CourseSection` com título “Treino de fala”

## Testes

Arquivo: `src/screens/CourseModuleTalkTracks.test.tsx`

- Renderizar as rotas do app (`AppRoutes`).
- Setar `window.location.hash = "#/study/treino-de-fala-objecoes"`.
- Validar que o título “Treino de fala” aparece e que pelo menos um card é exibido (por texto “Cliente:” ou conteúdo do talk track).

## Critérios de aceite

- `#/study/treino-de-fala-objecoes` mostra a seção “Treino de fala”.
- Outros módulos não exibem a seção.
- `pnpm vitest run` passa.
- (Se necessário) `pnpm typecheck` passa.
