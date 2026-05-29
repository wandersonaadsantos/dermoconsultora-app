import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ProductRow } from "../../data/types";
import { getProductIdentity } from "../../data/productIdentity";
import { getStoredJson, setStoredJson } from "./persistence";

export type FavoritesState = {
  favorites: string[];
  toggle: (product: ProductRow) => void;
  clear: () => void;
  has: (product: ProductRow) => boolean;
};

const FavoritesContext = createContext<FavoritesState | null>(null);

export function FavoritesProvider(props: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => getStoredJson<string[]>("favorites", []));

  useEffect(() => {
    setStoredJson("favorites", favorites);
  }, [favorites]);

  const value = useMemo<FavoritesState>(() => {
    const has = (product: ProductRow) => {
      const id = getProductIdentity(product);
      return id.length > 0 && favorites.includes(id);
    };

    const toggle = (product: ProductRow) => {
      const id = getProductIdentity(product);
      if (!id) return;
      setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const clear = () => setFavorites([]);
    return { favorites, toggle, clear, has };
  }, [favorites]);

  return <FavoritesContext.Provider value={value}>{props.children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

