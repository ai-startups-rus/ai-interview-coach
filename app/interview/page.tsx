'use client';

import { useEffect, useState } from 'react';

type Question = { id: string; question: string; type: string; expectedSignals: string[] };

export default function InterviewPage() {
  const [job, setJob] = useState('');
  const [resume, setResume] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const j = localStorage.getItem('job') || '';
    const r = localStorage.getItem('resume') || '';
    setJob(j); setResume(r);
    fetch('/api/interview/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job: j, resume: r }) })
      .then((r) => r.json()).then((data) => setQuestions(data.questions || []));
  }, []);

  async function submitAnswer() {
    const current = questions[index];
    setLoading(true);
    const res = await fetch('/api/interview/answer', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job, question: current.question, answer }),
    });
    const evaluation = await res.json();
    setEvaluations((prev) => [...prev, { question: current.question, answer, evaluation }]);
    setAnswer('');
    setIndex((i) => i + 1);
    setLoading(false);
  }

  async function finalize() {
    const res = await fetch('/api/interview/finalize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job, resume, evaluations }) });
    const report = await res.json();
    localStorage.setItem('report', JSON.stringify(report));
    window.location.href = '/report';
  }

  const current = questions[index];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">Interview room</h1>
      {!current ? (
        <div className="mt-8 rounded-2xl bg-white/5 p-6">
          <p>{questions.length ? 'Interview complete.' : 'Preparing questions...'}</p>
          {questions.length > 0 && <button onClick={finalize} className="mt-4 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">Generate final report</button>}
        </div>
      ) : (
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-blue-200">Question {index + 1} · {current.type}</p>
          <h2 className="mt-3 text-2xl font-semibold">{current.question}</h2>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-6 h-44 w-full rounded-2xl bg-white p-4" placeholder="Type your answer..." />
          <button onClick={submitAnswer} disabled={loading || !answer} className="mt-4 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">Submit answer</button>
        </section>
      )}
      <div className="mt-8 space-y-4">
        {evaluations.map((item, i) => <pre key={i} className="overflow-auto rounded-2xl bg-black/40 p-4 text-sm">{JSON.stringify(item, null, 2)}</pre>)}
      </div>
    </main>
  );
}
