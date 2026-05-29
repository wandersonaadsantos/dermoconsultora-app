export function copyText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return Promise.reject(new Error("empty"));
  const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
  if (clipboard?.writeText) return clipboard.writeText(trimmed);
  const el = document.createElement("textarea");
  el.value = trimmed;
  el.setAttribute("readonly", "true");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}
