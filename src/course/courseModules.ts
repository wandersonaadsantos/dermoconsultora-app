import type { CourseModule } from "./courseTypes";

export const courseModules: CourseModule[] = [
  {
    id: "papel-dermoconsultora",
    title: "Papel da dermoconsultora",
    summary: "Apoiar o cliente com orientação cosmética segura, sem diagnosticar e sem prometer resultado clínico.",
    objective:
      "Saber o que você pode orientar com segurança no balcão, como conduzir a conversa e quando envolver o farmacêutico.",
    content:
      "Você é ponte entre o cliente e a escolha do cosmético. Seu foco é ajudar a pessoa a encontrar uma opção adequada ao objetivo dela, dentro do que está escrito no rótulo.\n\nSeu limite é claro: você não diagnostica doenças de pele, não prescreve tratamento e não promete cura. Quando a conversa entra em sintoma importante, dor, ferida, infecção, alergia forte ou uso de medicamento, você chama o farmacêutico.\n\nO que muda o atendimento: perguntas simples, explicação curta e checagem de rótulo. O cliente sai seguro porque você foi objetiva e transparente.",
    practicalExample:
      "Cliente: “Minha pele está ardendo e descascando, o que eu passo?”\nVocê: “Eu consigo te ajudar a escolher um hidratante suave, mas ardor e descamação forte podem precisar de avaliação. Vamos chamar o farmacêutico antes de eu te orientar, tudo bem?”",
    safePhrase: "Oriento cosmético. Não diagnostico, não prescrevo e não prometo cura. Se houver sinal de alerta, chamo o farmacêutico.",
    avoid:
      "Evite: “Isso é dermatite/rosácea/acne”, “Pode usar que resolve”, “Esse é o melhor para você”, “É igual remédio”.",
    exercise: {
      prompt:
        "Uma cliente pede “um creme para curar minha alergia”. Como você responde de forma segura e útil, sem fechar diagnóstico?",
      expectedAnswer:
        "Explico o limite (“não oriento cura/diagnóstico”), faço uma pergunta rápida sobre gravidade e proponho um caminho seguro: chamar o farmacêutico e, se for apenas ressecamento leve, orientar um hidratante suave com confirmação no rótulo.",
    },
  },
  {
    id: "atendimento-consultivo",
    title: "Atendimento consultivo",
    summary: "Conduzir a conversa com poucas perguntas certas, reduzindo risco e aumentando clareza.",
    objective:
      "Aprender um roteiro curto para entender a necessidade, checar segurança e sugerir opções sem virar “consulta médica”.",
    content:
      "Atendimento consultivo é fazer o básico bem feito: entender o objetivo, confirmar restrições e orientar com clareza. Use perguntas que cabem no balcão.\n\nRoteiro sugerido:\n1) O que você quer melhorar hoje?\n2) É rosto, corpo ou cabelo?\n3) Você já usa algo? Teve reação?\n4) Tem ferida, dor, coceira intensa, inchaço, secreção, sangramento ou piora rápida?\n5) Preferência de textura/cheiro/preço?\n\nSe existir sinal de alerta, pare e envolva o farmacêutico. Se não existir, mostre poucas opções e peça para confirmar rótulo (modo de uso, advertências e faixa etária) antes de orientar.",
    practicalExample:
      "Cliente: “Quero um produto para mancha.”\nVocê: “Você quer clarear o tom geral ou é uma mancha que apareceu de repente? Teve irritação ou ferida? Se tiver algo diferente, eu chamo o farmacêutico. Se for cuidado cosmético, eu te mostro algumas opções e a gente confere o rótulo juntas.”",
    safePhrase:
      "Posso te orientar cosmético e te ajudar a comparar opções. Se tiver sinal de alerta ou dúvida, eu chamo o farmacêutico.",
    avoid:
      "Evite: “Isso é melasma”, “Esse ativo é obrigatório”, “Use X dias que some”, “Pode misturar tudo sem problema”.",
    exercise: {
      prompt: "Liste 3 perguntas de balcão que ajudam a escolher um cosmético com mais segurança.",
      expectedAnswer:
        "Exemplos: “Qual o objetivo hoje?”, “Já usou algo parecido e teve reação?”, “É para rosto/corpo/cabelo?”, “Tem ferida/dor/coceira forte?”, “Tem preferência de textura ou faixa de preço?”.",
    },
  },
  {
    id: "estrutura-da-pele",
    title: "Estrutura da pele",
    summary: "Como a pele é organizada (epiderme, derme, hipoderme) e por que isso muda a forma de orientar cosmético.",
    objective:
      "Você vai aprender:\n- As três camadas da pele e o que cada uma faz, em linguagem simples\n- Por que cosmético cuida de aparência e conforto, sem 'reconstruir' a pele\n- Como traduzir queixas (\"grossa\", \"sem viço\", \"firmar\") em necessidade cosmética segura\n\nEm uma frase:\nA pele é uma barreira viva; cosmético cuida da aparência e do conforto, não trata doença.",
    content:
      "Na prática do balcão\nA cliente descreve sensação e aparência, não anatomia. Você não precisa decorar nomes. Precisa entender que a pele tem camadas e que o cosmético atua principalmente na superfície e na aparência.\n\nAs três camadas (linguagem simples)\n- Epiderme: a camada mais externa, é a barreira. A parte mais superficial (estrato córneo) ajuda a segurar água e dificultar a entrada de irritantes.\n- Derme: dá sustentação; tem colágeno, elastina, vasos, nervos, glândulas e folículos. Por isso 'reconstruir colágeno' ou 'curar flacidez' são promessas que você não faz.\n- Hipoderme: a camada mais profunda, com gordura e função de suporte. Cosmético de balcão não modifica isso.\n\nPerguntas úteis\n- Sua pele está ardendo, coçando ou descamando?\n- Isso começou depois de algum produto?\n- Você usa ácido, medicamento dermatológico ou algo indicado por médico?\n- Quer algo para uso diário ou para uma queixa pontual?\n\nComo explicar para a cliente\n- \"Esse produto tem proposta cosmética para melhorar aparência e conforto. O resultado varia e o rótulo orienta o uso.\"\n- \"Não fecho diagnóstico; posso te ajudar com orientação cosmética segura.\"\n\nQuando chamar farmacêutico\n- Ferida, dor, secreção, inchaço, vermelhidão ou ardência fortes\n- Piora rápida ou reação após produto\n- Uso de medicamento dermatológico com dúvida",
    practicalExample:
      "Cliente: “Minha pele está descamando, mas também é oleosa. Quero um ácido forte.”\nVocê: “Como você falou em descamação, eu não começaria pelo mais forte. Primeiro: está ardendo? Começou depois de algum produto? Você usa algo indicado por médico? Vamos confirmar o rótulo e, se arder forte ou piorar, eu chamo o farmacêutico.”",
    safePhrase:
      "Cosmético cuida da aparência e do conforto da pele. Não diagnostico, não trato doença e confirmo o uso no rótulo.",
    avoid:
      "Evite:\n- “Isso reconstrói/recupera sua pele”\n- “Isso trata sua pele” ou “resolve rugas/manchas/acne”\n- “Pode usar sem medo”\n- “Esse é o mais forte”",
    exercise: {
      prompt:
        "Uma cliente diz que a pele está “grossa e sem viço” e pede “algo que renove”. Como traduzir isso em necessidade cosmética segura, sem prometer tratamento?",
      expectedAnswer:
        "Traduzir para necessidades cosméticas (textura irregular, aparência cansada, ressecamento, rotina básica com hidratação e fotoproteção), oferecer proposta cosmética sem prometer “renovar” ou tratar, confirmar no rótulo e chamar o farmacêutico se houver ardência forte, ferida ou piora.",
    },
  },
  {
    id: "tipos-condicoes-pele",
    title: "Tipos e condições da pele",
    summary: "Diferenciar tipo de pele (tendência) de condição do momento, sem “dar diagnóstico”.",
    objective:
      "Você vai aprender:\n- Diferença entre tipo de pele e condição do momento, sem rotular doença\n- Sinais simples para observar e perguntas rápidas de balcão\n- Como orientar o básico (limpar, hidratar, proteger) com linguagem segura\n\nEm uma frase:\nTipo é tendência. Condição é o que a pele está sentindo agora.",
    content:
      "Na prática do balcão\nO cliente descreve sensação e aparência: “repuxa”, “brilha”, “arde”, “descama”, “vive com espinhas”, “manchas me incomodam”. Você não precisa dar nome clínico. Você precisa entender a experiência da pessoa, reduzir risco e propor um cuidado cosmético simples.\n\nvermelhidão e ardência fortes (principalmente com piora rápida) são alerta: não é hora de “testar produto”.\n\nSinais por tipo (resumo)\n- Oleosa: brilho ao longo do dia, poros mais visíveis, tendência a cravos/espinhas.\n- Seca: repuxa, descama, aspecto opaco, aspereza.\n- Mista: zona T oleosa e bochechas normais ou secas.\n- Sensível/sensibilizada: arde, vermelhidão, coceira; pode ser perfil ou reação — não diagnostique, pergunte e observe.\nLembre: tipo é tendência; condição é o momento. A mesma pessoa pode ter pele oleosa e estar sensibilizada, ou pele seca e com espinhas.\n\nPerguntas úteis\n- É para rosto, corpo ou couro cabeludo?\n- Isso começou agora ou é uma característica de sempre?\n- Você já teve reação com algum produto?\n- Arde, coça muito, inchou ou tem ferida? Teve piora rápida?\n- Você usa algum medicamento na pele?\n\nComo explicar para a cliente\n- “Pele oleosa também pode repuxar. Vamos escolher uma limpeza mais suave e um hidratante leve.”\n- “Se arder ou piorar, a gente pausa e eu chamo o farmacêutico.”\n- “Antes de orientar uso, a gente confirma no rótulo.”\n\nQuando chamar farmacêutico\n- vermelhidão e ardência fortes, coceira intensa, inchaço, ferida, secreção, dor importante\n- Reação após produto ou piora rápida\n- Uso de medicamento dermatológico e dúvida de combinação",
    practicalExample:
      "Cliente: “Minha pele é oleosa, mas está repuxando.”\nVocê: “Isso pode acontecer. Às vezes a pele fica oleosa e, ao mesmo tempo, sensível por produto muito forte. Vamos para uma limpeza mais suave e um hidratante leve. Antes de orientar, a gente confere no rótulo como usar e para quem é indicado.”",
    safePhrase:
      "Eu não fecho diagnóstico. Posso te ajudar com cuidado cosmético para a sensação que você descreveu e confirmar o rótulo com você.",
    avoid:
      "Evite:\n- “Isso é (doença) com certeza”\n- “Se arder é normal”\n- “Esse vai resolver sua condição”\n- “Pele oleosa não precisa hidratar”",
    exercise: {
      prompt:
        "Uma pessoa diz: “Minha pele sempre brilhou, mas agora está ardendo com qualquer produto”. O que é tipo e o que é condição? O que você faria no balcão?",
      expectedAnswer:
        "Tipo: tendência a oleosidade. Condição: sensibilidade/ardor no momento. Ação: reduzir para limpeza suave + hidratação compatível, confirmar rótulo e, se ardor for forte ou houver sinal de alerta, chamar o farmacêutico.",
    },
  },
  {
    id: "skincare-basico",
    title: "Skincare básico",
    summary: "Montar uma rotina simples, com poucos passos, que o cliente consegue manter.",
    objective:
      "Você vai aprender:\n- Rotina mínima para iniciante (limpar + hidratar + proteger)\n- Como ajustar a rotina por sensação da pele, sem exagerar\n- Erros comuns de balcão e como corrigir com frases seguras\n\nEm uma frase:\nSkincare básico é consistência no essencial, não quantidade de produtos.",
    content:
      "Na prática do balcão\nA maioria das pessoas trava porque tenta “começar com tudo”. Seu papel é montar uma rotina mínima que cabe na vida real. A evolução vem depois, uma mudança por vez.\n\nPerguntas úteis\n- Você quer começar do zero ou já usa alguma coisa?\n- O que mais te incomoda hoje: oleosidade, ressecamento, sensibilidade, espinhas, manchas percebidas?\n- Você sente ardor com frequência? Teve reação recente?\n- Você usa protetor solar todo dia? Qual a maior dificuldade (textura, cor, preço)?\n\nComo explicar para a cliente\n- “Vamos começar simples. Se você conseguir manter, aí a gente ajusta depois.”\n- “Pele oleosa também pode precisar de hidratação; a diferença é a textura.”\n- “Se arder, a gente pausa e volta para o básico.”\n\nErros comuns no balcão (e como corrigir)\n- Cliente quer muitos produtos de uma vez → “Vamos escolher o essencial primeiro.”\n- Cliente acha que pele oleosa não hidrata → “Pode hidratar com textura leve.”\n- Cliente quer ‘ácido’ sem entender uso → “Sem rótulo e sem orientação clara, eu prefiro chamar o farmacêutico.”\n- Cliente abandona protetor por textura → “Vamos buscar uma textura que você consegue usar.”\n\nQuando chamar farmacêutico\n- Ardor importante, reação, inchaço, ferida, piora rápida\n- Uso de medicamento dermatológico e dúvida de combinação",
    practicalExample:
      "Cliente: “Quero começar a cuidar do rosto, mas não sei por onde.”\nVocê: “Vamos no básico: limpeza, hidratação e protetor solar. Você escolhe a textura que gosta e a gente confere no rótulo como usar. Depois, se você estiver bem com essa rotina, a gente ajusta.”",
    safePhrase: "Vamos começar simples: limpeza + hidratação + proteção solar. A gente confirma no rótulo antes de orientar o uso.",
    avoid:
      "Evite:\n- “Compra tudo e usa junto”\n- “Se arder é normal”\n- “Pele oleosa não precisa hidratar”\n- “Protetor é só quando vai à praia”",
    exercise: {
      prompt:
        "Cliente iniciante quer “um monte de produtos” e está com pressa. Escreva um roteiro mínimo (3 passos) e um fechamento seguro em 1 frase.",
      expectedAnswer:
        "Roteiro: limpeza suave, hidratação adequada e proteção solar diária. Fechamento: “Antes de usar, confira o rótulo (modo de uso e advertências) e, se tiver reação ou dúvida, volta que eu chamo o farmacêutico.”",
    },
  },
  {
    id: "protecao-solar",
    title: "Proteção solar",
    summary: "Ajudar o cliente a escolher um protetor que ele realmente vai usar.",
    objective:
      "Você vai aprender:\n- Como escolher protetor por uso real (textura, com/sem cor, rotina)\n- Como orientar reaplicação sem inventar regra (seguir rótulo)\n- Como lidar com reclamações comuns: “pesa”, “arde”, “não gosto da cor”, “é caro”\n\nEm uma frase:\nO melhor protetor é o que a pessoa consegue usar todo dia.",
    content:
      "Na prática do balcão\nO protetor falha por abandono: textura ruim, cor que não funciona, sensação pegajosa, ardor nos olhos, preço. Seu trabalho é ajustar escolha ao uso real.\n\nFundamentos (linguagem simples)\n- UVB: muito ligada à queimadura; é o que o FPS mede.\n- UVA: penetra mais fundo, atravessa o vidro comum mais que a UVB e se associa a envelhecimento e dano cumulativo. Por isso “amplo espectro” (UVA+UVB) importa.\n- FPS não é duração: SPF 30 barra cerca de 97% e SPF 50 cerca de 98% da UVB quando bem aplicado; nenhum barra 100%, e pouca quantidade reduz a proteção real.\n- “Resistente à água” não é “à prova d’água”: reaplicar conforme o rótulo, principalmente após suor, água ou toalha.\n- Fotoproteção é conjunto: protetor + reaplicação + sombra, roupas, chapéu e óculos.\n\nPerguntas úteis\n- É para rosto ou corpo? Uso diário ou só quando sai ao sol?\n- Você prefere com cor ou sem cor?\n- Você reclama mais de oleosidade, ressecamento ou ardor?\n- Você usa maquiagem? Sua muito? Vai para praia/piscina?\n- Qual faixa de preço faz sentido?\n\nComo explicar para a cliente\n- “FPS e a indicação de UVA/UVB estão no rótulo. Vamos escolher uma textura que você consegue manter.”\n- “Reaplicação: a forma mais segura é seguir o rótulo do produto.”\n- “Se arder ou causar reação, a gente pausa e chama o farmacêutico.”\n\nQuando chamar farmacêutico\n- Reação/ardor importante, coceira intensa, inchaço, ferida\n- Criança, gestante/lactante ou uso de medicamento dermatológico quando houver dúvida\n- Cliente descreve sintoma fora de cosmético (dor, ferida, sangramento, secreção)",
    practicalExample:
      "Cliente: “Tenho preguiça de protetor, fica pegajoso.”\nVocê: “Vamos buscar uma textura mais leve ou toque seco. Eu te mostro algumas opções e a gente confere o rótulo para ver indicação e modo de uso.”",
    safePhrase:
      "Vou te ajudar a escolher um protetor que você consegue usar no dia a dia. Antes de orientar, a gente confere o rótulo (indicação, modo de uso e advertências).",
    avoid:
      "Evite:\n- “Esse trata mancha/melasma”\n- “Esse protege mais do que outros com o mesmo FPS”\n- “Pode usar em qualquer pessoa sem checar rótulo”\n- “Se arder é normal”",
    exercise: {
      prompt:
        "Uma cliente quer “um protetor para o rosto que não pese” e diz que alguns ardem. Quais 4 perguntas simples você faz antes de sugerir opções?",
      expectedAnswer:
        "Exemplos: com cor ou sem cor; toque seco ou mais hidratante; já teve ardor/reação e onde (olhos/rosto); uso diário/maquiagem/suor/praia; e sempre confirmar modo de uso/advertências no rótulo.",
    },
  },
  {
    id: "leitura-rotulo",
    title: "Leitura de rótulo",
    summary: "Transformar rótulo em checklist: o que confirmar antes de orientar qualquer produto.",
    objective:
      "Você vai aprender:\n- Um checklist prático do que confirmar na embalagem\n- Um roteiro de “1 minuto” para reduzir risco no balcão\n- Como responder “posso usar?” sem inventar informação\n\nEm uma frase:\nO rótulo é a fonte final de segurança antes de orientar.",
    content:
      "Na prática do balcão\nQuando a base não tem “modo de usar”, “advertência” ou “restrição”, você não completa com achismo. Você usa a embalagem.\n\nComo ler uma embalagem em 1 minuto\n1) O que é? (categoria)\n2) Para quem é? (indicação/tipo quando houver)\n3) Para que serve? (finalidade cosmética)\n4) Como usa? (modo de uso)\n5) Tem alerta? (advertências/restrições)\n6) Está íntegro e dentro da validade? (lacre, lote, validade)\n7) Precisa chamar farmacêutico? (dúvida, restrição, sinal de alerta)\n\nPerguntas úteis\n- Você já usou algo parecido e teve reação?\n- É para rosto, corpo ou couro cabeludo?\n- Tem gestação/lactação, criança, alergia importante ou uso de medicamento?\n\nComo explicar para a cliente\n- “Eu não vou orientar sem confirmar. Vamos olhar o rótulo juntas.”\n- “Se houver dúvida de restrição, eu chamo o farmacêutico.”\n\nQuando chamar farmacêutico\n- Dúvida de restrição (gestante/lactante/criança) quando o rótulo não resolve\n- Uso de medicamento dermatológico com dúvida\n- Reação/ardor importante ou sinal de alerta",
    practicalExample:
      "Cliente: “Posso usar isso todo dia?”\nVocê: “Eu não vou te orientar frequência sem confirmar. Vamos olhar o rótulo juntas e ver o modo de uso e as advertências.”",
    safePhrase: "Antes de orientar, eu confirmo no rótulo: modo de uso, advertências e restrições.",
    avoid:
      "Evite:\n- “Pode usar à vontade”\n- “É sempre seguro”\n- “Se não tem nada escrito, deve poder”\n- “Eu sei porque já vendi muito”",
    exercise: {
      prompt: "Escreva o roteiro de “1 minuto” para ler uma embalagem e reduzir risco no balcão (7 passos).",
      expectedAnswer:
        "O que é; para quem é; para que serve; como usa; advertências/restrições; integridade/validade/lote; decidir se precisa chamar farmacêutico.",
    },
  },
  {
    id: "produtos-na-pratica",
    title: "Produtos na prática",
    summary: "Conectar categorias de loja com objetivos reais do cliente.",
    objective:
      "Você vai aprender:\n- Como transformar “categoria” em orientação simples de balcão\n- Como comparar opções sem inventar benefício\n- Como usar os módulos de aprofundamento por categoria\n\nEm uma frase:\nCategoria é linguagem de loja: ajuda a escolher com calma e sem prometer resultado.",
    content:
      "Na prática do balcão\nQuando o cliente pede “um produto para X”, sua primeira resposta é transformar isso em uma categoria e um objetivo cosmético simples. Você reduz para poucas opções e confirma rótulo.\n\nPerguntas úteis\n- É para rosto, corpo ou cabelo?\n- O objetivo é conforto, limpeza, hidratação, proteção, aparência mais uniforme ou controle de oleosidade?\n- Tem sensibilidade/reação ou uso de medicamento?\n- Preferência de textura/perfume/preço?\n\nComo explicar para a cliente\n- “Eu te mostro duas opções da mesma categoria e a gente escolhe pela textura e pelo rótulo.”\n- “Se for algo fora do cosmético ou tiver sinal de alerta, eu chamo o farmacêutico.”\n\nAprofundamento por categoria\nPara treinar na prática, procure os módulos: Produtos — Limpeza facial; Produtos — Hidratação; Produtos — Proteção solar; Produtos — Cabelo; Produtos — Corpo; Produtos — Perfumaria e maquiagem básica.\n\nQuando chamar farmacêutico\n- Sinal de alerta, reação, ferida, dor importante\n- Dúvida de restrição (gestante/lactante/criança)\n- Uso de medicamento dermatológico com dúvida",
    practicalExample:
      "Cliente: “Água micelar é igual sabonete?”\nVocê: “São formas diferentes de limpeza. Eu te mostro algumas opções e você decide o que se adapta melhor. A gente confere no rótulo como usar.”",
    safePhrase:
      "Eu te ajudo a escolher pela categoria e pela sua preferência. O uso e as restrições eu sempre confirmo no rótulo.",
    avoid:
      "Evite: “Esse substitui qualquer outro”, “Pode trocar seu tratamento por isso”, “Não precisa limpar se usar água micelar”.",
    exercise: {
      prompt:
        "Um cliente pede “um produto para mancha” e está indeciso. Escreva (1) uma pergunta útil, (2) uma frase segura e (3) quando você chamaria o farmacêutico.",
      expectedAnswer:
        "Pergunta: “Apareceu de repente? Teve irritação, ferida ou reação?” Frase segura: “Posso te orientar cosmético e te mostrar opções; antes de orientar, a gente confirma no rótulo.” Chamar farmacêutico se houver sinal de alerta, reação, uso de medicamento ou dúvida importante.",
    },
  },
  {
    id: "produtos-limpeza-facial",
    title: "Produtos — Limpeza facial (na prática)",
    summary: "Gel de limpeza, sabonete facial, água micelar e demaquilante: como escolher sem exagero.",
    objective:
      "Você vai aprender:\n- Diferença prática entre tipos de limpeza (sem virar aula)\n- Perguntas para escolher por tolerância e preferência\n- Como evitar o erro de “limpar forte demais”\n\nEm uma frase:\nLimpeza boa remove sujeira sem deixar a pele reclamando.",
    content:
      "Na prática do balcão\nA pessoa quer “limpar bem”, mas muitas vezes o problema é limpeza agressiva: repuxar, ardor, descamar e tentar compensar com mil produtos.\n\nPerguntas úteis\n- Você usa maquiagem? Protetor com cor?\n- Sua pele repuxa ou arde depois de lavar?\n- Você tem espinhas frequentes ou sensibilidade?\n- Você quer algo rápido (uma etapa) ou aceita duas etapas (demaquilante + limpeza)?\n\nComo explicar para a cliente\n- “Se repuxa, é sinal de que está forte demais. Vamos para uma limpeza mais suave.”\n- “Água micelar pode ajudar, mas o uso ideal está no rótulo.”\n- “Se arder ou piorar, pausa e chama o farmacêutico.”\n\nQuando chamar farmacêutico\n- Ardor importante, ferida, reação, inchaço\n- Queixa fora de cosmético (dor forte, secreção, sangramento)",
    practicalExample:
      "Cliente: “Eu lavo e fica tudo repuxando, mas eu gosto porque sinto que limpou.”\nVocê: “Repuxar pode ser sinal de limpeza forte demais. Vamos escolher algo mais suave e ver como sua pele responde. Aí você confere no rótulo como usar.”",
    safePhrase: "Vamos escolher uma limpeza que você consegue manter sem ardor. Se tiver reação, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Se repuxar é porque limpou de verdade”\n- “Quanto mais forte, melhor”\n- “Pode esfoliar todo dia”",
    exercise: {
      prompt: "Cite 3 sinais de que a limpeza está forte demais e escreva uma orientação segura para corrigir.",
      expectedAnswer:
        "Sinais: repuxar, ardor, descamar/sensibilidade após lavar. Orientação: reduzir para limpeza mais suave, evitar excesso e confirmar no rótulo; se ardor for importante ou houver reação, chamar farmacêutico.",
    },
  },
  {
    id: "produtos-hidratacao",
    title: "Produtos — Hidratação (na prática)",
    summary: "Hidratante facial, corporal e séruns: escolher textura e conforto sem prometer tratamento.",
    objective:
      "Você vai aprender:\n- Como escolher hidratante por sensação (oleosa, seca, sensível)\n- Por que pele oleosa também pode precisar hidratar\n- Como orientar sem “prometer barreira perfeita”\n\nEm uma frase:\nHidratação é conforto e consistência com a textura certa.",
    content:
      "Na prática do balcão\nHidratante costuma falhar por textura errada: pesa, fica oleoso, arde, a pessoa abandona. Seu foco é ajustar a experiência.\n\nFundamentos (linguagem simples)\n- Hidratar é manter água e barreira em equilíbrio — não é deixar a pele “molhada” nem pesada.\n- Pele oleosa também pode estar desidratada/sensibilizada: oleosidade é sebo; hidratação é água e barreira.\n- Três funções para reconhecer no rótulo: umectantes (atraem água: glicerina, ácido hialurônico, pantenol), emolientes (maciez/toque: óleos, silicones, manteigas) e oclusivos/barreira (reduzem perda de água: petrolato, dimeticona, ceramidas).\n- Repuxar depois de lavar costuma ser limpeza agressiva ou falta de hidratação adequada, não sinal de “pele limpa”.\n\nPerguntas úteis\n- Sua pele repuxa, descama ou arde?\n- Você prefere gel, loção ou creme?\n- Você tem acne/espinhas frequentes ou sensibilidade?\n- É para rosto ou corpo?\n\nComo explicar para a cliente\n- “Oleosidade não exclui hidratação; muda a textura.”\n- “Se arder, pausa. A gente volta para o básico.”\n- “Modo de uso e restrições: confirmar no rótulo.”\n\nQuando chamar farmacêutico\n- Reação importante, inchaço, ferida\n- Queixa intensa de ardor e piora rápida",
    practicalExample:
      "Cliente: “Minha pele é oleosa, então eu não uso hidratante.”\nVocê: “Dá para hidratar com textura leve. Vamos testar uma opção que não pese e você confirma no rótulo o modo de uso.”",
    safePhrase: "Vamos escolher uma textura que você consegue usar todo dia. Se tiver reação, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Hidratante entope poros sempre”\n- “Se arder é normal”\n- “Esse resolve sua condição”",
    exercise: {
      prompt: "Escreva 3 perguntas úteis para escolher hidratante facial e um fechamento seguro em 1 frase.",
      expectedAnswer:
        "Perguntas: sensação (repuxa/oleosa/arde), preferência de textura, histórico de reação/sensibilidade. Fechamento: “Antes de orientar, a gente confirma no rótulo o modo de uso e, se tiver reação, você volta que eu chamo o farmacêutico.”",
    },
  },
  {
    id: "produtos-protecao-solar",
    title: "Produtos — Proteção solar (escolha na prática)",
    summary: "Com cor ou sem cor, toque seco ou hidratante, facial ou corporal: escolher pelo uso real.",
    objective:
      "Você vai aprender:\n- Como fechar a escolha por textura, cor e rotina\n- Como lidar com reclamações de ardor e oleosidade\n- Como orientar reaplicação sem inventar regra\n\nEm uma frase:\nProtetor precisa caber na rotina para funcionar.",
    content:
      "Na prática do balcão\nA pessoa abandona protetor por sensação, cor, ardor e preço. Você ajusta a escolha ao que ela consegue manter.\n\nPerguntas úteis\n- É para rosto ou corpo? Uso diário?\n- Você quer com cor? Usa maquiagem?\n- Você sua muito ou vai para água?\n- Você sente ardor com protetor?\n\nComo explicar para a cliente\n- “A escolha é textura + rótulo. Vamos achar um que você use de verdade.”\n- “Reaplicação: a forma segura é seguir o rótulo do produto.”\n\nQuando chamar farmacêutico\n- Ardor importante, reação, inchaço\n- Dúvida de restrição (gestante/criança) sem clareza no rótulo",
    practicalExample:
      "Cliente: “Quero com cor, mas fico com medo de ficar estranho.”\nVocê: “Vamos comparar duas opções com cor e escolher pela textura e pela adaptação. E a gente confere no rótulo como usar e quais cuidados.”",
    safePhrase: "Eu te ajudo a comparar opções e a confirmar o rótulo. Se tiver reação, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Esse clareia mancha”\n- “Pode usar em qualquer pessoa sem checar”\n- “Se arder é normal”",
    exercise: {
      prompt: "Monte um mini-roteiro (3 perguntas) para escolher protetor com cor e diga quando você encaminha ao farmacêutico.",
      expectedAnswer:
        "Perguntas: uso (diário/praia), preferência de textura, histórico de ardor/reação e se usa maquiagem. Encaminhar se houver reação importante, inchaço, ferida ou dúvida de restrição/medicamento.",
    },
  },
  {
    id: "ativos-cosmeticos",
    title: "Ativos cosméticos",
    summary: "Falar de ativos com pé no chão: objetivo cosmético, tolerância e rótulo.",
    objective:
      "Você vai aprender:\n- Como falar de ativo sem prometer cura\n- Como escolher “um ativo por vez” e observar tolerância\n- Como usar os módulos de aprofundamento por blocos de ativos\n\nEm uma frase:\nAtivo é proposta cosmética, não garantia de resultado.",
    content:
      "Na prática do balcão\nO cliente chega com “vi na internet”. Seu papel é reduzir risco: entender tolerância, confirmar rótulo e não empurrar combinação.\n\nRegras práticas\n- Um ativo por vez para iniciante\n- Se irritar, pausa e envolve o farmacêutico\n- Sem orientar gestante/criança sem rótulo\n- Sem prometer “tratamento”\n\nAprofundamento por blocos\nProcure os módulos: Ativos — Hidratação e barreira; Ativos — Oleosidade e espinhas; Ativos — Antioxidantes e aparência uniforme; Ativos — Renovação e antissinais.\n\nQuando chamar farmacêutico\n- Uso de medicamento dermatológico com dúvida\n- Pele muito sensibilizada, ardor importante ou reação",
    practicalExample:
      "Cliente: “Quero retinol porque vi na internet.”\nVocê: “Eu consigo te mostrar opções, mas é um ativo que pode irritar. Se você já usa medicamento ou tem sensibilidade, vamos chamar o farmacêutico. E a gente confirma no rótulo como usar.”",
    safePhrase:
      "Ativo não é milagre. Eu te ajudo a escolher com segurança e a confirmar no rótulo; se houver reação ou uso de medicamento, chamo o farmacêutico.",
    avoid:
      "Evite: “Retinol resolve tudo”, “Pode usar mesmo com a pele irritada”, “Se arder é porque está funcionando”.",
    exercise: {
      prompt: "Qual é a regra prática mais segura para introduzir ativos em uma rotina iniciante?",
      expectedAnswer:
        "Introduzir um por vez, observar tolerância, confirmar modo de uso/advertências no rótulo e interromper/encaminhar se houver irritação forte ou uso de medicamentos.",
    },
  },
  {
    id: "ativos-hidratacao-barreira",
    title: "Ativos — Hidratação e barreira (na prática)",
    summary: "Ácido hialurônico, ceramidas, pantenol e ureia: como explicar com segurança.",
    objective:
      "Você vai aprender:\n- Como explicar proposta de hidratação/conforto sem prometer cura\n- Quando ter cautela (pele muito sensibilizada/ardendo)\n- Frases seguras e perguntas rápidas de balcão\n\nEm uma frase:\nEsses ativos costumam aparecer em produtos de hidratação e conforto, mas o rótulo manda.",
    content:
      "Na prática do balcão\nO cliente pede “hidratação forte”, “pele repuxando”, “parece que nada segura”. Você traduz para conforto e textura.\n\nPerguntas úteis\n- É rosto ou corpo?\n- Está ardendo/descamando forte ou é só sensação de ressecamento?\n- Você já teve reação com hidratante?\n\nComo explicar para a cliente\n- “Esses ativos aparecem em produtos com proposta de hidratação e conforto. A gente escolhe pela textura e confirma no rótulo.”\n- “Se arder, a gente pausa e chama o farmacêutico.”\n\nQuando chamar farmacêutico\n- Ardor importante, ferida, inchaço, reação\n- Piora rápida ou dor importante",
    practicalExample:
      "Cliente: “Quero algo para pele muito ressecada.”\nVocê: “Vamos para um hidratante de conforto, com textura que você aguente usar. A gente confere no rótulo modo de uso e advertências.”",
    safePhrase: "Vamos escolher por conforto e textura e confirmar o rótulo antes de orientar.",
    avoid:
      "Evite:\n- “Isso reconstrói sua pele”\n- “Pode usar em qualquer situação sem checar”\n- “Se arder é normal”",
    exercise: {
      prompt: "Escreva 2 frases seguras para explicar ceramidas/ácido hialurônico sem prometer resultado clínico.",
      expectedAnswer:
        "Ex.: “Pode aparecer em produtos com proposta de hidratação e conforto. Vamos escolher pela textura e confirmar no rótulo.” / “Se a pele estiver muito sensibilizada ou arder, eu prefiro chamar o farmacêutico.”",
    },
  },
  {
    id: "ativos-oleosidade-acne",
    title: "Ativos — Oleosidade e espinhas (na prática)",
    summary: "Niacinamida, salicílico e zinco: proposta cosmética e cautelas sem “prometer tratar acne”.",
    objective:
      "Você vai aprender:\n- Como falar de oleosidade/espinhas como queixa (sem diagnosticar)\n- Como explicar ativos com pé no chão\n- Quando parar e encaminhar\n\nEm uma frase:\nEsses ativos aparecem em produtos com proposta de controle de oleosidade e aparência, mas não são “remédio”.",
    content:
      "Na prática do balcão\nA pessoa quer “acabar com espinha”. Você mantém a conversa no cosmético: limpeza compatível, hidratação leve, proteção e tolerância.\n\nPerguntas úteis\n- É espinha pontual ou algo que incomoda há muito tempo?\n- Tem dor, ferida, pus, inflamação importante?\n- Você já usa algum medicamento na pele?\n\nComo explicar para a cliente\n- “Pode aparecer em produtos com proposta de controle de oleosidade e aparência mais uniforme.”\n- “Se irritar, a gente pausa. Sem misturar muita coisa de uma vez.”\n\nQuando chamar farmacêutico\n- Dor importante, ferida, inflamação intensa, piora rápida\n- Uso de medicamento com dúvida de combinação",
    practicalExample:
      "Cliente: “Qual niacinamida cura acne?”\nVocê: “Eu não vou prometer cura. Ela pode aparecer em produtos com proposta de equilíbrio e aparência mais uniforme. Se você usa medicamento ou se está muito inflamado, eu chamo o farmacêutico.”",
    safePhrase: "Eu te ajudo com opção cosmética e leitura de rótulo. Se houver sinal de alerta, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Cura acne”\n- “Pode usar junto com tudo”\n- “Se arder é porque funciona”",
    exercise: {
      prompt: "Reescreva “esse ativo vai secar suas espinhas” em uma versão segura de balcão.",
      expectedAnswer:
        "Ex.: “Ele pode aparecer em produtos com proposta de controle de oleosidade. Vamos escolher com calma, confirmar o rótulo e observar tolerância. Se tiver sinal de alerta, eu chamo o farmacêutico.”",
    },
  },
  {
    id: "ativos-antioxidantes-uniformizacao",
    title: "Ativos — Antioxidantes e aparência uniforme (na prática)",
    summary: "Vitamina C: como explicar proposta cosmética sem prometer clareamento ou tratamento.",
    objective:
      "Você vai aprender:\n- Como falar de “aparência mais uniforme” sem prometer clarear mancha\n- Como orientar introdução com cautela\n- Quando encaminhar\n\nEm uma frase:\nVitamina C aparece em produtos com proposta de antioxidante e aparência mais uniforme, mas não é promessa clínica.",
    content:
      "Na prática do balcão\nO cliente chega com “mancha” e quer solução rápida. Você mantém no cosmético: proteção solar diária, rotina simples e tolerância.\n\nPerguntas úteis\n- Sua pele irrita fácil?\n- Você já usa algum produto mais forte (ácidos/medicamentos)?\n- Você usa protetor solar todos os dias?\n\nComo explicar para a cliente\n- “Pode ajudar na aparência mais uniforme dentro de uma rotina consistente, sem prometer resultado.”\n- “Se irritar, pausa.”\n\nQuando chamar farmacêutico\n- Irritação importante, ferida, piora rápida\n- Uso de medicamento com dúvida",
    practicalExample:
      "Cliente: “Quero vitamina C para tirar mancha.”\nVocê: “Eu posso te mostrar opções cosméticas, mas não vou prometer clareamento. O mais importante é protetor solar diário. A gente escolhe uma opção e confere o rótulo.”",
    safePhrase: "Eu não prometo resultado. Posso te orientar cosmético com segurança e confirmar o rótulo.",
    avoid:
      "Evite:\n- “Tira mancha”\n- “Você vai ver resultado em X dias”\n- “Pode usar junto com qualquer coisa”",
    exercise: {
      prompt: "Liste 2 perguntas e 1 frase segura para um cliente pedindo vitamina C para “mancha”.",
      expectedAnswer:
        "Perguntas: sensibilidade/reação; já usa algo forte/medicamento; usa protetor diário. Frase: “Posso te orientar cosmético, sem prometer resultado, e a gente confirma no rótulo como usar.”",
    },
  },
  {
    id: "ativos-renovacao-anti-idade",
    title: "Ativos — Renovação e antissinais (na prática)",
    summary: "Glicólico e retinol: foco em cautela, tolerância e encaminhamento quando necessário.",
    objective:
      "Você vai aprender:\n- Como falar de renovação/antissinais sem prometer “tratamento”\n- Por que tolerância e rótulo mandam\n- Quando não orientar e chamar farmacêutico\n\nEm uma frase:\nAtivos de renovação exigem mais cautela: introdução lenta, observação e rótulo.",
    content:
      "Na prática do balcão\nEsses ativos aparecem em produtos que o cliente associa a “resultado rápido”. Seu papel é diminuir risco: uma escolha por vez, observar irritação, e encaminhar quando houver dúvida.\n\nPerguntas úteis\n- Sua pele é sensível? Você já teve reação com ácidos?\n- Você está usando algum medicamento dermatológico?\n- Você tem pressa por “resultado” ou quer uma rotina que você consegue manter?\n\nComo explicar para a cliente\n- “São produtos que podem irritar. Eu não vou orientar uso sem rótulo claro e sem olhar sua tolerância.”\n- “Se irritar, pausa.”\n\nQuando chamar farmacêutico\n- Gestante/lactante/criança com dúvida\n- Uso de medicamento dermatológico\n- Pele muito sensibilizada, ardor importante, ferida",
    practicalExample:
      "Cliente: “Quero retinol forte porque vi no TikTok.”\nVocê: “Eu não vou te orientar algo forte sem cautela. Pode irritar. Se você já usa medicamento ou tem sensibilidade, eu prefiro chamar o farmacêutico. E a gente confere o rótulo.”",
    safePhrase: "Se for algo que pode irritar, eu prefiro confirmar rótulo e, se necessário, chamar o farmacêutico.",
    avoid:
      "Evite:\n- “Vai rejuvenescer rápido”\n- “Se arder é porque funciona”\n- “Pode usar mesmo com a pele sensibilizada”",
    exercise: {
      prompt: "Escreva 1 frase segura para recusar orientação apressada de retinol e encaminhar corretamente.",
      expectedAnswer:
        "Ex.: “Como pode irritar e depende do seu contexto, eu não vou orientar agora sem checar o rótulo e sem envolver o farmacêutico se houver dúvida ou uso de medicamento.”",
    },
  },
  {
    id: "cabelo-corpo-perfumaria-maquiagem",
    title: "Cabelo, corpo, perfumaria e maquiagem",
    summary: "Aplicar o mesmo atendimento consultivo fora do skincare facial.",
    objective:
      "Você vai aprender:\n- Como atender por categoria e preferência fora do rosto\n- Como reconhecer sinais de alerta (couro cabeludo e reação)\n- Como usar os módulos de produtos por categoria\n\nEm uma frase:\nO mesmo método funciona: objetivo, preferência, rótulo e encaminhamento quando necessário.",
    content:
      "Na prática do balcão\nA cliente pode estar comprando para si ou para presente. Em perfumaria e maquiagem, a decisão é muito de gosto. Em cabelo e corpo, o foco é conforto e sinal de alerta.\n\nPerguntas úteis\n- É para você ou presente?\n- Tem couro cabeludo sensível, ferida, coceira intensa ou queda súbita?\n- Em corpo: é ressecamento leve ou está ardendo/ferindo?\n- Você prefere perfume suave, cítrico, doce? (sem “aula técnica”)\n\nComo explicar para a cliente\n- “Eu te ajudo a escolher por preferência e categoria. Restrição e modo de uso: a gente confirma no rótulo.”\n\nAprofundamento por categoria\nProcure: Produtos — Cabelo; Produtos — Corpo; Produtos — Perfumaria e maquiagem básica.\n\nQuando chamar farmacêutico\n- Coceira intensa, ferida, descamação severa, dor\n- Queda intensa/súbita\n- Reação importante após produto",
    practicalExample:
      "Cliente: “Meu couro cabeludo coça muito e está descamando.”\nVocê: “Coceira e descamação forte podem precisar de avaliação. Eu vou chamar o farmacêutico antes de eu te orientar algo, tudo bem?”",
    safePhrase:
      "Eu te ajudo a escolher por categoria e preferência. Se houver sintoma importante, eu chamo o farmacêutico.",
    avoid:
      "Evite: “Isso é caspa mesmo”, “Esse shampoo cura”, “Pode usar qualquer coisa no couro cabeludo ferido”.",
    exercise: {
      prompt: "Dê um exemplo de sinal de alerta em cabelo e qual seria sua ação no balcão.",
      expectedAnswer:
        "Ex.: coceira intensa com ferida/descamação severa ou queda súbita; ação: interromper orientação e chamar o farmacêutico/encaminhar.",
    },
  },
  {
    id: "anatomia-fio-cabelo",
    title: "Anatomia do fio e couro cabeludo",
    summary: "Como o fio é formado (cutícula, córtex), o que é couro cabeludo e como diferenciar quebra de queda.",
    objective:
      "Você vai aprender:\n- A estrutura básica do fio (cutícula e córtex) em linguagem simples\n- Que o couro cabeludo é pele e pode ter sinais de alerta\n- A diferenciar quebra do fio de queda da raiz, sem diagnosticar\n\nEm uma frase:\nO cabelo tem o fio visível (haste) e o folículo na pele; cosmético cuida da aparência do fio, não trata queda nem doença do couro cabeludo.",
    content:
      "Na prática do balcão\nA cliente mistura problema do fio com problema do couro cabeludo. Seu papel é separar e usar perguntas simples.\n\nEstrutura do fio (linguagem simples)\n- Cutícula: camada externa, como 'telhas'. Quando alinhada, o fio reflete mais luz e parece mais brilhoso; quando danificada, vem frizz, aspereza e embaraço. Cosmético melhora toque/brilho/desembaraço, não 'reconstrói' o fio para sempre.\n- Córtex: parte interna e mais volumosa; ligada à resistência e elasticidade. Química, calor e atrito enfraquecem o fio. Dá para cuidar da aparência, mas quebra intensa pede cautela.\n- Couro cabeludo: é pele, com glândulas e folículos. Pode ter oleosidade, coceira, descamação, ferida, dor ou queda — alguns desses são sinal de alerta.\n\nPerguntas úteis\n- A queda é do fio quebrando ou saindo da raiz? Tem falhas?\n- Tem dor, ferida, coceira forte ou descamação intensa?\n- Fez química, coloração ou alisamento recentemente?\n- A raiz é oleosa e as pontas secas? Usa muito calor/chapinha?\n\nComo explicar para a cliente\n- \"Esse produto tem proposta cosmética de melhorar toque, brilho e desembaraço. Não recupera dano químico rapidamente.\"\n- \"Para a raiz e para o comprimento, podemos pensar em cuidados diferentes; vamos confirmar no rótulo.\"\n\nQuando chamar farmacêutico\n- Queda intensa, falhas ou queda persistente\n- Dor, ferida, secreção, coceira forte ou descamação intensa no couro cabeludo\n- Reação após química ou piora rápida",
    practicalExample:
      "Cliente: “Meu cabelo está caindo muito, dá para levar um shampoo antiqueda?”\nVocê: “Antes de indicar, preciso entender se é quebra do fio ou queda da raiz, e se há falhas, dor, ferida ou coceira forte. Como você falou ‘caindo muito’, eu não trato só como cosmético; vou chamar o farmacêutico para orientar com segurança.”",
    safePhrase:
      "Cuido da aparência do fio e da higiene do couro cabeludo. Para queda intensa, ferida, dor ou descamação forte, chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Esse shampoo para queda resolve”\n- “Recupera o cabelo em X dias”\n- “Sela a cutícula para sempre” / “reconstrói totalmente”\n- “Caspa é simples, leva esse”",
    exercise: {
      prompt:
        "Como diferenciar, no balcão, quebra do fio de queda da raiz — e qual é o critério para encaminhar ao farmacêutico?",
      expectedAnswer:
        "Perguntar se o fio parte no comprimento (quebra) ou sai inteiro com bulbo/da raiz (queda), e se há falhas. Encaminhar quando houver queda intensa/persistente, falhas, dor, ferida, secreção, coceira forte ou descamação intensa no couro cabeludo.",
    },
  },
  {
    id: "produtos-cabelo",
    title: "Produtos — Cabelo (na prática)",
    summary: "Shampoo, condicionador, máscara, leave-in e couro cabeludo: orientar por objetivo e sinal de alerta.",
    objective:
      "Você vai aprender:\n- Como escolher por objetivo (oleosidade, ressecamento, frizz, dano)\n- O que observar no couro cabeludo sem diagnosticar\n- Quando encaminhar (queda intensa, ferida, coceira forte)\n\nEm uma frase:\nEm cabelo, o principal é objetivo + tolerância + atenção ao couro cabeludo.",
    content:
      "Na prática do balcão\nO cliente geralmente mistura problema de fio com problema de couro cabeludo. Você separa e faz perguntas simples.\n\nPerguntas úteis\n- É mais sobre o fio (frizz, dano) ou sobre o couro cabeludo (coceira, descamação, ferida)?\n- A queda é leve do dia a dia ou foi súbita/intensa?\n- Você usa química (tintura, descoloração) e ferramenta de calor?\n\nComo explicar para a cliente\n- “Vamos escolher um shampoo compatível com o couro cabeludo e um cuidado para o fio.”\n- “Se houver ferida/coceira forte/queda intensa, eu prefiro chamar o farmacêutico.”\n\nQuando chamar farmacêutico\n- Ferida, secreção, dor importante no couro cabeludo\n- Coceira intensa, descamação severa\n- Queda súbita/intensa ou sinal de alerta",
    practicalExample:
      "Cliente: “Meu cabelo está caindo muito e meu couro cabeludo coça.”\nVocê: “Como tem coceira e queda intensa, eu não vou te orientar por conta agora. Vou chamar o farmacêutico para te atender com segurança, tudo bem?”",
    safePhrase: "Se envolver couro cabeludo com sintoma importante, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Esse shampoo cura”\n- “É normal cair muito”\n- “Pode usar qualquer coisa mesmo com ferida”",
    exercise: {
      prompt: "Escreva 3 perguntas para diferenciar problema de fio vs couro cabeludo e 1 critério de encaminhamento.",
      expectedAnswer:
        "Perguntas sobre coceira/ferida/descamação, queda súbita/intensa, e objetivos do fio (frizz/dano). Encaminhar quando houver ferida, coceira intensa, descamação severa ou queda intensa/súbita.",
    },
  },
  {
    id: "produtos-corpo",
    title: "Produtos — Corpo (na prática)",
    summary: "Hidratante corporal e desodorante: conforto, rotina e rótulo sem promessas.",
    objective:
      "Você vai aprender:\n- Como escolher hidratante corporal por textura e necessidade\n- Como orientar desodorante por preferência e tolerância\n- Quando encaminhar em caso de reação/lesão\n\nEm uma frase:\nCorpo é conforto + rotina simples + rótulo.",
    content:
      "Na prática do balcão\nO cliente quer “algo que resolva rápido”. Você reduz para rotina possível e produto que ele consegue repetir.\n\nPerguntas úteis\n- É ressecamento leve ou está ardendo/ferindo?\n- Você prefere textura leve ou mais densa?\n- Já teve reação com desodorante?\n\nComo explicar para a cliente\n- “Vamos escolher um hidratante que você consiga usar todo dia.”\n- “Se tiver irritação, a gente pausa.”\n\nQuando chamar farmacêutico\n- Ferida, dor importante, secreção\n- Reação forte e inchaço",
    practicalExample:
      "Cliente: “Meu desodorante sempre me dá irritação.”\nVocê: “Eu não vou te orientar sem cautela. Vamos ver opções mais suaves e, se continuar irritando, eu chamo o farmacêutico.”",
    safePhrase: "Se irritar, pausa. Se for forte, eu chamo o farmacêutico.",
    avoid:
      "Evite:\n- “Ardência é normal”\n- “Pode usar mesmo irritado”",
    exercise: {
      prompt: "Cite 2 perguntas para escolher hidratante corporal e 1 frase segura de fechamento.",
      expectedAnswer:
        "Perguntas: nível de ressecamento/ardor e preferência de textura. Fechamento: “Confere no rótulo como usar e, se tiver reação, volta que eu chamo o farmacêutico.”",
    },
  },
  {
    id: "produtos-perfumaria-maquiagem",
    title: "Produtos — Perfumaria e maquiagem básica (na prática)",
    summary: "Escolher por preferência e ocasião, sem aula técnica e sem prometer efeito.",
    objective:
      "Você vai aprender:\n- Como orientar escolha de perfume/body splash por gosto e ocasião\n- Como atender maquiagem básica com linguagem simples\n- Como fechar venda com segurança (teste, rótulo, preferência)\n\nEm uma frase:\nPerfumaria e maquiagem são preferência: a melhor escolha é a que a pessoa gosta de usar.",
    content:
      "Na prática do balcão\nAqui o atendimento é mais sobre gosto do que sobre “certo e errado”. Você facilita a decisão com poucas opções.\n\nPerguntas úteis\n- É para você ou presente?\n- Você prefere algo mais suave ou marcante?\n- Para dia a dia ou ocasião?\n- Tem sensibilidade a perfume?\n\nComo explicar para a cliente\n- “Vou te mostrar duas opções e você escolhe pelo que te agrada.”\n- “Se tiver sensibilidade, a gente vai com mais cautela e confirma rótulo.”\n\nQuando chamar farmacêutico\n- Reação importante ou sensibilidade forte relatada",
    practicalExample:
      "Cliente: “Quero um perfume para presente, mas não sei o gosto.”\nVocê: “Vamos por um caminho seguro: uma opção mais suave e uma mais marcante. Você escolhe e, se quiser, eu te ajudo com um body splash mais leve.”",
    safePhrase: "Eu te ajudo a escolher por preferência e ocasião, com poucas opções.",
    avoid:
      "Evite:\n- “Esse é o melhor para todo mundo”\n- “Compra esse que agrada sempre”",
    exercise: {
      prompt: "Escreva 3 perguntas para orientar presente em perfumaria e uma frase de fechamento objetiva.",
      expectedAnswer:
        "Perguntas: para quem é, preferência (suave/marcante), ocasião (dia a dia/noite). Fechamento: “Vou te mostrar duas opções seguras e você escolhe pelo que mais te agrada.”",
    },
  },
  {
    id: "unhas-cuidados",
    title: "Unhas: cuidado cosmético e sinais de alerta",
    summary: "Estrutura básica da unha, produtos cosméticos (esmalte, base, removedor, óleo de cutícula) e quando encaminhar.",
    objective:
      "Você vai aprender:\n- A estrutura básica da unha e o que não machucar\n- As categorias de produtos cosméticos para unha e o que cada uma propõe\n- A reconhecer sinais de alerta que pedem farmacêutico ou dermatologista\n\nEm uma frase:\nDá para orientar cosmético para aparência e cuidado da unha; não se diagnostica micose, não se trata infecção e não se promete fortalecer ou crescer.",
    content:
      "Na prática do balcão\nA cliente quer aparência e cuidado. Você orienta cosmético, mas não cobre unha lesionada nem trata alteração com esmalte.\n\nEstrutura básica (linguagem simples)\n- Lâmina: parte dura e visível, onde entram esmalte, base, top coat, óleo e fortalecedor cosmético.\n- Leito: pele sob a lâmina; não deve ser machucado.\n- Cutícula: protege a entrada da matriz; remover de forma agressiva aumenta risco de trauma e irritação. Melhor hidratar.\n\nProdutos (proposta cosmética)\n- Esmalte/base/top coat: cor, acabamento, brilho e proteção visual da esmaltação.\n- Removedor: pode ressecar; usar com cautela e hidratar depois.\n- Óleo/hidratante de cutícula: conforto e aparência de cutícula menos ressecada.\n- Fortalecedor: proposta cosmética de aparência/resistência conforme o rótulo — não é tratamento e não 'faz crescer'.\n\nPerguntas úteis\n- A unha quebra na ponta ou está descolando?\n- Mudou de cor, engrossou ou está doendo?\n- Tem contato frequente com água/produtos de limpeza?\n- Usa muito removedor/esmaltação?\n\nComo explicar para a cliente\n- \"Posso ajudar com aparência e cuidado cosmético. Para dor, descolamento ou mudança importante de cor, é melhor avaliar antes.\"\n- \"Não consigo afirmar que é micose; isso precisa de avaliação.\"\n\nQuando chamar farmacêutico\n- Dor, pus/secreção, inchaço, vermelhidão intensa, sangramento ou ferida\n- Unha descolando, muito espessa, mau cheiro ou cor que muda/persiste\n- Faixa escura nova ou mudando; trauma; queda da unha\n- Criança, gestante/lactante ou pessoa com diabetes com alteração importante",
    practicalExample:
      "Cliente: “Minha unha ficou amarela e grossa. Qual esmalte cobre melhor?”\nVocê: “Eu não trataria isso só como questão estética. Como você falou em mudança de cor e espessamento, é melhor chamar o farmacêutico ou orientar avaliação. Depois, se estiver tudo seguro, a gente fala de esmalte.”",
    safePhrase:
      "Oriento cosmético para aparência e cuidado da unha. Não diagnostico micose, não trato infecção e encaminho quando há dor, descolamento ou mudança importante.",
    avoid:
      "Evite:\n- “Esse fortalecedor cura unha fraca” ou “faz crescer”\n- “Isso resolve micose”\n- Cobrir unha descolando/lesionada com esmalte como solução\n- “Pode usar mesmo com ferida”",
    exercise: {
      prompt:
        "Uma cliente quer um esmalte para “disfarçar” uma unha amarelada, espessa e que está descolando. Qual é a condução segura?",
      expectedAnswer:
        "Não tratar como questão só estética nem cobrir com esmalte: mudança de cor, espessamento e descolamento são sinais que pedem avaliação. Chamar o farmacêutico ou orientar dermatologista; falar de esmalte só depois, se estiver seguro.",
    },
  },
  {
    id: "sinais-alerta-encaminhamento",
    title: "Sinais de alerta e encaminhamento",
    summary: "Reconhecer quando parar a orientação cosmética e envolver o farmacêutico.",
    objective:
      "Ter uma lista prática de sinais de alerta e um texto pronto de encaminhamento, sem alarmismo.",
    content:
      "Sinais de alerta são situações em que você não deve “tentar resolver” com cosmético. O atendimento seguro é reconhecer e encaminhar.\n\nAlguns sinais práticos:\n- Ferida aberta, sangramento, secreção, pus\n- Dor importante, inchaço, febre\n- Coceira intensa ou reação forte após produto\n- Lesão que cresce rápido ou muda muito\n- Queimadura, pele muito sensibilizada\n- Bebê/criança com sintoma importante\n- Uso de medicamento dermatológico e dúvida de combinação\n\nEncaminhamento padrão: chamar o farmacêutico e orientar procurar serviço de saúde se necessário.",
    practicalExample:
      "Cliente: “Passei um creme e inchou meu rosto.”\nVocê: “Entendi. Como teve inchaço, eu não vou te orientar outro produto agora. Vou chamar o farmacêutico para te atender com segurança, tudo bem?”",
    safePhrase:
      "Com esse sinal de alerta, eu não vou orientar cosmético agora. Vou chamar o farmacêutico para avaliar com você.",
    avoid:
      "Evite: “Isso é normal”, “Continua usando”, “Passa qualquer hidratante que melhora”.",
    exercise: {
      prompt: "Cite 3 sinais de alerta e escreva uma frase curta de encaminhamento para o farmacêutico.",
      expectedAnswer:
        "Ex.: ferida com secreção, inchaço/reação forte, dor importante. Frase: “Com esse sinal de alerta eu prefiro chamar o farmacêutico para te atender com segurança.”",
    },
  },
  {
    id: "atuacao-profissional",
    title: "Atuação profissional",
    summary: "O papel da dermoconsultora, os limites da função e como trabalhar com o farmacêutico, a equipe e as campanhas.",
    objective:
      "Você vai aprender:\n- O papel real da dermoconsultora e o que está dentro/fora do escopo\n- Como passar um caso ao farmacêutico e quando acionar a liderança\n- Como apoiar campanhas e testadores com ética e higiene\n\nEm uma frase:\nA dermoconsultora orienta cosmético com escuta e ética; não diagnostica, não prescreve e encaminha quando o caso sai do cosmético.",
    content:
      "Na prática do balcão\nSua atuação combina atendimento, demonstração/orientação, organização do setor e apoio a campanhas. Venda faz parte, mas é venda orientada e responsável.\n\nPode fazer\n- Orientar produto cosmético e explicar a finalidade conforme o rótulo\n- Demonstrar textura/fragrância/acabamento (com higiene e política da loja)\n- Comparar opções, sugerir rotina básica, lembrar de fotoproteção\n- Organizar o setor e apoiar campanhas\n\nNão pode fazer\n- Diagnosticar (acne, melasma, dermatite, micose, alergia)\n- Prescrever tratamento ou indicar medicamento\n- Prometer cura/resultado ou dizer que “trata doença”\n- Garantir estoque físico a partir do site\n\nPassar o caso ao farmacêutico\nLeve o essencial: queixa principal, há quanto tempo, área, sinais de alerta, produto usado (se souber) e o que a cliente pediu. Ex.: “Cliente relata ardência forte e vermelhidão após produto novo, quer algo para passar agora. Pode avaliar com ela?”\n\nAcionar a liderança\n- Ruptura, validade vencida, embalagem violada, testador inadequado, campanha sem material ou conflito no atendimento.\n\nPerguntas úteis\n- É para qual área? Já usa algo?\n- Tem ardor, alergia, ferida ou reação?\n- Prefere textura/preço? Quer rotina simples?\n\nComo explicar para a cliente\n- “Esse produto está em campanha; posso te mostrar se fizer sentido para o que você procura.”\n- “Se não fizer sentido para sua pele/rotina, melhor não levar só porque está em promoção.”\n\nQuando chamar farmacêutico\n- Dor, ferida, secreção, inchaço, alergia forte, ardência intensa ou piora rápida\n- Uso de medicamento; gestante/lactante ou criança com dúvida\n- Pedido de medicamento, suspeita de doença ou dúvida de segurança",
    practicalExample:
      "Cliente: “Esse está barato. Serve para minha pele sensível?”\nVocê: “Vamos confirmar no rótulo se é indicado para o seu perfil e se há advertências. Promoção é boa quando o produto faz sentido para a sua necessidade — se não fizer, melhor não levar só pelo preço.”",
    safePhrase:
      "Oriento cosmético com ética, dentro do rótulo. Não diagnostico nem prescrevo, e aciono o farmacêutico quando o caso sai do cosmético.",
    avoid:
      "Evite:\n- Diagnosticar ou prometer cura\n- “Pode usar sem medo” / “esse é o melhor da loja”\n- Empurrar rotina enorme ou kit por causa da campanha\n- Prometer estoque da loja a partir do site",
    exercise: {
      prompt:
        "Uma cliente pede para você confirmar se a mancha dela “é melasma”. Como responder respeitando o limite da função?",
      expectedAnswer:
        "Não fechar diagnóstico: explicar que você orienta cosmético (fotoproteção, cobertura/uniformização) sem afirmar o que é, e orientar avaliação profissional ou farmacêutico se a mancha mudou, cresceu ou incomoda muito.",
    },
  },
  {
    id: "operacao-de-loja",
    title: "Operação de loja",
    summary: "Organizar o atendimento e a rotina para não perder tempo e não criar risco.",
    objective:
      "Você vai aprender:\n- Rotina prática de setor para reduzir erro e retrabalho\n- O que checar na gôndola (validade, lacre, organização) sem travar o atendimento\n- Como usar o app para ganhar tempo com segurança\n\nEm uma frase:\nOperação boa deixa o atendimento simples, rápido e seguro.",
    content:
      "Na prática do balcão\nQuando a loja está cheia, a operação é o que evita risco: produto errado, orientação apressada, embalagem violada, validade estourada.\n\nRotina prática (começo de turno)\n- Checar gôndola: produto fora de lugar, ruptura e precificação\n- Checar validade e integridade (lacre/embalagem violada)\n- Ajustar área: limpeza/higiene do setor e organização por categoria/marca\n- Estar pronta para campanhas e lançamentos (sem “prometer milagre”)\n\nComo usar o app para ganhar tempo\n- Buscar e comparar rapidamente\n- Favoritar produtos para estudo (rever com calma depois)\n- Abrir checklist de segurança quando houver dúvida\n\nComo explicar para a cliente (em fila)\n- “Vou te mostrar duas opções e você escolhe pela textura e pelo rótulo.”\n\nQuando chamar farmacêutico\n- Dúvida de restrição (gestante/lactante/criança)\n- Sinal de alerta ou reação\n- Cliente usando medicamento e pedindo combinação",
    practicalExample:
      "Fila grande e cliente pede “o melhor hidratante”.\nVocê: “Eu posso te mostrar duas opções e a gente escolhe pelo que você prefere. Se você tiver pele muito sensível ou alguma reação, eu chamo o farmacêutico.”",
    safePhrase: "Vou te mostrar poucas opções e a gente confere o rótulo. Se houver dúvida, eu chamo o farmacêutico.",
    avoid:
      "Evite: “Leva esse porque é o mais caro”, “Isso serve para todo mundo”, “Não precisa conferir rótulo”.",
    exercise: {
      prompt: "Qual é a regra de ouro para reduzir risco quando o atendimento está corrido?",
      expectedAnswer:
        "Reduzir para o básico, não inventar (confirmar rótulo) e encaminhar ao farmacêutico quando houver sinal de alerta ou dúvida.",
    },
  },
  {
    id: "simulacoes-atendimento",
    title: "Simulações de atendimento",
    summary: "Treinar respostas reais de balcão, com começo, meio e fim.",
    objective:
      "Praticar o roteiro consultivo e as frases seguras em cenários comuns, sem “consulta médica”.",
    content:
      "Simulação é treino. O objetivo é conseguir atender com calma, fazer poucas perguntas, evitar promessas e fechar uma orientação segura.\n\nEm cada cenário, pratique:\n- pergunta inicial\n- checagem de alerta\n- sugestão de poucas opções\n- frase segura\n- encerramento com confirmação do rótulo",
    practicalExample:
      "Cenário: cliente quer “um produto para mancha” e está com pressa.\nVocê: “Posso te orientar cosmético e mostrar opções rápidas. Antes: apareceu de repente? tem ferida ou irritação? Se tiver algo diferente, eu chamo o farmacêutico. Se for cuidado cosmético, eu te mostro duas opções e a gente confere o rótulo.”",
    safePhrase:
      "Eu te ajudo com opções cosméticas e com a leitura do rótulo. Se tiver sinal de alerta, eu chamo o farmacêutico.",
    avoid:
      "Evite: “Isso é melasma com certeza”, “Usa isso e resolve”, “Não precisa protetor”.",
    exercise: {
      prompt: "Escreva um fechamento de atendimento em 1–2 frases após escolher um produto cosmético.",
      expectedAnswer:
        "Fechamento com rótulo e segurança: “Combinado. Antes de usar, confira o rótulo (modo de uso e advertências). Se tiver reação ou dúvida, volta e a gente chama o farmacêutico.”",
    },
  },
  {
    id: "exercicios-com-gabarito",
    title: "Exercícios com gabarito",
    summary: "Fixar o que importa: segurança, rótulo, encaminhamento e escolha prática.",
    objective:
      "Treinar decisões rápidas de balcão com resposta esperada clara.",
    content:
      "Exercício bom é objetivo. Treine decisões que você toma todo dia:\n- reconhecer sinal de alerta\n- escolher frase segura\n- diferenciar tipo vs condição\n- confirmar o que olhar no rótulo\n- decidir se orienta ou encaminha\n\nUse o gabarito para ajustar a sua frase, não para decorar uma aula.",
    practicalExample:
      "Exercício: cliente pergunta “posso usar isso na gravidez?”.\nResposta segura: “Eu não vou orientar sem confirmar o rótulo. Vamos checar as advertências e, se houver dúvida, chamo o farmacêutico.”",
    safePhrase: "Eu não oriento restrição sem rótulo. Se houver dúvida, chamo o farmacêutico.",
    avoid:
      "Evite: “Pode sim”, “Não tem problema”, “Grávida pode tudo que é cosmético”.",
    exercise: {
      prompt: "Qual é a resposta segura padrão quando o cliente pergunta sobre restrição e você não tem o dado na base?",
      expectedAnswer:
        "Confirmar no rótulo antes de orientar e, se permanecer dúvida ou houver sinal de alerta, chamar o farmacêutico.",
    },
  },
  {
    id: "checklist-rapido",
    title: "Checklist rápido",
    summary: "Um lembrete de balcão para reduzir risco: atendimento, rótulo, alerta e encaminhamento.",
    objective:
      "Ter um checklist que cabe no dia a dia e reforça a regra-mãe do app.",
    content:
      "Checklist de balcão:\n1) Objetivo do cliente em uma frase\n2) Checagem de sinal de alerta\n3) Mostrar poucas opções\n4) Conferir rótulo (modo de uso/advertências/restrições)\n5) Encerrar com frase segura e convite para voltar\n\nSe algo sair do cosmético, você encaminha.",
    practicalExample:
      "Cliente indeciso e você já mostrou opções.\nVocê: “Vamos escolher por textura e pela indicação do rótulo. Qual você prefere? Se tiver qualquer reação, volta e eu chamo o farmacêutico.”",
    safePhrase:
      "Use este app como apoio no atendimento. Confira o rótulo e chame o farmacêutico em caso de dúvida ou sinal de alerta.",
    avoid:
      "Evite: “Você não precisa ler o rótulo”, “Isso é igual remédio”, “Vai curar”.",
    exercise: {
      prompt: "Escreva a sequência do checklist rápido em 5 itens (do começo ao fim do atendimento).",
      expectedAnswer:
        "Objetivo do cliente, checagem de alerta, poucas opções, conferir rótulo, fechar com frase segura e encaminhar se necessário.",
    },
  },
  {
    id: "categorias-de-loja",
    title: "Categorias de loja (na prática)",
    summary: "Entender onde o produto fica na gôndola e como explicar sem virar aula técnica.",
    objective:
      "Conseguir localizar a categoria certa, propor 2–4 opções e fechar com segurança (rótulo + encaminhamento quando necessário).",
    content:
      "Pense como loja: o cliente não compra “ativo”, compra uma solução prática.\n\nCategorias comuns no balcão:\n- Limpeza facial\n- Hidratação\n- Proteção solar (com/sem cor)\n- Tratamentos cosméticos (sem prometer resultado)\n- Cabelo (queda, caspa, frizz)\n- Maquiagem básica\n- Perfumaria/presente\n\nRoteiro rápido:\n1) Necessidade (uma frase)\n2) Área (rosto/corpo/cabelo)\n3) Preferência (uso simples/mais suave/preço)\n4) Sinal de alerta? Se sim, chamar farmacêutico.\n5) Mostrar poucas opções e confirmar no rótulo.",
    practicalExample:
      "Cliente: “Quero algo para oleosidade.”\nVocê: “É para rosto? Você prefere algo bem simples? Se tiver ardência forte ou ferida eu chamo o farmacêutico. Se não, eu te mostro algumas opções e a gente confere o rótulo antes de orientar.”",
    safePhrase: "Posso te ajudar a comparar opções. Confirmar no rótulo antes de orientar.",
    avoid:
      "Evite: “Isso vai curar”, “Esse é o melhor”, “Pode usar sem checar rótulo”, “Isso é uma doença X”.",
    exercise: {
      prompt: "Liste 3 categorias de loja que você checa antes de sugerir qualquer produto para o rosto.",
      expectedAnswer:
        "Limpeza facial; hidratação; proteção solar (e, quando fizer sentido, tratamento cosmético sem prometer resultado).",
    },
  },
  {
    id: "comparar-parecidos",
    title: "Comparar produtos parecidos",
    summary: "Critérios simples para comparar sem inventar benefício.",
    objective:
      "Conseguir justificar a escolha de forma curta e segura, usando categoria, cautela, complexidade e rótulo.",
    content:
      "Quando dois produtos parecem iguais, compare pelo que é seguro e visível:\n\n1) Categoria/etapa da rotina (para que serve na rotina)\n2) Cautela (o quão “sensível” é a orientação)\n3) Complexidade (uso simples x exige atenção)\n4) Preferência do cliente (textura, com/sem cor, perfume, preço)\n\nSe faltar informação, não adivinhe: confirmar no rótulo antes de orientar.\n\nFechamento prático: “Vou te mostrar duas opções e a gente escolhe pela textura e pelo rótulo.”",
    practicalExample:
      "Cliente: “Qual é melhor?”\nVocê: “Não existe um melhor para todo mundo. Eu te mostro duas opções parecidas e a gente compara por textura, uso e rótulo. Se tiver qualquer dúvida, eu chamo o farmacêutico.”",
    safePhrase: "Eu te ajudo a comparar poucas opções e a confirmar no rótulo antes de orientar.",
    avoid:
      "Evite: “Esse é o melhor do mercado”, “Esse funciona para todo mundo”, “Pode usar sem restrição”.",
    exercise: {
      prompt: "Cite 4 critérios simples para comparar dois cosméticos parecidos sem prometer resultado.",
      expectedAnswer:
        "Categoria/etapa; cautela; complexidade; preferência do cliente (textura/preço) + confirmar no rótulo quando faltar informação.",
    },
  },
  {
    id: "venda-consultiva",
    title: "Venda consultiva",
    summary: "Conduzir a venda a partir da necessidade da cliente — abordar, entender, comparar e fechar sem empurrar nem prometer.",
    objective:
      "Você vai aprender:\n- O ciclo de venda consultiva (acolher → entender → confirmar → orientar → comparar → fechar → reforçar segurança)\n- Como oferecer complemento sem empurrar\n- Como responder objeções de preço, medo, pressa e “quero o mais forte”\n\nEm uma frase:\nVenda boa começa na necessidade da cliente, não no produto mais caro.",
    content:
      "Na prática do balcão\nVocê ajuda a cliente a escolher o que faz sentido para necessidade, orçamento, rotina, preferência e segurança — sempre dentro do rótulo. Vender menos, quando é o certo, também é bom atendimento.\n\nO ciclo (curto)\n1) Acolher: “Posso te ajudar a encontrar algo ou quer uma orientação?”\n2) Entender: área, se já usa algo, uso diário ou pontual, textura, reação anterior, orçamento.\n3) Confirmar: repetir o que entendeu antes de recomendar.\n4) Orientar: explicar a proposta cosmética, sem diagnosticar.\n5) Comparar: diferença de textura, etapa, simplicidade, cautela e preço.\n6) Fechar: oferecer a opção mais simples e deixar a decisão com a cliente.\n7) Reforçar segurança: o que fazer se arder, piorar ou aparecer ferida.\n\nComplemento sem empurrar\nOfereça complemento coerente (ex.: limpeza → hidratação/protetor) como opção, nunca como obrigação. “Não é obrigatório; é uma opção se você quiser completar a rotina.”\n\nPerguntas úteis\n- É para rosto, corpo, cabelo, perfume ou maquiagem?\n- Você já usa algo parecido? Teve reação?\n- Uso diário ou situação específica? Prefere textura leve?\n- Tem um orçamento que você quer respeitar?\n\nComo explicar para a cliente\n- “Pelo que você me contou, eu começaria por essa opção mais simples; vamos confirmar o modo de uso no rótulo.”\n- “Quer levar essa ou prefere que eu mostre uma alternativa mais em conta?”\n\nQuando chamar farmacêutico\n- Pedido de medicamento ou de “tratar” algo\n- Sinal de alerta, reação importante ou uso de medicamento\n- Dúvida de restrição (gestante/lactante/criança)",
    practicalExample:
      "Cliente: “Quero o melhor produto para acabar com minhas manchas, mas não quero gastar muito.”\nVocê: “Não consigo prometer acabar com manchas. Posso te ajudar com fotoproteção e aparência mais uniforme, respeitando seu orçamento. Vamos ver textura, com ou sem cor, e confirmar no rótulo. Se a mancha mudou, cresceu ou incomoda muito, o ideal é avaliação profissional.”",
    safePhrase:
      "Te ajudo a escolher pela sua necessidade e orçamento, com poucas opções. Não prometo resultado e confirmo no rótulo.",
    avoid:
      "Evite:\n- “Leva esse também que é obrigatório” / “sem esse não adianta”\n- “Esse é melhor porque é mais caro”\n- “Precisa do kit completo”\n- “Vai resolver mais rápido se levar tudo”",
    exercise: {
      prompt:
        "A cliente diz que “está caro”. Escreva uma resposta de venda consultiva que respeite o orçamento sem dizer que o barato é ruim.",
      expectedAnswer:
        "Acolher sem constranger, oferecer 2 opções dentro do orçamento, explicar a diferença prática entre elas e confirmar no rótulo, deixando a decisão com a cliente. Ex.: “Entendo. Vamos comparar duas opções dentro do seu orçamento e ver o que muda entre elas.”",
    },
  },
  {
    id: "treino-de-fala-objecoes",
    title: "Treino de fala (objeções comuns)",
    summary: "Frases prontas para preço, pressa e “quero o melhor”, sem perder segurança.",
    objective:
      "Manter o atendimento objetivo e acolhedor, reduzindo carga cognitiva e risco.",
    content:
      "Objeção: preço\n- “Vamos comparar opções dentro do seu orçamento. Eu te mostro poucas e você decide pelo rótulo e textura.”\n\nObjeção: pressa\n- “Vamos direto ao essencial: necessidade, área e segurança. Aí eu te mostro poucas opções.”\n\nObjeção: “quero o melhor”\n- “Não existe um melhor para todo mundo. Eu te ajudo a comparar duas ou três opções.”\n\nSempre que houver dúvida de restrição, uso de medicamento, gestação/lactação ou sinal de alerta: chamar o farmacêutico.",
    practicalExample:
      "Cliente: “Me dá o melhor protetor com cor.”\nVocê: “Eu te mostro duas opções com cor e a gente escolhe pela textura e pelo rótulo. Se tiver sensibilidade ou reação, eu chamo o farmacêutico.”",
    safePhrase: "Vamos escolher poucas opções e confirmar no rótulo antes de orientar.",
    avoid: "Evite: “Esse é o melhor e pronto”, “É caro porque é melhor”, “Em X dias melhora”.",
    exercise: {
      prompt: "Reescreva a frase “esse vai resolver seu problema” em uma versão segura de balcão.",
      expectedAnswer: "Posso te ajudar a comparar opções cosméticas. Confirmar no rótulo antes de orientar.",
    },
  },
];
