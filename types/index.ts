export type MatchScore = {
  fitScore: number;
  strengths: string[];
  gaps: string[];
  risks: string[];
  recommendation: string;
};

export type InterviewQuestion = {
  id: string;
  type: 'behavioral' | 'technical' | 'situational' | 'hr';
  question: string;
  expectedSignals: string[];
};

export type AnswerEvaluation = {
  score: number;
  structureScore: number;
  evidenceScore: number;
  relevanceScore: number;
  feedback: string;
  improvedAnswer: string;
  followUpQuestion?: string;
};
