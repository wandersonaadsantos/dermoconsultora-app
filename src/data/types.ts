export type DataFreezeManifest = {
  version: string;
  created_at: string;
  total_products: number;
  need_tags_coverage: number;
  comparison_group_coverage: number;
  tratamento_cosmetico_outros_count: number;
  warnings_count: number;
  both_substitute_and_complementary_count: number;
  can_start_app: boolean;
  limitations: string[];
};

export type ImageManifestRow = {
  url_produto: string;
  image_url?: string;
  thumbnail_path?: string;
  medium_path?: string;
  status?: string;
};

export type ProductRow = {
  URL_produto: string;
  Produto: string;
  Marca: string;
  is_needs?: boolean;
  need_tags?: string;
  routine_step?: string;
  caution_level?: string;
  complexity_level?: string;
  comparison_group?: string;
  is_substitute_group?: boolean | string;
  is_complementary_group?: boolean | string;
  thumbnail_path?: string;
  medium_path?: string;
  has_image?: boolean;
  image_status?: string;
  drogasil_product_code?: string;
  drogasil_product_code_source?: string;
  manufacturer?: string;
  quantity?: string;
  site_description?: string;
  site_benefits?: string;
  site_how_to_use?: string;
  site_warnings?: string;
  site_characteristics?: string;
  factual_sections_found?: string;
  factual_sections_missing?: string;
  factual_capture_status?: string;
  factual_capture_notes?: string;
  [k: string]: unknown;
};
