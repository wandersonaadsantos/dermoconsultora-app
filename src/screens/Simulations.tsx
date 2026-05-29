import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { simulations } from "../simulations/simulations";

export function Simulations() {
  const nav = useNavigate();

  return (
    <div className="screen simulations-screen">
      <h1>Simulações de atendimento</h1>
      <div className="notice">Cenários práticos para treinar perguntas e respostas seguras.</div>

      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/attend")}>
          Voltar para atendimento
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/exercises")}>
          Exercícios
        </Button>
      </div>

      <div className="cards">
        {simulations.map((s) => (
          <div key={s.id} className="notice">
            <div className="card-title">{s.title}</div>
            <div className="card-subtitle">{s.summary}</div>
            <div className="toolbar toolbar-in-card">
              <Button type="button" variant="primary" onClick={() => nav(`/simulations/${s.id}`)}>
                Abrir simulação
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
