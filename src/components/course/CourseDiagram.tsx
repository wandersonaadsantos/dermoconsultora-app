import type { CourseDiagramId } from "../../course/courseTypes";

type DiagramMeta = { caption: string };

const META: Record<CourseDiagramId, DiagramMeta> = {
  pele: { caption: "Corte esquemático da pele para estudo (epiderme, derme e hipoderme)." },
  fio: { caption: "Corte transversal esquemático do fio (cutícula, córtex e medula)." },
  unha: { caption: "Vista esquemática da unha (lâmina, lúnula, cutícula e leito)." }
};

function SkinDiagram() {
  return (
    <svg className="course-diagram-svg" viewBox="0 0 360 210" role="img" aria-labelledby="diag-pele-t diag-pele-d">
      <title id="diag-pele-t">Camadas da pele</title>
      <desc id="diag-pele-d">Três camadas empilhadas: epiderme no topo, derme no meio e hipoderme na base.</desc>
      <rect x="14" y="22" width="168" height="32" rx="6" fill="var(--accent-bg)" stroke="var(--border)" />
      <rect x="14" y="54" width="168" height="94" fill="var(--surface-soft)" stroke="var(--border)" />
      <rect x="14" y="148" width="168" height="46" rx="6" fill="var(--social-bg)" stroke="var(--border)" />
      <line x1="64" y1="22" x2="64" y2="146" stroke="var(--border)" strokeWidth="2" />
      <circle cx="64" cy="146" r="6" fill="var(--accent-bg)" stroke="var(--border)" />
      <text x="196" y="40" className="course-diagram-name">Epiderme</text>
      <text x="196" y="56" className="course-diagram-desc">barreira externa</text>
      <text x="196" y="104" className="course-diagram-name">Derme</text>
      <text x="196" y="120" className="course-diagram-desc">sustentação, folículos</text>
      <text x="196" y="172" className="course-diagram-name">Hipoderme</text>
      <text x="196" y="188" className="course-diagram-desc">gordura e suporte</text>
    </svg>
  );
}

function HairDiagram() {
  return (
    <svg className="course-diagram-svg" viewBox="0 0 360 210" role="img" aria-labelledby="diag-fio-t diag-fio-d">
      <title id="diag-fio-t">Estrutura do fio</title>
      <desc id="diag-fio-d">Corte transversal com três camadas: cutícula externa, córtex no meio e medula no centro.</desc>
      <circle cx="100" cy="105" r="80" fill="var(--accent-bg)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="100" cy="105" r="54" fill="var(--surface-soft)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="100" cy="105" r="22" fill="var(--social-bg)" stroke="var(--border)" strokeWidth="2" />
      <line x1="170" y1="70" x2="190" y2="64" stroke="var(--border)" strokeWidth="2" />
      <line x1="150" y1="105" x2="190" y2="112" stroke="var(--border)" strokeWidth="2" />
      <line x1="116" y1="105" x2="190" y2="160" stroke="var(--border)" strokeWidth="2" />
      <text x="196" y="62" className="course-diagram-name">Cutícula</text>
      <text x="196" y="78" className="course-diagram-desc">brilho e proteção</text>
      <text x="196" y="110" className="course-diagram-name">Córtex</text>
      <text x="196" y="126" className="course-diagram-desc">resistência e cor</text>
      <text x="196" y="158" className="course-diagram-name">Medula</text>
      <text x="196" y="174" className="course-diagram-desc">centro do fio</text>
    </svg>
  );
}

function NailDiagram() {
  return (
    <svg className="course-diagram-svg" viewBox="0 0 360 210" role="img" aria-labelledby="diag-unha-t diag-unha-d">
      <title id="diag-unha-t">Anatomia da unha</title>
      <desc id="diag-unha-d">Vista de cima da unha: lâmina, lúnula (meia-lua), cutícula na base e leito sob a lâmina.</desc>
      <rect x="36" y="18" width="150" height="174" rx="40" fill="var(--social-bg)" stroke="var(--border)" />
      <rect x="58" y="42" width="106" height="134" rx="30" fill="var(--surface-soft)" stroke="var(--border)" />
      <path d="M58 72 q53 -34 106 0" fill="none" stroke="var(--border)" strokeWidth="3" />
      <path d="M82 72 q29 22 58 0" fill="var(--accent-bg)" stroke="var(--border)" />
      <line x1="164" y1="58" x2="190" y2="56" stroke="var(--border)" strokeWidth="2" />
      <text x="196" y="60" className="course-diagram-name">Cutícula</text>
      <text x="196" y="76" className="course-diagram-desc">protege a base</text>
      <line x1="150" y1="84" x2="190" y2="108" stroke="var(--border)" strokeWidth="2" />
      <text x="196" y="112" className="course-diagram-name">Lúnula</text>
      <text x="196" y="128" className="course-diagram-desc">meia-lua</text>
      <line x1="150" y1="150" x2="190" y2="160" stroke="var(--border)" strokeWidth="2" />
      <text x="196" y="164" className="course-diagram-name">Lâmina</text>
      <text x="196" y="180" className="course-diagram-desc">placa visível</text>
    </svg>
  );
}

export function CourseDiagram({ id }: { id: CourseDiagramId }) {
  const meta = META[id];
  if (!meta) return null;
  return (
    <figure className="course-diagram">
      {id === "pele" ? <SkinDiagram /> : id === "fio" ? <HairDiagram /> : <NailDiagram />}
      <figcaption className="course-diagram-caption">{meta.caption}</figcaption>
    </figure>
  );
}
