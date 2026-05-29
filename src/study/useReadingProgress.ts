import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const READING_PROGRESS_STORAGE_KEY = "dermoconsultora:study:read-modules";

function parseStoredModuleIds(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const ids = parsed.map((v) => String(v)).filter(Boolean);
    return Array.from(new Set(ids));
  } catch {
    return [];
  }
}

function loadStoredModuleIds(): string[] {
  try {
    return parseStoredModuleIds(localStorage.getItem(READING_PROGRESS_STORAGE_KEY));
  } catch {
    return [];
  }
}

function saveStoredModuleIds(ids: string[]) {
  try {
    localStorage.setItem(READING_PROGRESS_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    return;
  }
}

export function useReadingProgress() {
  const [readModuleIds, setReadModuleIds] = useState<string[]>(() => loadStoredModuleIds());
  const storageTouchedRef = useRef(false);

  useEffect(() => {
    if (!storageTouchedRef.current) {
      try {
        storageTouchedRef.current = localStorage.getItem(READING_PROGRESS_STORAGE_KEY) != null;
      } catch {
        storageTouchedRef.current = false;
      }
    }

    if (readModuleIds.length === 0 && !storageTouchedRef.current) return;
    saveStoredModuleIds(readModuleIds);
    storageTouchedRef.current = true;
  }, [readModuleIds]);

  const readSet = useMemo(() => new Set(readModuleIds), [readModuleIds]);

  const isRead = useCallback((moduleId: string) => readSet.has(moduleId), [readSet]);

  const markAsRead = useCallback((moduleId: string) => {
    setReadModuleIds((prev) => {
      if (prev.includes(moduleId)) return prev;
      return [...prev, moduleId];
    });
  }, []);

  const unmarkAsRead = useCallback((moduleId: string) => {
    setReadModuleIds((prev) => prev.filter((id) => id !== moduleId));
  }, []);

  return { readModuleIds, isRead, markAsRead, unmarkAsRead };
}
