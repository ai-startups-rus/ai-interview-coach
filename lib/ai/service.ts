import { openai } from './openai';
import { safeJsonParse } from './json';
import { evaluationPrompt, finalReportPrompt, matchScorePrompt, questionPrompt } from './prompts';
import type { AnswerEvaluation, InterviewQuestion, MatchScore } from '@/types';

async function completeJson<T>(prompt: string): Promise<T> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Empty AI response');
  return safeJsonParse<T>(content);
}

export async function getMatchScore(job: string, resume: string) {
  return completeJson<MatchScore>(matchScorePrompt(job, resume));
}

export async function generateQuestions(job: string, resume: string) {
  return completeJson<InterviewQuestion[]>(questionPrompt(job, resume));
}

export async function evaluateAnswer(job: string, question: string, answer: string) {
  return completeJson<AnswerEvaluation>(evaluationPrompt(job, question, answer));
}

export async function generateFinalReport(payload: unknown) {
  return completeJson(finalReportPrompt(payload));
}
