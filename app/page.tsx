import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-200">AI Interview Coach</p>
          <h1 className="text-5xl font-bold leading-tight">Train for interviews with role-specific AI simulation.</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Upload a job description and resume, get a match score, complete an adaptive mock interview, and receive a readiness report.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard" className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950">Start MVP</Link>
            <Link href="/report" className="rounded-2xl border border-white/20 px-6 py-3 font-semibold">View report demo</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
