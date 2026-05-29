import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { exercises } from "../exercises/exercises";

export function Exercises() {
  const nav = useNavigate();

  return (
    <div className="screen exercises-screen">
      <h1>Exercícios</h1>
      <div className="notice">Treinos curtos para praticar um atendimento seguro. O gabarito fica recolhido.</div>

      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/attend")}>
          Voltar para atendimento
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/study")}>
          Abrir trilha
        </Button>
      </div>

      <div className="cards">
        {exercises.map((ex) => (
          <div key={ex.id} className="notice">
            <div className="card-title">{ex.title}</div>
            <div className="card-subtitle">{ex.summary}</div>
            <div className="toolbar toolbar-in-card">
              <Button type="button" variant="primary" onClick={() => nav(`/exercises/${ex.id}`)}>
                Abrir exercício
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
