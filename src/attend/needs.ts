export function parseNeedText(text: string) {
  const items = String(text ?? "")
    .split(/[,\n|/]+/g)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    unique.push(item);
  }
  return unique;
}

export type HybridNeedsInput = {
  knownNeedTags: string[];
  selectedNeedTags: string[];
  customNeedText: string;
};

export type HybridNeeds = {
  needTags: string[];
  customNeeds: string[];
};

export function buildHybridNeeds(input: HybridNeedsInput): HybridNeeds {
  const known = new Set(input.knownNeedTags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0));
  const selected = input.selectedNeedTags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0);
  const custom = parseNeedText(input.customNeedText);

  const needTags: string[] = [];
  const customNeeds: string[] = [];

  const seenNeeds = new Set<string>();
  for (const t of selected) {
    if (!known.has(t) || seenNeeds.has(t)) continue;
    seenNeeds.add(t);
    needTags.push(t);
  }

  for (const t of custom) {
    if (known.has(t)) {
      if (seenNeeds.has(t)) continue;
      seenNeeds.add(t);
      needTags.push(t);
      continue;
    }
    if (customNeeds.includes(t)) continue;
    customNeeds.push(t);
  }

  return { needTags, customNeeds };
}

