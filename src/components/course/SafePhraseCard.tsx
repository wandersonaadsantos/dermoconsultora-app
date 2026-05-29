export type SafePhraseCardProps = {
  phrase: string;
};

export function SafePhraseCard(props: SafePhraseCardProps) {
  return (
    <div className="notice">
      <div className="warning-title">Frase segura</div>
      <div>{props.phrase}</div>
    </div>
  );
}

