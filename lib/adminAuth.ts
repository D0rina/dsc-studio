export const ADMIN_COOKIE = "nz_admin_token";

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return sha256Hex(password);
}
