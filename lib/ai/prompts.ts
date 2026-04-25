export const matchScorePrompt = (job: string, resume: string) => `
You are a strict hiring manager and career analyst.
Analyze candidate-job fit.

Return ONLY valid JSON:
{
  "fitScore": number 0-100,
  "strengths": string[],
  "gaps": string[],
  "risks": string[],
  "recommendation": string
}

Job description:
${job}

Resume:
${resume}
`;

export const questionPrompt = (job: string, resume: string) => `
You are a senior interviewer.
Create 10 interview questions adapted to this job and resume.

Return ONLY valid JSON array:
[
  {
    "id": "q1",
    "type": "behavioral|technical|situational|hr",
    "question": "...",
    "expectedSignals": ["..."]
  }
]

Job:
${job}

Resume:
${resume}
`;

export const evaluationPrompt = (job: string, question: string, answer: string) => `
You are a strict interview evaluator.
Evaluate the answer using STAR, evidence, relevance and clarity.

Return ONLY valid JSON:
{
  "score": number 1-10,
  "structureScore": number 1-10,
  "evidenceScore": number 1-10,
  "relevanceScore": number 1-10,
  "feedback": "specific concise feedback",
  "improvedAnswer": "improved answer using STAR",
  "followUpQuestion": "optional follow-up question"
}

Job:
${job}

Question:
${question}

Candidate answer:
${answer}
`;

export const finalReportPrompt = (payload: unknown) => `
You are a career coach preparing an investor-grade product report.
Create a final interview readiness report.

Return ONLY valid JSON:
{
  "readinessScore": number 0-100,
  "summary": "...",
  "topStrengths": string[],
  "criticalGaps": string[],
  "trainingPlan": string[],
  "nextBestActions": string[]
}

Interview data:
${JSON.stringify(payload, null, 2)}
`;
