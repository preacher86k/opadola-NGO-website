const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "opadola-admin-secret";

export interface AdminPayload {
  id: string;
  email: string;
  role: string;
}

export async function createToken(admin: AdminPayload): Promise<string> {
  const payload = JSON.stringify({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const encoded = btoa(payload);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${encoded}.${signatureHex}`;
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signatureHex] = parts;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBytes = signatureHex.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || [];
    const signature = new Uint8Array(signatureBytes);

    const valid = await crypto.subtle.verify("HMAC", key, signature, new TextEncoder().encode(encoded));
    if (!valid) return null;

    const payload = JSON.parse(atob(encoded));
    if (payload.exp && Date.now() > payload.exp) return null;

    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
