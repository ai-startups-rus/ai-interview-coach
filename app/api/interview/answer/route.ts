import { NextResponse } from 'next/server';
import { evaluateAnswer } from '@/lib/ai/service';

export async function POST(req: Request) {
  try {
    const { job, question, answer } = await req.json();
    if (!job || !question || !answer) return NextResponse.json({ error: 'job, question and answer are required' }, { status: 400 });
    const evaluation = await evaluateAnswer(job, question, answer);
    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
