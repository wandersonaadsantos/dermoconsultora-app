const LABEL_CHECKLIST_ITEMS = [
  "O que é? (categoria do produto)",
  "Para quem é? (indicação / tipo de pele quando houver)",
  "Para que serve? (finalidade cosmética)",
  "Como usar? (modo de uso e frequência)",
  "Tem alerta? (advertências e restrições)",
  "Está íntegro e na validade? (lacre, lote, validade)",
  "Precisa do farmacêutico? (dúvida, restrição ou sinal de alerta)"
] as const;

export type LabelChecklistProps = {
  heading?: string;
};

export function LabelChecklist({ heading }: LabelChecklistProps) {
  return (
    <div className="label-checklist">
      {heading ? <div className="label-checklist-title">{heading}</div> : null}
      <ol className="label-checklist-list">
        {LABEL_CHECKLIST_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}
