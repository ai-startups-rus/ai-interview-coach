'use client';

import { useState } from 'react';
import { TextAreaField } from '@/components/TextAreaField';

export default function DashboardPage() {
  const [job, setJob] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runMatch() {
    setLoading(true);
    const res = await fetch('/api/match-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job, resume }),
    });
    setResult(await res.json());
    setLoading(false);
  }

  async function startInterview() {
    localStorage.setItem('job', job);
    localStorage.setItem('resume', resume);
    window.location.href = '/interview';
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Candidate setup</h1>
      <p className="mt-2 text-slate-300">Paste a job description and resume to calculate fit and start interview training.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <TextAreaField label="Job description" value={job} onChange={setJob} placeholder="Paste job description..." />
        <TextAreaField label="Resume" value={resume} onChange={setResume} placeholder="Paste resume..." />
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={runMatch} className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950" disabled={loading}>Calculate match</button>
        <button onClick={startInterview} className="rounded-2xl border border-white/20 px-5 py-3 font-semibold">Start interview</button>
      </div>
      {result && <pre className="mt-8 overflow-auto rounded-2xl bg-black/40 p-5 text-sm">{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
