import { formatTagList } from "../presentation/formatters";

export const CURATED_NEEDS = [
  "Oleosidade",
  "Acne/espinhas",
  "Ressecamento",
  "Sensibilidade",
  "Manchas",
  "Antissinais",
  "Proteção solar",
  "Hidratação",
  "Limpeza facial",
  "Cabelo danificado",
  "Frizz",
  "Perfume/presente",
  "Maquiagem básica"
];

export type MoreNeedOption = {
  value: string;
  label: string;
};

export function buildMoreNeeds(allNeedTags: string[]): MoreNeedOption[] {
  const curated = new Set(CURATED_NEEDS.map((n) => n.trim().toLowerCase()));
  const seen = new Set<string>();
  const result: MoreNeedOption[] = [];

  for (const raw of allNeedTags) {
    const label = formatTagList(raw)[0] ?? String(raw);
    const key = label.trim().toLowerCase();
    if (!key) continue;
    if (curated.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ value: raw, label });
  }

  return result.sort((a, b) => a.label.localeCompare(b.label));
}
