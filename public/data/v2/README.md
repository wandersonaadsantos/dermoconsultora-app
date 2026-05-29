# Data Freeze v2 — Base Dermoconsultora Drogasil

## O que mudou vs v1

- Mescla da base enriquecida com `output/products_factuals.csv` (join por `URL_produto`).
- Regra de merge: só preencher quando o campo estiver vazio ou "Não informado" na base.
- Não sobrescreve valores já presentes.

## Arquivos incluídos

- base_drogasil_dermoconsulta_enriquecida.csv
- base_drogasil_dermoconsulta_enriquecida.json
- images_manifest.json
- data_freeze_manifest.json

## Métricas

- total_products: 2467
- factuals_rows_total: 2468
- factuals_matched_products: 2467
- factuals_unmatched_urls: 0
- factuals_fields_applied_total: 16019
