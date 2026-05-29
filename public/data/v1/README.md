# Data Freeze v1 — Base Dermoconsultora Drogasil

## O que esta base contém

- Base enriquecida (CSV e JSON) com 2467 produtos, preservando campos factuais e adicionando campos consultivos derivados por regras determinísticas.
- Relatórios e artefatos de auditoria para rastreabilidade (warnings, amostras determinísticas, relatório de auditoria).
- Taxonomias (JSON) usadas na derivação: steps, tags, grupos de comparação, cautela, complexidade e faixas de preço.

## Para que ela pode ser usada

- App V1 HTML/tablet para consulta e aprendizado (busca, filtros e comparação com guardrails).
- Geração de rotinas/sugestões baseadas em campos derivados, com diferenciação explícita de factual vs derivado.

## Limitações conhecidas

- Ainda existem warnings, mas não há bloqueador estrutural.
- Nem todos os produtos têm dados factuais completos de rótulo/site.
- Campos derivados são rule-based, não equivalem a informação oficial do fabricante.
- O app deve diferenciar dado factual de dado derivado.
- Grupos genéricos ainda existem, mas abaixo do limite definido.
- O app não deve usar grupos genéricos como comparação direta sem cautela.
- Não há diagnóstico, prescrição ou promessa de tratamento.

## Regras de segurança

- Não tratar campos derivados como informação oficial do fabricante.
- Não fazer recomendação clínica, diagnóstico ou promessa de tratamento.
- Para grupos genéricos (*_outros), evitar comparação direta sem aviso explícito no app.

## Arquivos incluídos

- base_drogasil_dermoconsulta_enriquecida.csv
- base_drogasil_dermoconsulta_enriquecida.json
- normalization_report.json
- normalization_warnings.csv
- normalization_audit_report.md
- normalization_audit_samples.csv
- taxonomy_refinement_suggestions.md
- images_manifest.json
- routineSteps.json
- needTags.json
- comparisonGroups.json
- cautionRules.json
- complexityRules.json
- priceTiers.json

## Métricas finais

- total_products: 2467
- need_tags_coverage: 79.8%
- comparison_group_coverage: 99.7%
- tratamento_cosmetico_outros_count: 299
- warnings_count: 686
- both_substitute_and_complementary_count: 0

## Decisão

Liberada para app V1.
