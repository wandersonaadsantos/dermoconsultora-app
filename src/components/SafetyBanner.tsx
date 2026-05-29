export type SafetyBannerProps = {
  kind?: "default" | "origin";
  text?: string;
  note?: string;
};

export function SafetyBanner(props: SafetyBannerProps) {
  const text =
    props.text ??
    (props.kind === "origin"
      ? "Produto coletado do site. Isso não garante estoque na loja física. Confirme disponibilidade e rótulo antes de orientar."
      : "Apoio para consulta de produtos. Confirme modo de uso no rótulo e, em sinais de alerta, chame o farmacêutico.");

  return (
    <div className="notice safety-banner">
      <p>{text}</p>
      {props.note ? <p className="safety-banner-note">{props.note}</p> : null}
    </div>
  );
}

