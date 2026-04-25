export function safeJsonParse<T>(value: string): T {
  const cleaned = value.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned) as T;
}
