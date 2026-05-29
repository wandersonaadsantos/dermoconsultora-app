import { describe, expect, test } from "vitest";
import { getStoredJson, removeStored, setStoredJson } from "./persistence";

describe("persistence", () => {
  test("salva e carrega JSON", () => {
    setStoredJson("x", { a: 1 });
    expect(getStoredJson("x", null)).toEqual({ a: 1 });
    removeStored("x");
    expect(getStoredJson("x", null)).toBeNull();
  });

  test("retorna default quando o JSON é inválido", () => {
    localStorage.setItem("dc:v1:bad", "{");
    expect(getStoredJson("bad", { ok: true })).toEqual({ ok: true });
  });
});

