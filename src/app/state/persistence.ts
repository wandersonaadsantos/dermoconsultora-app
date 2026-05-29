const PREFIX = "dc:v1:";

function keyFor(key: string) {
  return `${PREFIX}${key}`;
}

export function setStoredJson(key: string, value: unknown) {
  localStorage.setItem(keyFor(key), JSON.stringify(value));
}

export function getStoredJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(keyFor(key));
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function removeStored(key: string) {
  localStorage.removeItem(keyFor(key));
}

