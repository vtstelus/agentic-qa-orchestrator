export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, backoffMs = 1000): Promise<T> {
  let lastError: Error;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try { return await fn(); }
    catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) await new Promise(r => setTimeout(r, backoffMs * 2 ** attempt));
    }
  }
  throw lastError!;
}
