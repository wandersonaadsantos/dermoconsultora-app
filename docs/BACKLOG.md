# Backlog consolidado — Dermoconsultora

> Origem: consolidação das 80 histórias geradas por Trae (US-001–030) e ChatGPT (US-031–080),
> deduplicadas e validadas contra o código real em 2026-05-29.
> As 80 histórias viram ~10 features distintas de engenharia + trilha de conteúdo + itens bloqueados por dado.

## Princípios (não negociáveis)

1. **Apoio cosmético, nunca clínico.** Não diagnosticar, não prescrever, não prometer cura.
2. **Não inventar dado factual.** Sem modo de uso/advertência na base → "confirmar no rótulo".
3. **Site ≠ estoque da loja.** Nunca prometer disponibilidade física.
4. **Sinal de alerta interrompe a indicação** e chama o farmacêutico.
5. **Poucas opções, perguntas mínimas.** Reduzir carga cognitiva no balcão.

## Estado atual validado (corrige os documentos de origem)

Já implementado (os documentos marcavam como "parcial"/"não atendido" por engano):

- **Código Drogasil + copiar** — `ProductDetail` (US-016/026/031). ✅
- **Aviso "site não garante estoque na loja"** — `ProductDetail`/`Consult` (US-027/032). ✅
- **Seção "Confirmar no rótulo" + "Quando chamar farmacêutico"** na ficha (US-009/041). ✅ *(mas não alcançável do /attend — ver A3)*
- **Bloqueio por sinal de alerta no /attend** (US-006). ✅ *(mas é um único sim/não — ver A1)*
- **Progresso de leitura do curso** (US-002/070). ✅
- **Similares na ficha** (US-033 parcial). ✅
- **Fluxo /attend alinhado ao curso**: 5 etapas, 6 opções, frase segura, fechamento com convite p/ voltar. ✅

Confirmado como gap real:

- **Sem filtro de preço na Consulta** — dado `price_tier` existe, `formatPriceTier` existe; falta só o filtro (US-022/034).
- **Sem "modo pressa"** no /attend (US-023/069).
- **Passo de alerta sem sub-gatilhos** (medicamento/gestante/criança) (US-019/021/044/056).
- **Sem resumo de handoff para o farmacêutico** (US-030/063).

---

## Balde A — P0 de frontend (dado/conteúdo já existem). Ordem de execução.

> **Status: A1–A7 entregues** (2026-05-29), cada um com testes e verificação no
> browser. 101 testes passando. Próximo foco sugerido: balde B (conteúdo) ou
> itens de operação além do parqueado.

### A1 — Sub-gatilhos no passo de alerta `[Segurança]`
**US:** 019, 021, 044, 056.
Adicionar perguntas explícitas no passo 4 que, se marcadas, forçam `hasAlert` e exibem o aviso do farmacêutico:
uso de medicamento dermatológico; gestante/lactante; bebê/criança com sintoma.
**Aceite:** marcar qualquer sub-gatilho bloqueia recomendação igual ao alerta; estado reflete na URL; teste cobrindo cada gatilho.

### A2 — Resumo para o farmacêutico (handoff) `[Segurança]`
**US:** 006+, 030, 063.
No modo alerta dos resultados, gerar um resumo de 3 linhas (necessidade, área, gatilho do alerta) que a consultora lê ao chamar o farmacêutico. **Sem dado pessoal da cliente, sem diagnóstico.**
**Aceite:** aparece só quando há alerta; texto factual; botão copiar; teste.

### A3 — Checklist "Confirmar no rótulo" alcançável do /attend `[Segurança]`
**US:** 010, 028, 041.
Extrair o checklist de rótulo num componente compartilhado e torná-lo acessível do resultado do atendimento (hoje só existe na ficha). 5–7 itens acionáveis.
**Aceite:** mesmo componente usado na ficha e no /attend; sem duplicação de texto.

### A4 — Filtro de faixa de preço na Consulta `[Operação]`
**US:** 022, 034.
Expor `price_tier` como filtro avançado, com aviso quando o dado não for confiável.
**Aceite:** filtra corretamente; conta no `activeAdvancedCount`; persiste na URL; teste.

### A5 — "Produto faltou → ver alternativas" `[Operação]`
**US:** 033.
Afordância explícita na ficha que leva às alternativas (similares/comparação), deixando claro "não é igual, mas mesma necessidade/categoria".
**Aceite:** ação visível; reaproveita similares; sem prometer equivalência.

### A6 — Modo pressa (atendimento em 3 passos) `[UX]`
**US:** 023, 069.
Variante curta do /attend: necessidade → alerta → 2 opções. Sempre passa pelo alerta.
**Aceite:** atalho a partir da Home/CTA; nunca pula alerta; máx. 2 opções.

### A7 — Acesso rápido a frases seguras por situação `[UX]`
**US:** 001, 036, 080.
Atalho para frases seguras por objeção (pressa, "o melhor/mais forte", "não sei"), reaproveitando talk tracks do curso.
**Aceite:** poucos toques; reusa conteúdo existente; sem promessa.

---

## Balde B — Trilha de conteúdo/currículo (escrita, não dev)

