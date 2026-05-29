export type CourseTalkTrack = {
  id: string;
  customer: string;
  you: string;
  checkQuestion: string;
};

export const courseTalkTracks: Record<string, CourseTalkTrack[]> = {
  "treino-de-fala-objecoes": [
    {
      id: "preco-1",
      customer: "“Tá muito caro. Tem um mais em conta?”",
      you: "“Tem sim. Eu te mostro duas opções dentro do seu orçamento e a gente escolhe pela textura e pelo rótulo. Pode ser?”",
      checkQuestion: "“É para rosto ou corpo? E você já teve reação com algum produto parecido?”"
    },
    {
      id: "pressa-1",
      customer: "“Tô com pressa. Me dá qualquer um.”",
      you: "“Vamos direto ao essencial para não correr risco: é para rosto ou corpo e você já teve alguma reação? Aí eu te mostro uma ou duas opções rápidas.”",
      checkQuestion: "“Tem ferida, dor, coceira intensa, inchaço ou piora rápida?”"
    },
    {
      id: "melhor-1",
      customer: "“Quero o melhor que tiver.”",
      you: "“Não existe um melhor para todo mundo. Eu te ajudo a comparar duas opções e você escolhe pela sensação e pelo rótulo.”",
      checkQuestion: "“Você prefere textura mais leve ou mais hidratante? E é com cor ou sem cor?”"
    }
  ],
  "protecao-solar": [
    {
      id: "textura-1",
      customer: "“Protetor sempre fica pesado e eu paro de usar.”",
      you: "“Vamos escolher uma textura que você consegue usar todo dia. Eu te mostro duas opções e a gente compara pelo rótulo e pela sensação.”",
      checkQuestion: "“É para rosto ou corpo? E você sente ardor com protetor?”"
    },
    {
      id: "com-cor-1",
      customer: "“Quero com cor, mas tenho medo de ficar estranho.”",
      you: "“Eu te mostro duas opções com cor e a gente escolhe pela adaptação e pela textura. Antes de orientar, a gente confirma no rótulo como usar.”",
      checkQuestion: "“Você usa maquiagem? Prefere mais leve ou mais cobertura?”"
    }
  ],
  "leitura-rotulo": [
    {
      id: "restricao-1",
      customer: "“Posso usar isso grávida?”",
      you: "“Eu não vou orientar restrição sem confirmar. Vamos checar o rótulo e, se ficar qualquer dúvida, eu chamo o farmacêutico.”",
      checkQuestion: "“Você está em gestação ou amamentação? Tem algum médico te orientando algo específico?”"
    },
    {
      id: "como-usa-1",
      customer: "“Como eu uso? É todo dia?”",
      you: "“A forma mais segura é seguir o rótulo. Vamos olhar juntas o modo de uso e as advertências antes de eu te orientar.”",
      checkQuestion: "“Você já teve reação com algum produto parecido?”"
    }
  ],
  "skincare-basico": [
    {
      id: "muitos-produtos-1",
      customer: "“Quero comprar tudo para começar skincare.”",
      you: "“Vamos começar simples para você conseguir manter: limpeza, hidratação e protetor. Depois a gente ajusta com calma.”",
      checkQuestion: "“Você tem sensibilidade ou já teve reação com algum produto?”"
    },
    {
      id: "oleosa-sem-hidratar-1",
      customer: "“Minha pele é oleosa, então hidratante piora.”",
      you: "“Dá para hidratar com textura leve. Eu te mostro duas opções e você escolhe pela sensação.”",
      checkQuestion: "“Sua pele repuxa ou arde depois de lavar o rosto?”"
    }
  ],
  "tipos-condicoes-pele": [
    {
      id: "arde-1",
      customer: "“Arde com qualquer coisa. O que eu passo?”",
      you: "“Eu consigo te ajudar com cuidado cosmético mais suave, mas como está ardendo, eu prefiro chamar o farmacêutico se estiver forte. Vamos com calma.”",
      checkQuestion: "“Tem ferida, inchaço, coceira intensa ou piora rápida?”"
    }
  ],
  "ativos-renovacao-anti-idade": [
    {
      id: "retinol-pressa-1",
      customer: "“Me dá um retinol forte que eu quero resultado rápido.”",
      you: "“Eu não vou te orientar algo forte sem cautela. Pode irritar. Se você usa medicamento ou tem sensibilidade, eu chamo o farmacêutico e a gente confere o rótulo.”",
      checkQuestion: "“Você já teve reação com ácidos ou usa algum medicamento na pele?”"
    }
  ]
};
