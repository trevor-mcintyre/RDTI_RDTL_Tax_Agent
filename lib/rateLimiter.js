let lastCalled = {};
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_CALLS_PER_IP = 10;

export default function rateLimiter(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const now = Date.now();
  if (!lastCalled[ip]) {
    lastCalled[ip] = [];
  }

  lastCalled[ip] = lastCalled[ip].filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  lastCalled[ip].push(now);

  if (lastCalled[ip].length > MAX_CALLS_PER_IP) {
    res.status(429).json({ error: 'Too many requests. Please slow down.' });
    return false;
  }

  return true;
}