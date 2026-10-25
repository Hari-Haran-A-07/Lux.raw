export async function computeClientFingerprint(): Promise<string> {
  if (typeof window === "undefined") {
    return "server-runtime-fingerprint";
  }

  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset()
  ].join("|");

  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  return "fallback-entropy-" + Math.random().toString(36).substring(2, 10);
}
