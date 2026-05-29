import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { CourseSection } from "../components/course/CourseSection";
import { simulations } from "../simulations/simulations";

export function SimulationDetail() {
  const nav = useNavigate();
  const { simulationId } = useParams();

  const s = useMemo(() => simulations.find((x) => x.id === String(simulationId ?? "")) ?? null, [simulationId]);

  if (!s) {
    return (
      <div className="screen">
        <h1>Simulação não encontrada</h1>
        <div className="toolbar">
          <Button type="button" variant="primary" onClick={() => nav("/simulations")}>
            Voltar para simulações
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen simulation-detail-screen screen-stack">
      <h1>{s.title}</h1>

      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/simulations")}>
          Voltar
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/attend")}>
          Abrir atendimento
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist de segurança
        </Button>
      </div>

      <div className="notice">{s.summary}</div>

      <CourseSection title="Contexto do cliente">
        <div className="prose">{s.context}</div>
      </CourseSection>

      <CourseSection title="Perguntas que você deve fazer">
        <ul>
          {s.questionsToAsk.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </CourseSection>

      <CourseSection title="Resposta segura">
        <div className="prose">{s.safeResponse}</div>
      </CourseSection>

      <CourseSection title="O que não falar">
        <ul>
          {s.whatNotToSay.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </CourseSection>

      <CourseSection title="Quando encaminhar">
        <div className="prose">{s.whenToRefer}</div>
      </CourseSection>

      <CourseSection title="Fechamento correto">
        <div className="prose">{s.closing}</div>
      </CourseSection>
    </div>
  );
}
