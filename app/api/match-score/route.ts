import { NextResponse } from 'next/server';
import { getMatchScore } from '@/lib/ai/service';

export async function POST(req: Request) {
  try {
    const { job, resume } = await req.json();
    if (!job || !resume) return NextResponse.json({ error: 'job and resume are required' }, { status: 400 });
    const data = await getMatchScore(job, resume);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
