import type { ProblemGuideItem } from "../../course/courseTypes";

export function ProblemGuide({ items }: { items: ProblemGuideItem[] }) {
  if (!items.length) return null;
  return (
    <ul className="problem-guide">
      {items.map((it) => (
        <li key={it.problem} className="problem-guide-item">
          <div className="problem-guide-problem">{it.problem}</div>
          <div className="problem-guide-products">
            {it.products.map((p) => (
              <span key={p} className="problem-guide-tag">
                {p}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
