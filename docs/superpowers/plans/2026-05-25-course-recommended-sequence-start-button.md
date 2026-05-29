# Botão "Começar" na Sequência Recomendada (prática) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um botão “Começar” na seção “Sequência recomendada (prática)” da tela Formação, navegando para `/study/atendimento-consultivo`, e cobrir com teste garantindo presença e alteração do hash sem depender de network real.

**Architecture:** Implementação direta na UI existente em `Course.tsx`, reaproveitando `Button` e `useNavigate`. Teste via `AppRoutes` (HashRouter) com `fetch` mockado como nos demais testes, validando `window.location.hash` após clique.

**Tech Stack:** React, react-router-dom (HashRouter), Testing Library, Vitest.

---

## Estrutura de arquivos

- Modificar: `src/screens/Course.tsx`
  - Inserir um bloco `.toolbar` dentro da seção “Sequência recomendada (prática)”, logo após o texto (description) e antes da lista.
  - Botão “Começar” navega para `/study/atendimento-consultivo`.

- Modificar: `src/screens/CourseProgression.test.tsx`
  - Expandir o teste para validar:
    - Presença do botão “Começar” dentro da seção.
    - Clique no botão altera `window.location.hash` para `#/study/atendimento-consultivo`.
  - Garantir que não existe dependência de network real: stub de `fetch` (como já está) cobrindo endpoints de manifest/base/images.

---

### Task 1: Atualizar UI da sequência recomendada

**Files:**
- Modify: `src/screens/Course.tsx`

- [ ] **Step 1: Ajustar a seção “Sequência recomendada (prática)”**
  - Dentro do `<CourseSection title="Sequência recomendada (prática)" ...>`, inserir:
    - `<div className="toolbar">` com `<Button ...>Começar</Button>`
    - `onClick={() => nav("/study/atendimento-consultivo")}`
  - Manter a lista `<ol>` e os cards como estão.

- [ ] **Step 2: Rodar typecheck local do arquivo**
  - Verificar imports (Button já é importado) e que o handler usa `nav` já existente.

---

### Task 2: Expandir teste para cobrir o botão e navegação

**Files:**
- Modify: `src/screens/CourseProgression.test.tsx`

- [ ] **Step 1: Atualizar o teste existente para validar o botão**

```tsx
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";
```

  - Dentro do teste:
    - Localizar a seção via heading `h2` "Sequência recomendada (prática)" (já existe).
    - Confirmar presença do botão:

```tsx
const start = within(section as HTMLElement).getByRole("button", { name: "Começar" });
expect(start).toBeInTheDocument();
```

  - Clicar no botão e validar hash:

```tsx
fireEvent.click(start);
expect(window.location.hash).toBe("#/study/atendimento-consultivo");
```

- [ ] **Step 2: Garantir que o teste não depende de network real**
  - Manter `setupFetch()` stubando `fetch` e retornando `Response` para:
    - `data/v2/data_freeze_manifest.json`
    - `data/v2/base_drogasil_dermoconsulta_enriquecida.json`
    - `data/v2/images_manifest.json`

---

### Task 3: Validação local (comandos do repo)

**Files:** (nenhum)

- [ ] **Step 1: Rodar testes**
  - Run: `pnpm vitest run`
  - Expected: exit 0

- [ ] **Step 2: Rodar typecheck**
  - Run: `pnpm run typecheck`
  - Expected: exit 0

- [ ] **Step 3: Rodar build**
  - Run: `pnpm build`
  - Expected: exit 0

- [ ] **Step 4: Validar que o preview inicia**
  - Run: `pnpm preview`
  - Expected: processo inicia e exibe URL local; encerrar em seguida.

