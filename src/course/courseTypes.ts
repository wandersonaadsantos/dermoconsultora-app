export type CourseExercise = {
  prompt: string;
  expectedAnswer: string;
};

/** Item do guia "problema → tipos de produto cosmético que ajudam". */
export type ProblemGuideItem = {
  problem: string;
  products: string[];
};

/** Chave de diagrama de estudo (renderizado como SVG original). */
export type CourseDiagramId = "pele" | "fio" | "unha";

export type CourseModule = {
  id: string;
  title: string;
  summary: string;
  objective: string;
  content: string;
  practicalExample: string;
  safePhrase: string;
  avoid: string;
  exercise: CourseExercise;
  /** Diagrama esquemático opcional exibido junto do conteúdo. */
  diagram?: CourseDiagramId;
  /** Guia opcional de problema → tipos de produto que ajudam. */
  problemGuide?: ProblemGuideItem[];
};

export type CourseProductFilter = {
  query?: string;
  brand?: string;
  routine_step?: string;
  need_tag?: string;
  caution_level?: string;
  complexity_level?: string;
  needsOnly?: boolean;
};

export type CourseRelatedProductsSection = {
  title: string;
  filter: CourseProductFilter;
  limit?: number;
};

