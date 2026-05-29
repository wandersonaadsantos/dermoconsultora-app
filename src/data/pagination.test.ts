import { expect, test } from "vitest";
import { paginateByOffset } from "./pagination";

test("pagina por offset/limit e retorna nextOffset", () => {
  const rows = [1, 2, 3, 4, 5];
  const r1 = paginateByOffset(rows, { offset: 0, limit: 2 });
  expect(r1.items).toEqual([1, 2]);
  expect(r1.nextOffset).toBe(2);

  const r2 = paginateByOffset(rows, { offset: r1.nextOffset ?? 0, limit: 2 });
  expect(r2.items).toEqual([3, 4]);
  expect(r2.nextOffset).toBe(4);

  const r3 = paginateByOffset(rows, { offset: r2.nextOffset ?? 0, limit: 2 });
  expect(r3.items).toEqual([5]);
  expect(r3.nextOffset).toBeNull();
});

