import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { computeStreak, todayKey } from "./gamification";

export const READING_PROGRESS_STORAGE_KEY = "dermoconsultora:study:read-modules";
export const STUDY_DATES_STORAGE_KEY = "dermoconsultora:study:active-dates";

function parseStoredStringArray(raw: string | null): string[] {
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

function loadStored(key: string): string[] {
  try {
    return parseStoredStringArray(localStorage.getItem(key));
  } catch {
    return [];
  }
}

function saveStored(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    return;
  }
}

export function useReadingProgress() {
  const [readModuleIds, setReadModuleIds] = useState<string[]>(() => loadStored(READING_PROGRESS_STORAGE_KEY));
  const [activeDates, setActiveDates] = useState<string[]>(() => loadStored(STUDY_DATES_STORAGE_KEY));
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
    saveStored(READING_PROGRESS_STORAGE_KEY, readModuleIds);
    storageTouchedRef.current = true;
  }, [readModuleIds]);

  useEffect(() => {
    if (activeDates.length === 0) return;
    saveStored(STUDY_DATES_STORAGE_KEY, activeDates);
  }, [activeDates]);

  const readSet = useMemo(() => new Set(readModuleIds), [readModuleIds]);

  const isRead = useCallback((moduleId: string) => readSet.has(moduleId), [readSet]);

  const recordStudyToday = useCallback(() => {
    const t = todayKey();
    setActiveDates((prev) => (prev.includes(t) ? prev : [...prev, t]));
  }, []);

  const markAsRead = useCallback(
    (moduleId: string) => {
      setReadModuleIds((prev) => (prev.includes(moduleId) ? prev : [...prev, moduleId]));
      recordStudyToday();
    },
    [recordStudyToday]
  );

  const unmarkAsRead = useCallback((moduleId: string) => {
    setReadModuleIds((prev) => prev.filter((id) => id !== moduleId));
  }, []);

  const streak = useMemo(() => computeStreak(activeDates, todayKey()), [activeDates]);

  return { readModuleIds, readSet, isRead, markAsRead, unmarkAsRead, recordStudyToday, streak };
}
