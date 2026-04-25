'use client';

import { useEffect, useState } from 'react';

export default function ReportPage() {
  const [report, setReport] = useState<any>(null);
  useEffect(() => {
    const stored = localStorage.getItem('report');
    if (stored) setReport(JSON.parse(stored));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">Readiness report</h1>
      {report ? <pre className="mt-8 overflow-auto rounded-2xl bg-black/40 p-5 text-sm">{JSON.stringify(report, null, 2)}</pre> : <p className="mt-6 text-slate-300">No report yet. Complete an interview first.</p>}
    </main>
  );
}
