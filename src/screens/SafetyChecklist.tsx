import { LabelChecklist } from "../components/LabelChecklist";

export function SafetyChecklist() {
  return (
    <div className="screen safety-screen screen-stack">
      <h1>Checklist de segurança</h1>
      <ul className="list">
        <li>Eu ajudo com orientação cosmética e consulta de produtos.</li>
        <li>Não faço diagnóstico nem prescrevo tratamento.</li>
        <li>Não prometo cura.</li>
        <li>Em sinais de alerta (ferida, alergia forte, ardência intensa, piora), chamar farmacêutico.</li>
        <li>Uso de medicamento dermatológico, gestação/lactação/criança: em caso de dúvida, chamar farmacêutico.</li>
        <li>Pedido de diagnóstico ou “tratamento”: orientar dermatologista.</li>
      </ul>

      <section>
        <LabelChecklist heading="Confira o rótulo em 1 minuto" />
      </section>
    </div>
  );
}
