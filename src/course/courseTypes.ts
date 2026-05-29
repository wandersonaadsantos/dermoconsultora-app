export type CourseExercise = {
  prompt: string;
  expectedAnswer: string;
};

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

