export type Simulation = {
  id: string;
  title: string;
  summary: string;
  context: string;
  questionsToAsk: string[];
  safeResponse: string;
  whatNotToSay: string[];
  whenToRefer: string;
  closing: string;
};

