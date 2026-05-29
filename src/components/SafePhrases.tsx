import { courseTalkTracks } from "../course/courseTalkTracks";

// Seleção curada de objeções comuns de balcão, reaproveitando os talk tracks
// do curso (sem duplicar conteúdo). Ordem pensada para uso rápido.
const QUICK_REFS: ReadonlyArray<{ module: string; id: string }> = [
  { module: "treino-de-fala-objecoes", id: "pressa-1" },
  { module: "treino-de-fala-objecoes", id: "preco-1" },
  { module: "treino-de-fala-objecoes", id: "melhor-1" },
  { module: "ativos-renovacao-anti-idade", id: "retinol-pressa-1" },
  { module: "leitura-rotulo", id: "restricao-1" },
  { module: "leitura-rotulo", id: "como-usa-1" }
];

export type SafePhrasesProps = {
  heading?: string;
};

export function SafePhrases({ heading }: SafePhrasesProps) {
  const items = QUICK_REFS.map(({ module, id }) => courseTalkTracks[module]?.find((t) => t.id === id)).filter(
    (t): t is NonNullable<typeof t> => t != null
  );

  return (
    <div className="safe-phrases">
      {heading ? <div className="safe-phrases-title">{heading}</div> : null}
      <div className="safe-phrases-list">
        {items.map((t) => (
          <div key={t.id} className="safe-phrase-item">
            <div className="safe-phrase-customer">{t.customer}</div>
            <div className="safe-phrase-you">{t.you}</div>
            <div className="safe-phrase-check">Pergunte: {t.checkQuestion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
