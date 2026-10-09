"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "tripwire.plan.v1";
const EVENT = "tripwire:plan";

export const planKey = (riskSlug: string, title: string) => `${riskSlug}::${title}`;

type Plan = Record<string, true>;

let cache: Plan | null = null;
const listeners = new Set<() => void>();

function read(): Plan {
  if (cache) return cache;
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Plan) : {};
  } catch {
    cache = {};
  }
  return cache ?? {};
}

function write(next: Plan) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode — keep the in-memory cache */
  }
  listeners.forEach((l) => l());
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

const serverSnapshot: Plan = {};
const getSnapshot = () => read();
const getServerSnapshot = () => serverSnapshot;

/** Client-side preparedness plan. Local only — never leaves the browser. */
export function usePlan() {
  const plan = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((key: string) => {
    const current = read();
    const next = { ...current };
    if (next[key]) delete next[key];
    else next[key] = true;
    write(next);
  }, []);

  const reset = useCallback(() => write({}), []);

  const isDone = useCallback((key: string) => Boolean(plan[key]), [plan]);

  return { plan, toggle, reset, isDone, count: Object.keys(plan).length };
}