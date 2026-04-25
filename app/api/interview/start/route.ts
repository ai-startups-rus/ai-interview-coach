import { NextResponse } from 'next/server';
import { generateQuestions } from '@/lib/ai/service';

export async function POST(req: Request) {
  try {
    const { job, resume } = await req.json();
    if (!job || !resume) return NextResponse.json({ error: 'job and resume are required' }, { status: 400 });
    const questions = await generateQuestions(job, resume);
    return NextResponse.json({ interviewId: crypto.randomUUID(), questions });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
