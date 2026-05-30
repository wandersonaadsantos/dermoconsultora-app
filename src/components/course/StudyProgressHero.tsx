import { Button } from "../Button";
import { computeLevel, computeXp } from "../../study/gamification";

export type StudyProgressHeroProps = {
  readCount: number;
  total: number;
  streak: number;
  hasNext: boolean;
  onContinue: () => void;
};

export function StudyProgressHero(props: StudyProgressHeroProps) {
  const { readCount, total, streak, hasNext, onContinue } = props;
  const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;
  const { current, next, modulesToNext } = computeLevel(readCount);
  const xp = computeXp(readCount);

  const r = 34;
  const circumference = 2 * Math.PI * r;
  const dash = (percent / 100) * circumference;

  return (
    <div className="study-hero">
      <div className="study-hero-ring" role="img" aria-label={`${percent}% da trilha concluído`}>
        <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="study-hero-percent">{percent}%</div>
      </div>

      <div className="study-hero-main">
        <div className="study-hero-level">Nível: {current.title}</div>
        <div className="study-hero-summary course-reading-summary-inline">{`${readCount} de ${total} módulos lidos`}</div>
        <div className="study-hero-meta">
          <span className="study-hero-xp">{xp} XP</span>
          {streak > 0 ? (
            <span className="study-hero-streak">🔥 {streak} {streak === 1 ? "dia" : "dias"}</span>
          ) : null}
        </div>
        <div className="study-hero-next">
          {next ? `Faltam ${modulesToNext} para ${next.title}` : "Trilha completa 🎉"}
        </div>
        {hasNext ? (
          <div className="toolbar toolbar-in-card">
            <Button type="button" variant="primary" onClick={onContinue}>
              Continuar de onde parei
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
