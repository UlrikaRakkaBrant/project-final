// frontend/src/lib/retry.js
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function withRetry(task, { retries = 1, delay = 1000, backoff = 1.5 } = {}) {
  let attempt = 0;
  let lastErr;
  while (attempt <= retries) {
    try {
      return await task();
    } catch (err) {
      lastErr = err;
      const status = err?.response?.status;
      const transient =
        !status || status >= 500 || status === 429 || err.code === 'ECONNABORTED' || err.message?.includes('Network Error');

      if (!transient || attempt === retries) throw err;

      const wait = Math.round(delay * Math.pow(backoff, attempt));
      await sleep(wait);
      attempt++;
    }
  }
  throw lastErr;
}
