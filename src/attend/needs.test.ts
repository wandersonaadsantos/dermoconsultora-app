import { describe, expect, test } from "vitest";
import { buildHybridNeeds, parseNeedText } from "./needs";

describe("attend/needs", () => {
  test("parseia texto livre em itens únicos e normalizados", () => {
    expect(parseNeedText(" mancha,  acne \n oleosidade | acne ")).toEqual(["mancha", "acne", "oleosidade"]);
  });

  test("cria lista híbrida separando tags conhecidas de anotações", () => {
    const knownNeedTags = ["acne", "oleosidade", "sensibilidade"];

    const r = buildHybridNeeds({
      knownNeedTags,
      selectedNeedTags: ["acne"],
      customNeedText: "mancha, oleosidade"
    });

    expect(r.needTags).toEqual(["acne", "oleosidade"]);
    expect(r.customNeeds).toEqual(["mancha"]);
  });
});

