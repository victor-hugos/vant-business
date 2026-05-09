import crypto from 'node:crypto';

const COOKIE_NAME = 'vant_admin';
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const DEFAULT_ADMIN_EMAIL = 'admin@vant.business';
const DEFAULT_ADMIN_PASSWORD = 'qwe123';
const DEFAULT_ADMIN_SECRET = 'vant-admin-default-secret';

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || process.env.ADMIN_ACCESS_CODE || DEFAULT_ADMIN_SECRET;
}

function sign(value) {
  const secret = getSecret();
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header
      .split(';')
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf('=');
        if (index === -1) return [cookie, ''];
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      })
  );
}

export function createAdminToken() {
  const email = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD || process.env.ADMIN_ACCESS_CODE || DEFAULT_ADMIN_PASSWORD;
  return sign(`admin:${email}:${password}`);
}

function safeEqual(left = '', right = '') {
  const leftHash = crypto.createHash('sha256').update(left).digest();
  const rightHash = crypto.createHash('sha256').update(right).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

export function verifyAdminCredentials(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_ACCESS_CODE || DEFAULT_ADMIN_PASSWORD;

  return (
    String(email || '').trim().toLowerCase() === expectedEmail.trim().toLowerCase() &&
    safeEqual(String(password || ''), expectedPassword)
  );
}

export function isAdminRequest(req) {
  const expected = createAdminToken();
  const cookies = parseCookies(req.headers.cookie || '');
  return cookies[COOKIE_NAME] === expected;
}

export function setAdminCookie(res) {
  const token = createAdminToken();
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${MAX_AGE_SECONDS}${secure}`);
}

export function clearAdminCookie(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}`);
}
