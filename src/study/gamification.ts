import { courseModules } from "../course/courseModules";
import type { QuizQuestion } from "../course/courseTypes";

/** Etapa temática da trilha (jornada de aprendizado). */
export type Stage = {
  id: string;
  title: string;
  icon: string;
  moduleIds: string[];
};

/**
 * Agrupamento pedagógico dos módulos em etapas. A ordem aqui define a
 * progressão da trilha. Cobre todos os módulos (verificado em teste).
 */
export const STAGES: Stage[] = [
  {
    id: "fundamentos",
    title: "Fundamentos",
    icon: "🧠",
    moduleIds: [
      "papel-dermoconsultora",
      "atendimento-consultivo",
      "estrutura-da-pele",
      "tipos-condicoes-pele",
      "anatomia-fio-cabelo"
    ]
  },
  {
    id: "rotina-seguranca",
    title: "Rotina e segurança",
    icon: "🛡️",
    moduleIds: ["skincare-basico", "protecao-solar", "leitura-rotulo", "sinais-alerta-encaminhamento", "checklist-rapido"]
  },
  {
    id: "produtos",
    title: "Produtos na prática",
    icon: "🧴",
    moduleIds: [
      "produtos-na-pratica",
      "produtos-limpeza-facial",
      "produtos-hidratacao",
      "produtos-protecao-solar",
      "cabelo-corpo-perfumaria-maquiagem",
      "produtos-cabelo",
      "produtos-corpo",
      "produtos-perfumaria-maquiagem",
      "unhas-cuidados"
    ]
  },
  {
    id: "ativos",
    title: "Ativos cosméticos",
    icon: "🧪",
    moduleIds: [
      "ativos-cosmeticos",
      "ativos-hidratacao-barreira",
      "ativos-oleosidade-acne",
      "ativos-antioxidantes-uniformizacao",
      "ativos-renovacao-anti-idade"
    ]
  },
  {
    id: "atendimento-venda",
    title: "Atendimento e venda",
    icon: "💬",
    moduleIds: [
      "categorias-de-loja",
      "comparar-parecidos",
      "venda-consultiva",
      "treino-de-fala-objecoes",
      "simulacoes-atendimento",
      "exercicios-com-gabarito"
    ]
  },
  {
    id: "profissional",
    title: "Profissional e loja",
    icon: "🏪",
    moduleIds: ["atuacao-profissional", "operacao-de-loja"]
  }
];

/** Ordem linear dos módulos ao longo da trilha (achata as etapas). */
export const TRILHA_ORDER: string[] = STAGES.flatMap((s) => s.moduleIds);

export type StudyLevel = { key: string; title: string; minModules: number };

export const LEVELS: StudyLevel[] = [
  { key: "iniciante", title: "Iniciante", minModules: 0 },
  { key: "aprendiz", title: "Aprendiz", minModules: 5 },
  { key: "consultora", title: "Consultora", minModules: 15 },
  { key: "especialista", title: "Especialista", minModules: 28 }
];

export const XP_PER_MODULE = 10;

export function computeXp(readCount: number): number {
  return Math.max(0, readCount) * XP_PER_MODULE;
}

export function computeLevel(readCount: number): {
  current: StudyLevel;
  next: StudyLevel | null;
  modulesToNext: number;
} {
  let current = LEVELS[0];
  let next: StudyLevel | null = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (readCount >= LEVELS[i].minModules) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
    }
  }
  const modulesToNext = next ? Math.max(0, next.minModules - readCount) : 0;
  return { current, next, modulesToNext };
}

export type StageProgress = {
  stage: Stage;
  total: number;
  read: number;
  percent: number;
  complete: boolean;
};

export function computeStageProgress(stage: Stage, readSet: Set<string>): StageProgress {
  const total = stage.moduleIds.length;
  const read = stage.moduleIds.filter((id) => readSet.has(id)).length;
  const percent = total === 0 ? 0 : Math.round((read / total) * 100);
  return { stage, total, read, percent, complete: total > 0 && read === total };
}

/** Marcos conquistados: etapas 100% concluídas. */
export function computeMilestones(readSet: Set<string>): Stage[] {
  return STAGES.filter((s) => s.moduleIds.length > 0 && s.moduleIds.every((id) => readSet.has(id)));
}

/** Próximo módulo a estudar (primeiro não lido na ordem da trilha). */
export function nextModuleId(readSet: Set<string>): string | null {
  const validIds = new Set(courseModules.map((m) => m.id));
  for (const id of TRILHA_ORDER) {
    if (validIds.has(id) && !readSet.has(id)) return id;
  }
  return null;
}

/** Total de módulos válidos na base de cursos. */
export function totalModules(): number {
  return courseModules.length;
}

function shiftDay(key: string, deltaDays: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + deltaDays);
  return dt.toISOString().slice(0, 10);
}

/**
 * Sequência de dias consecutivos de estudo, contando apenas se houve
 * atividade hoje ou ontem (senão a sequência foi quebrada).
 */
export function computeStreak(dates: string[], today: string): number {
  const set = new Set(dates);
  let cursor = today;
  if (!set.has(cursor)) {
    const yesterday = shiftDay(today, -1);
    if (set.has(yesterday)) cursor = yesterday;
    else return 0;
  }
  let count = 0;
  while (set.has(cursor)) {
    count++;
    cursor = shiftDay(cursor, -1);
  }
  return count;
}

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Pergunta de revisão, anotada com o módulo de origem. */
export type ReviewItem = QuizQuestion & { moduleId: string; moduleTitle: string };

/** Reúne as perguntas de quiz dos módulos já lidos (base da revisão). */
export function collectReviewQuestions(readSet: Set<string>): ReviewItem[] {
  const items: ReviewItem[] = [];
  for (const m of courseModules) {
    if (!readSet.has(m.id) || !m.quiz) continue;
    for (const q of m.quiz) {
      items.push({ ...q, moduleId: m.id, moduleTitle: m.title });
    }
  }
  return items;
}

/**
 * Monta um baralho de revisão embaralhado a partir do que já foi estudado.
 * `rand` é injetável para tornar o embaralhamento determinístico em testes.
 */
export function buildReviewDeck(readSet: Set<string>, limit: number, rand: () => number = Math.random): ReviewItem[] {
  const arr = collectReviewQuestions(readSet);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.max(0, limit));
}
