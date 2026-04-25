import { NextResponse } from 'next/server';
import { generateFinalReport } from '@/lib/ai/service';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const report = await generateFinalReport(payload);
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
