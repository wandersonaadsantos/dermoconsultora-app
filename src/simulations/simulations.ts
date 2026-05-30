import type { Simulation } from "./simulationTypes";

export const simulations: Simulation[] = [
  {
    id: "oleosa-orcamento-baixo",
    title: "Pele oleosa com orçamento baixo",
    summary: "Priorizar rotina básica e uso simples, sem prometer resultado.",
    context: "Cliente diz que tem pele oleosa e quer algo “barato que funcione” para o dia a dia.",
    questionsToAsk: [
      "É para rosto ou corpo? E há dor, secreção, ferida ou piora rápida?",
      "O que você usa hoje (limpeza, hidratação, protetor) e como a pele reagiu?",
      "Você prefere uso simples e textura leve?",
      "Qual é o limite de preço aproximado?"
    ],
    safeResponse:
      "Posso te ajudar a comparar opções cosméticas e montar uma rotina simples. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Esse é o melhor e vai resolver.”", "“Isso vai curar sua acne/oleosidade.”"],
    whenToRefer:
      "Encaminhar se houver sinal de alerta, irritação forte ou piora rápida. Se o cliente estiver em tratamento dermatológico, chamar o farmacêutico antes de sugerir.",
    closing:
      "Escolher poucas opções com uso simples, abrir ficha para comparar e reforçar: confirmar no rótulo e voltar se houver irritação."
  },
  {
    id: "seca-sensivel",
    title: "Pele seca e sensível",
    summary: "Reduzir risco, priorizar “mais suave” e reforçar rótulo.",
    context: "Cliente relata pele seca e sensível e diz que “tudo arde” quando passa.",
    questionsToAsk: [
      "Em qual área e há descamação intensa, ferida, inchaço ou ardência forte?",
      "Quais produtos já tentou e qual foi a reação?",
      "Você quer algo com uso simples e mais suave?",
      "Alguma alergia conhecida ou medicamento em uso?"
    ],
    safeResponse:
      "Vamos com cuidado e escolher opções mais suaves e de uso simples. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Isso é alergia e precisa de remédio.”", "“Pode usar qualquer coisa que hidrate.”"],
    whenToRefer: "Se houver ardência intensa, inchaço, ferida ou piora rápida, não sugerir produto e chamar o farmacêutico.",
    closing:
      "Se não houver alerta, mostrar poucas opções mais suaves e orientar a testar com cautela conforme rótulo."
  },
  {
    id: "protetor-com-cor",
    title: "Protetor solar com cor",
    summary: "Confirmar preferência e uso, sem prometer cobertura/resultado.",
    context: "Cliente quer “protetor com cor” para o rosto e tem pressa.",
    questionsToAsk: [
      "É para rosto e para uso diário?",
      "Prefere toque seco ou textura mais cremosa?",
      "Há sensibilidade, ardência forte ou reação recente?",
      "Você quer algo de uso simples?"
    ],
    safeResponse:
      "Posso te ajudar a comparar opções de protetor com cor para uso diário. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Essa cor vai ficar perfeita.”", "“Esse é o melhor para todo mundo.”"],
    whenToRefer: "Se houver sinal de alerta ou reação forte recente, chamar o farmacêutico.",
    closing: "Abrir poucas opções, comparar e reforçar aplicação e reaplicação conforme rótulo."
  },
  {
    id: "manchas",
    title: "Cliente quer produto para mancha",
    summary: "Evitar promessa e focar em rotina e segurança.",
    context: "Cliente pede “algo para tirar mancha do rosto” e pergunta quanto tempo leva.",
    questionsToAsk: [
      "Há sinal de alerta (ferida, dor importante, piora rápida)?",
      "A mancha apareceu quando e mudou rápido?",
      "Você usa protetor solar diariamente?",
      "Você prefere uso simples e mais suave?"
    ],
    safeResponse:
      "Posso te ajudar a comparar opções cosméticas e reforçar uma rotina segura. Não dá para prometer tempo de resultado. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Em duas semanas some.”", "“Isso é melasma, use X.”"],
    whenToRefer: "Encaminhar se houver mudança rápida, dor, ferida ou dúvida importante; chamar farmacêutico se o cliente estiver em tratamento.",
    closing: "Se sem alerta, sugerir poucas opções e reforçar protetor e rótulo."
  },
  {
    id: "gravida-acido",
    title: "Gestante pergunta sobre “ácido”",
    summary: "Não indicar ativo; reforçar rótulo e encaminhar.",
    context: "Cliente grávida pergunta se pode usar “ácido” para melhorar a pele.",
    questionsToAsk: [
      "Você está grávida ou amamentando?",
      "Qual produto/ativo você tinha em mente? Você tem o rótulo?",
      "Existe orientação médica prévia?",
      "Há sensibilidade ou reação recente?"
    ],
    safeResponse:
      "Por segurança, eu não oriento produto com ativo específico sem checar o rótulo e sem avaliar o seu caso. Vamos confirmar no rótulo antes de orientar e eu chamo o farmacêutico.",
    whatNotToSay: ["“Pode usar, é tranquilo.”", "“Esse ácido é seguro na gravidez.”"],
    whenToRefer: "Encaminhar sempre ao farmacêutico quando o tema for gestação/amamentação e o cliente pedir orientação de ativo.",
    closing: "Chamar farmacêutico, manter acolhimento e evitar qualquer promessa."
  },
  {
    id: "medicamento-dermatologico",
    title: "Cliente usa medicamento dermatológico",
    summary: "Evitar complemento sem checar; encaminhar.",
    context: "Cliente diz que está usando medicamento prescrito e quer “um cosmético para potencializar”.",
    questionsToAsk: [
      "Você está usando qual medicamento (nome e forma)?",
      "Teve irritação, ardência intensa ou piora rápida?",
      "O médico orientou algum cuidado de rotina (limpeza/hidratação/protetor)?"
    ],
    safeResponse:
      "Para não atrapalhar seu tratamento, eu não recomendo produto agora sem checar direitinho. Vou chamar o farmacêutico. Se for rotina básica, confirmamos no rótulo antes de orientar.",
    whatNotToSay: ["“Pode misturar sem problema.”", "“Isso vai acelerar o tratamento.”"],
    whenToRefer: "Encaminhar ao farmacêutico sempre que houver tratamento em andamento e intenção de “potencializar”.",
    closing: "Chamar farmacêutico e manter foco em segurança."
  },
  {
    id: "queda-intensa",
    title: "Queda intensa de cabelo",
    summary: "Checar alerta e encaminhar quando necessário.",
    context: "Cliente relata queda intensa e diz que está preocupado.",
    questionsToAsk: [
      "É queda recente e rápida? Há falhas, feridas, dor ou coceira intensa?",
      "Você usa algum medicamento ou teve mudança recente (pós-parto, estresse, dieta)?",
      "Você quer algo de cuidado cosmético ou está buscando tratamento?"
    ],
    safeResponse:
      "Posso ajudar com cuidado cosmético e comparação de opções, mas quando é queda intensa é importante chamar o farmacêutico para orientar com segurança. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Isso é hormonal.”", "“Esse vai parar a queda.”"],
    whenToRefer: "Encaminhar quando a queda é intensa, recente ou vem com falhas/feridas/dor importante.",
    closing: "Chamar farmacêutico; se sem alerta e foco for cosmético, comparar opções com cautela."
  },
  {
    id: "reclama-preco",
    title: "Cliente reclama do preço",
    summary: "Reduzir atrito, manter poucas opções e uso simples.",
    context: "Cliente vê o preço e diz: “Isso é caro demais, tem algo parecido mais em conta?”",
    questionsToAsk: [
      "Qual é a necessidade principal e a área?",
      "Você prefere uso simples e mais suave?",
      "Qual faixa de preço funciona para você?"
    ],
    safeResponse:
      "Vamos comparar opções com foco em rotina e uso simples dentro do seu orçamento. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Se não comprar esse, não resolve.”", "“Esse é caro porque é melhor.”"],
    whenToRefer: "Encaminhar apenas se aparecer sinal de alerta ou dúvida de segurança/restrição.",
    closing: "Mostrar poucas opções e explicar critérios simples de comparação."
  },
  {
    id: "melhor-produto",
    title: "Cliente quer “o melhor produto”",
    summary: "Reenquadrar para necessidade + preferência + segurança.",
    context: "Cliente pede: “Me dá o melhor produto para a minha pele”.",
    questionsToAsk: [
      "Qual é a necessidade principal e a área?",
      "Há sinal de alerta ou reação forte recente?",
      "Você prefere uso simples ou está acostumado com rotinas mais detalhadas?"
    ],
    safeResponse:
      "Não existe um “melhor para todo mundo”. Posso te ajudar a comparar poucas opções com base na sua necessidade e segurança. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Esse é o melhor do mercado.”", "“Esse serve para qualquer pele.”"],
    whenToRefer: "Encaminhar se houver sinal de alerta, gestação ou tratamento medicamentoso em andamento.",
    closing: "Fechar com 2–4 opções e combinar próximo passo (abrir ficha, comparar, confirmar rótulo)."
  },
  {
    id: "cliente-com-pressa",
    title: "Cliente está com pressa",
    summary: "Baixa carga cognitiva: poucas perguntas e poucas opções.",
    context: "Cliente diz que está com pressa e quer decidir rápido.",
    questionsToAsk: [
      "Qual é a necessidade principal e a área?",
      "Você quer uso simples?",
      "Tem algum sinal de alerta (ardência intensa, ferida, inchaço)?"
    ],
    safeResponse:
      "Vamos direto ao essencial: necessidade, área e segurança. Aí eu te mostro poucas opções para comparar. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Leva tempo para escolher direito.”", "“Compra esse aqui e pronto.”"],
    whenToRefer: "Se houver sinal de alerta, interromper e chamar o farmacêutico.",
    closing: "Mostrar poucas opções, abrir ficha e indicar comparação rápida."
  },
  {
    id: "cliente-hostil",
    title: "Cliente irritada e exigente",
    summary: "Acolher, manter o limite e não prometer sob pressão.",
    context: "Cliente chega reclamando: “Vocês só vendem coisa que não funciona. Quero algo que resolva agora.”",
    questionsToAsk: [
      "Quero te ajudar a achar uma opção melhor — qual é a necessidade principal e a área?",
      "O que você já usou e como a sua pele reagiu?",
      "Tem ardência forte, ferida, inchaço ou piora rápida?"
    ],
    safeResponse:
      "Entendo a sua frustração e quero te ajudar a escolher com calma. Não vou prometer resultado, mas posso comparar poucas opções pela sua necessidade. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Esse aqui resolve, pode confiar.”", "“Da última vez você deve ter usado errado.”"],
    whenToRefer:
      "Se houver sinal de alerta (ardência forte, ferida, inchaço, piora rápida) ou pedido de tratamento/medicamento, chamar o farmacêutico.",
    closing:
      "Manter o tom calmo, oferecer 2 opções com critério claro e reforçar rótulo e retorno se houver reação."
  },
  {
    id: "internet-tiktok",
    title: "Cliente viu na internet / TikTok",
    summary: "Validar sem confrontar e trazer para rótulo e segurança.",
    context: "Cliente diz: “Vi no TikTok que esse ativo pode usar todo dia e resolve tudo.”",
    questionsToAsk: [
      "Qual ativo/produto você viu? Você tem o rótulo aqui?",
      "Sua pele é sensível ou já teve reação?",
      "Você usa algum medicamento na pele ou está em tratamento?"
    ],
    safeResponse:
      "Esse ativo aparece bastante mesmo. Antes de escolher, vamos ver a proposta, o modo de uso e se faz sentido para a sua pele. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Resolve mesmo, pode usar todo dia.”", "“Tudo que viraliza funciona.”"],
    whenToRefer:
      "Se houver sensibilidade importante, uso de medicamento, gestação/lactação ou sinal de alerta, chamar o farmacêutico.",
    closing: "Acolher a referência, comparar com cautela e reforçar introdução lenta e rótulo."
  },
  {
    id: "cliente-insistente",
    title: "Cliente insiste e questiona o encaminhamento",
    summary: "Manter o limite com firmeza e sem parecer insegura.",
    context:
      "Você sugere chamar o farmacêutico e a cliente reage: “Ah, mas você não sabe me dizer? Só me indica logo um.”",
    questionsToAsk: [
      "Para te orientar com segurança, posso confirmar: tem ardência forte, ferida, inchaço ou piora rápida?",
      "Você usa algum medicamento na pele ou está grávida/amamentando?",
      "Você quer cuidado cosmético simples ou está buscando tratamento?"
    ],
    safeResponse:
      "Eu sei te orientar no cosmético e, justamente por isso, nesse caso o mais seguro é o farmacêutico avaliar com você. Não é insegurança; é cuidado. Confirmar no rótulo antes de orientar.",
    whatNotToSay: ["“Tá bom, leva esse aqui então.”", "“Não sei, mas acho que esse serve.”"],
    whenToRefer:
      "Sempre que o pedido envolver sinal de alerta, medicamento, gestação/lactação, criança ou pedido de tratamento — não ceder à insistência.",
    closing:
      "Manter o encaminhamento com firmeza calma e oferecer ajuda cosmética segura no que for possível."
  }
];

