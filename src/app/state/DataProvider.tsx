import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LoadedDataV1 } from "../../data/loadData";
import { loadDataV1, loadDataV2 } from "../../data/loadData";

export type DataState =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "ready"; data: LoadedDataV1; error: null }
  | { status: "error"; data: null; error: Error };

const DataContext = createContext<DataState | null>(null);

export function DataProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<DataState>({ status: "idle", data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    (async () => {
      try {
        const data = await loadDataV2();
        if (cancelled) return;
        setState({ status: "ready", data, error: null });
        return;
      } catch (errV2) {
        try {
          const data = await loadDataV1();
          if (cancelled) return;
          setState({ status: "ready", data, error: null });
          return;
        } catch (errV1) {
          const msgV2 = errV2 instanceof Error ? errV2.message : String(errV2);
          const msgV1 = errV1 instanceof Error ? errV1.message : String(errV1);
          const err = new Error(`failed to load data v2 and v1: v2=${msgV2}; v1=${msgV1}`);
          if (cancelled) return;
          setState({ status: "error", data: null, error: err });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>;
}

export function useDataV1() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataV1 must be used within DataProvider");
  return ctx;
}
