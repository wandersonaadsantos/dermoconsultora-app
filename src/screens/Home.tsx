import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SafetyBanner } from "../components/SafetyBanner";
import { useDataV1 } from "../app/state/DataProvider";
import { getPreferredMode, setPreferredMode } from "../app/state/preferences";

export function Home() {
  const nav = useNavigate();
  const data = useDataV1();
  const preferred = useMemo(() => getPreferredMode(), []);
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;

  const goStudy = () => {
    setPreferredMode("study");
    nav("/study");
  };

  const goConsult = () => {
    setPreferredMode("consult");
    nav("/consult");
  };

  const goAttend = () => {
    setPreferredMode("consult");
    nav("/attend");
  };

  return (
    <div className="screen">
      <h1>Apoio para estudo e atendimento</h1>

      <SafetyBanner />
      <div className="notice home-intro">
        Use este app para estudar produtos, consultar uma ficha simples e decidir quando chamar o farmacêutico. Ele não
        substitui o rótulo nem uma avaliação clínica.
      </div>

      <div className="grid">
        {preferred === "study" ? (
          <>
            <Button type="button" variant="primary" onClick={goStudy}>
              Continuar formação
            </Button>
            <Button type="button" variant="secondary" onClick={goAttend}>
              Atender cliente com apoio
            </Button>
          </>
        ) : (
          <>
            <Button type="button" variant="primary" onClick={goAttend}>
              Atender cliente com apoio
            </Button>
            <Button type="button" variant="secondary" onClick={goStudy}>
              Começar formação
            </Button>
          </>
        )}
        <Button type="button" variant="secondary" onClick={goConsult}>
          Consultar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/compare")}>
          Comparar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist rápido
        </Button>
      </div>

      <div className="info">
        <h2>Base de produtos</h2>
        {data.status === "ready" ? (
          <div className="info-grid">
            <div>
              <div className="info-k">Versão</div>
              <div className="info-v">{data.data.manifest.version}</div>
            </div>
            <div>
              <div className="info-k">Status</div>
              <div className="info-v">{data.data.manifest.can_start_app ? "Pronta para consulta" : "Indisponível"}</div>
            </div>
            <div>
              <div className="info-k">Produtos</div>
              <div className="info-v">{data.data.manifest.total_products}</div>
            </div>
          </div>
        ) : data.status === "error" ? (
          <div className="error">
            {offline
              ? "Sem conexão e ainda não há cache local. Conecte-se uma vez para abrir o app e baixar a base."
              : "Falha ao carregar a base v1. Confirme se os assets estão disponíveis em public/data/v1/ e recarregue."}
          </div>
        ) : (
          <div>Carregando…</div>
        )}
      </div>
    </div>
  );
}
