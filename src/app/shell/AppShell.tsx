import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useCompare } from "../state/CompareProvider";
import { getPreferredTheme, setPreferredMode, setPreferredTheme, type PreferredTheme } from "../state/preferences";

export function AppShell() {
  const nav = useNavigate();
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  const compare = useCompare();
  const [theme, setTheme] = useState<PreferredTheme>(() => getPreferredTheme());

  useEffect(() => {
    if (loc.pathname.startsWith("/study")) setPreferredMode("study");
    if (loc.pathname.startsWith("/consult") || loc.pathname.startsWith("/product") || loc.pathname.startsWith("/compare")) {
      setPreferredMode("consult");
    }
  }, [loc.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setPreferredTheme(theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          {!isHome ? (
            <Button type="button" variant="secondary" onClick={() => nav(-1)}>
              Voltar
            </Button>
          ) : (
            <div className="topbar-spacer" />
          )}
        </div>
        <div className="topbar-title">Dermoconsultora</div>
        <nav className="topbar-right" aria-label="Navegação">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Modo escuro" : "Modo claro"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => nav("/compare")}>
            Comparar ({compare.selected.length})
          </Button>
          <Button type="button" variant="secondary" onClick={() => nav("/")}>
            Início
          </Button>
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
