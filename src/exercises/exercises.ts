import type { Exercise } from "./exerciseTypes";

export const exercises: Exercise[] = [
  {
    id: "sinal-de-alerta",
    title: "Identificar sinal de alerta",
    summary: "Treine quando interromper a indicação e chamar o farmacêutico.",
    prompt:
      "O cliente relata ardência intensa, inchaço e piora rápida após usar um produto. O que você faz no app e o que você orienta?",
    expectedAnswer:
      "Marcar sinal de alerta, não sugerir produto e orientar a chamar o farmacêutico. Evitar discutir diagnóstico; focar em segurança e encaminhamento."
  },
  {
    id: "frase-segura",
    title: "Escolher a frase segura",
    summary: "Treine uma resposta que não promete resultado e reforça o rótulo.",
    prompt:
      "Escreva uma frase curta para antes de sugerir opções cosméticas, sem prometer cura e sem prescrever.",
    expectedAnswer:
      "Posso te ajudar a comparar opções cosméticas. Confirmar no rótulo antes de orientar."
  },
  {
    id: "tipo-pele-vs-condicao",
    title: "Tipo de pele vs condição percebida",
    summary: "Treine perguntas que separam rotina, preferência e queixa.",
    prompt:
      "O cliente diz: “minha pele é oleosa e estou com espinhas”. Quais 3 perguntas você faz antes de sugerir opções?",
    expectedAnswer:
      "1) Onde aparece (rosto/corpo) e há dor, secreção ou piora rápida? 2) O que já usa hoje (limpeza, hidratação, protetor) e como reagiu? 3) Preferência e limite (uso simples, mais suave, orçamento)."
  },
  {
    id: "rotulo-o-que-olhar",
    title: "O que olhar no rótulo",
    summary: "Treine o checklist do rótulo para orientar com segurança.",
    prompt: "Liste 5 coisas do rótulo que você confere antes de orientar um cosmético.",
    expectedAnswer:
      "Modo de uso; advertências; restrições (ex.: gestação/idade/área); área de aplicação; validade e integridade da embalagem (além de lote quando necessário)."
  },
  {
    id: "orienta-ou-encaminha",
    title: "Decidir: orientar ou encaminhar",
    summary: "Treine a decisão sem extrapolar indicação clínica.",
    prompt:
      "O cliente está usando medicamento dermatológico e quer “algo para acelerar”. Você orienta produto agora ou encaminha?",
    expectedAnswer:
      "Encaminhar ao farmacêutico e evitar sugerir produto como complemento do tratamento. Se for apenas cosmético de rotina básica, confirmar no rótulo e não conflitar com o tratamento."
  },
  {
    id: "comparar-dois-produtos",
    title: "Comparar dois produtos",
    summary: "Treine a comparação com base em categoria, cautela e praticidade.",
    prompt:
      "Você tem duas opções cosméticas parecidas. Quais 4 critérios simples você usa para comparar sem inventar benefício?",
    expectedAnswer:
      "Etapa da rotina/categoria; cautela; complexidade de uso; necessidades relacionadas na base. Se faltar dado factual, confirmar no rótulo."
  },
  {
    id: "frase-perigosa",
    title: "Reconhecer frase perigosa",
    summary: "Treine o que evitar para não prometer resultado ou prescrever.",
    prompt:
      "Qual destas frases é perigosa e por quê? (A) “Esse vai curar sua acne.” (B) “Posso te ajudar a comparar opções cosméticas.”",
    expectedAnswer:
      "A é perigosa porque promete cura/resultado e parece prescrição. B é apropriada porque mantém o foco em comparação e segurança."
  }
];

