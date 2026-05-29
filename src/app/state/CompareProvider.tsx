import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ProductRow } from "../../data/types";
import { getProductIdentity } from "../../data/productIdentity";
import { getStoredJson, setStoredJson } from "./persistence";

export type CompareState = {
  selected: string[];
  toggle: (product: ProductRow) => void;
  clear: () => void;
  has: (product: ProductRow) => boolean;
};

const CompareContext = createContext<CompareState | null>(null);

export function CompareProvider(props: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>(() => getStoredJson<string[]>("compare", []));

  useEffect(() => {
    setStoredJson("compare", selected);
  }, [selected]);

  const value = useMemo<CompareState>(() => {
    const has = (product: ProductRow) => {
      const id = getProductIdentity(product);
      return id.length > 0 && selected.includes(id);
    };

    const toggle = (product: ProductRow) => {
      const id = getProductIdentity(product);
      if (!id) return;
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 4)));
    };

    const clear = () => setSelected([]);
    return { selected, toggle, clear, has };
  }, [selected]);

  return <CompareContext.Provider value={value}>{props.children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
