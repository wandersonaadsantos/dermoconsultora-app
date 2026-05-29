import { expect, test } from "vitest";
import { formatDrogasilProductCode } from "./formatters";

test("formatDrogasilProductCode_formata_apenas_digitos", () => {
  expect(formatDrogasilProductCode("1318168")).toBe("1318168");
  expect(formatDrogasilProductCode("Código: 1318168")).toBe("1318168");
});

test("formatDrogasilProductCode_quando_ausente_mostra_fallback", () => {
  expect(formatDrogasilProductCode("")).toBe("Não encontrado na base");
});