> **Status (2026-05-29):** integrada a "base científica e profissional" a partir
> de material trazido pelo usuário — 5 módulos novos (estrutura da pele, anatomia
> do fio/couro cabeludo, unhas, venda consultiva, atuação profissional) e
> enriquecimento de sol/fotoproteção, hidratação e tipos de pele (27 → 32 módulos).
> Simulações por perfil de cliente difícil adicionadas (cliente-hostil,
> internet-tiktok, cliente-insistente). Diagramas de estudo (SVG originais de
> pele, fio e unha) e guia "problema → tipos de produto" adicionados aos módulos
> de anatomia. Ainda pendente nesta trilha: cobertura prática extra de
> corpo/higiene e módulos "frases proibidas vs seguras".
>
> Nota técnica: a A4 introduziu `price_tier` obrigatório em `FilterState`, o que
> quebrava o `build` (não pego pelo `typecheck` da raiz). Corrigido; gate de
> pré-push agora inclui lint + build, não só typecheck + testes.

Novas simulações/módulos. Prioridade dentro da trilha: **segurança > categorias**.

- Simulações por perfil: cliente hostil (US-039), "vi no TikTok" (US-037), insistente (US-077), pressa (US-023 conteúdo), orçamento (US-022 conteúdo). 
- Módulos "frases proibidas vs seguras" (US-078) e "perguntas antes de indicar por categoria" (US-079).
- Cobertura além do skincare facial: cabelo/queda como alerta (US-046), corpo/ferida (US-048), higiene pessoal (US-049), maquiagem básica/tom (US-052/053), perfumaria/presente (US-050).
- Comunicação sensível: acne/mancha sem constranger (US-038), cliente masculino (US-054), idosa/expectativa (US-055), adolescente c/ responsável (US-056 conteúdo).
- Pós-atendimento: cliente volta reclamando que ardeu (US-066).

## Balde C — Bloqueado por dado que o app não tem (parquear)

Só avançam com fonte oficial:

- Localização física do produto na loja (US-031).
- Estoque real da loja (US-076).
- Taxonomia olfativa / "tem cheiro?" (US-011/050/051).
- Tom de base / prova com imagem (US-053).
- Kits e campanhas/promoções (US-035/065).
- Enriquecimento factual direcionado dos top-N produtos (US-058/059) — depende de pipeline de coleta; expor "reportar dado ausente" (US-059) pode ser um primeiro passo barato.

## Balde D — Não construir (manter como guardrail explícito)

- Diagnóstico por foto (US-074).
- Recomendar medicamento (US-075).
- Garantir estoque a partir do site (US-076).
- Recomendar "o melhor" universal / prazo garantido de resultado.

---

## Jornada de aprendizado (gamificação leve) — fora das 80 US

Frente nova, a pedido do usuário, baseada em design instrucional (dual coding,
retrieval practice, microlearning, progresso visual, gamificação leve).

- **Iteração 1 — Trilha-jornada (feito, 2026-05-30):** /study redesenhado com
  hero de progresso (anel %, nível, XP, streak), etapas temáticas com barra e
  passos conectados, marcos por etapa. Motor puro testável em `gamification.ts`.
- **Iteração 2 — Página do módulo (pendente):** microlearning em cards
  (progressive disclosure) + **quiz de fixação** (retrieval) no lugar do
  "revelar resposta"; ícones por seção (dual coding); concluir dá XP.
- **Iteração 3 (ideia):** revisão espaçada — flashcards que ressurgem pontos-chave
  de módulos já lidos.

## Rastreabilidade (US → destino)

| US | Destino | US | Destino | US | Destino |
|----|---------|----|---------|----|---------|
| 001 | A7 | 028 | A3 | 055 | B |
| 002 | feito | 029 | UX/tablet (futuro) | 056 | A1 + B |
| 003 | B | 030 | A2 | 057 | acessibilidade (futuro) |
| 004 | A7/B | 031 | feito | 058 | C |
| 005 | feito | 032 | feito | 059 | C (reportar dado) |
| 006 | feito + A1/A2 | 033 | A5 | 060 | C (notas locais) |
| 007 | A1/atend | 034 | A4 | 061 | B |
| 008 | atend (explicabilidade) | 035 | C | 062 | B |
| 009 | feito | 036 | A7 | 063 | A2 |
| 010 | A3 | 037 | B | 064 | B (venda consultiva) |
| 011 | C | 038 | B | 065 | C |
| 012 | A6/atend | 039 | B | 066 | B |
| 013 | atend/segurança | 040 | atend | 067 | consulta (futuro) |
| 014 | A7/segurança | 041 | A3 | 068 | dados (futuro) |
| 015 | segurança | 042 | C/factual | 069 | A6 |
| 016 | feito | 043 | B/operação | 070 | feito |
| 017 | feito (compare) | 044 | A1 | 071 | C (analytics) |
| 018 | feito (compare) | 045 | segurança | 072 | conteúdo/UX writing |
| 019 | A1 | 046 | A1 + B | 073 | conteúdo |
| 020 | A1/atend | 047 | B | 074 | D |
| 021 | A1 | 048 | B | 075 | D |
| 022 | A4 | 049 | B | 076 | D |
| 023 | A6 | 050 | C/B | 077 | B |
| 024 | C/B | 051 | C | 078 | B |
| 025 | B | 052 | B | 079 | B |
| 026 | feito | 053 | C | 080 | A7 |
| 027 | feito | 054 | B | | |
