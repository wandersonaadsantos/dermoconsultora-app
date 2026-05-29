import { describe, expect, test, vi } from "vitest";
import { loadDataV1 } from "./loadData";

describe("loadDataV1", () => {
  test("carrega manifesto, produtos e images manifest (v1) e valida total", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("data_freeze_manifest.json")) {
        return new Response(JSON.stringify({ version: "v1", total_products: 1, can_start_app: true }));
      }
      if (url.includes("base_drogasil_dermoconsulta_enriquecida.json")) {
        return new Response(JSON.stringify([{ URL_produto: "u", Produto: "p", Marca: "m" }]));
      }
      if (url.includes("images_manifest.json")) {
        return new Response(JSON.stringify([{ url_produto: "u", thumbnail_path: "x.webp", medium_path: "y.webp", status: "downloaded" }]));
      }
      throw new Error("unexpected url " + url);
    });

    const r = await loadDataV1({ fetchImpl: fetchMock as any, baseUrl: "/base/" });
    expect(r.manifest.version).toBe("v1");
    expect(r.products.length).toBe(1);
    expect(r.imageIndex.get("u")?.thumbName).toBe("x.webp");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test("falha quando total_products diverge", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("data_freeze_manifest.json")) {
        return new Response(JSON.stringify({ version: "v1", total_products: 2, can_start_app: true }));
      }
      if (url.includes("base_drogasil_dermoconsulta_enriquecida.json")) {
        return new Response(JSON.stringify([{ URL_produto: "u", Produto: "p", Marca: "m" }]));
      }
      if (url.includes("images_manifest.json")) {
        return new Response(JSON.stringify([]));
      }
      throw new Error("unexpected url " + url);
    });

    await expect(loadDataV1({ fetchImpl: fetchMock as any, baseUrl: "/" })).rejects.toThrow(
      /product count mismatch/i
    );
  });
});

