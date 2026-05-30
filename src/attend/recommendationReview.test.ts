import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import type { ProductRow } from "../data/types";
import type { AttendArea } from "./attendTypes";
import { buildAttendResult } from "./attendFlow";
import { CURATED_NEEDS } from "./needOptions";

// Revisão guiada por dados: roda o motor real sobre a base real e garante que
// nenhuma recomendação seja contextualmente inadequada (gap lógico).
const products: ProductRow[] = JSON.parse(
  readFileSync("public/data/v2/base_drogasil_dermoconsulta_enriquecida.json", "utf8")
);

const AREAS: AttendArea[] = ["Rosto", "Corpo", "Cabelo", "Perfumaria", "Maquiagem"];

// Nunca recomendável (qualquer área): kits/combos, infantis, bundles com repelente.
const OFF_CONTEXT = /\bkit\b|\bcombo\b|compre e ganhe|\bkids?\b|infantil|\bbeb[eê]s?\b|repelente/i;
// Em consulta de rosto, região não-facial explícita (sem citar rosto/facial).
const NON_FACE_REGION = /\b(m[aã]os|p[eé]s|corpo|corporal|capilar|cabelos?|pernas?)\b/i;
const FACE_TERMS = /\b(facial|rosto|face)\b/i;

function recommend(need: string, area: AttendArea): string[] {
  const r = buildAttendResult(products, {
    need,
    needKind: "query",
    area,
    preference: "sem-preferencia",
    hasAlert: false
  });
  if (r.mode !== "recommendations") return [];
  return (r.items as ProductRow[]).map((p) => String(p.Produto ?? ""));
}

describe("revisão de recomendações (base real)", () => {
  test("nenhuma recomendação é kit/infantil/repelente, em qualquer necessidade e área", () => {
    const offenders: string[] = [];
    for (const need of CURATED_NEEDS) {
      for (const area of AREAS) {
        for (const name of recommend(need, area)) {
          if (OFF_CONTEXT.test(name)) offenders.push(`${need} / ${area}: ${name}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  test("consulta de rosto não recomenda produto de região não-facial", () => {
    const offenders: string[] = [];
    for (const need of CURATED_NEEDS) {
      for (const name of recommend(need, "Rosto")) {
        if (NON_FACE_REGION.test(name) && !FACE_TERMS.test(name)) {
          offenders.push(`${need}: ${name}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  test("Perfume/presente não recomenda skincare 'sem perfume'/limpeza", () => {
    const notPerfume = /sem perfume|gel de limpeza|limpeza facial|sabonete|s[ée]rum|lo[çc][ãa]o de limpeza|espuma.*limpeza|hidratante/i;
    const offenders = recommend("Perfume/presente", "Perfumaria").filter((n) => notPerfume.test(n));
    expect(offenders).toEqual([]);
  });

  test("Maquiagem básica não recomenda removedor de maquiagem", () => {
    const remover = /demaquilante|[áa]gua micelar|remove.*maquiagem/i;
    const offenders = recommend("Maquiagem básica", "Maquiagem").filter((n) => remover.test(n));
    expect(offenders).toEqual([]);
  });
});
