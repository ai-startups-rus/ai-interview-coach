export function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold text-slate-200">{label}</span>
      <textarea
        className="h-56 w-full rounded-2xl border border-white/10 bg-white p-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/30"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
