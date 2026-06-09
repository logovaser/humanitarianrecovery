export function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allowed = getAdminEmails();
  return allowed.includes(email.trim().toLowerCase());
}

export function verifyAdminPassword(password: string) {
  const plain = process.env.ADMIN_PASSWORD;
  if (!plain) return false;
  return password === plain;
}
