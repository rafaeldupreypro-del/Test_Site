/* =========================================================================
   Utilitaires partagés par les routes /api/contact et /api/newsletter.
   Portage direct de l'ancien api/_utils.js (fonctions Vercel classiques)
   vers les Route Handlers Next.js (Request/Response Web standard).
   ========================================================================= */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanString(v, maxLen = 2000) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, maxLen);
}

export function isValidEmail(v) {
  return typeof v === 'string' && EMAIL_RE.test(v.trim());
}

export function corsHeaders() {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/* -------------------------------------------------------------------------
   Limitation de débit — best effort seulement (même limite que l'ancienne
   version Vercel : les instances serverless ne partagent pas de mémoire
   garantie. Pour une protection fiable, brancher Upstash Redis / Vercel KV).
   ------------------------------------------------------------------------- */
const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 10;

export function isRateLimited(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}
