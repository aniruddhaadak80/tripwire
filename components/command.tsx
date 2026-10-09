"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { search, type SearchDoc } from "@/lib/search";
import { getDomain } from "@/data/domains";

interface CommandCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

const Ctx = createContext<CommandCtx>({ open: false, setOpen: () => {}, toggle: () => {} });

export const useCommand = () => useContext(Ctx);

export function CommandProvider({
  docs,
  children,
}: {
  docs: SearchDoc[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = useCallback(() => {
    setQuery("");
    setCursor(0);
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return docs.slice(0, 7);
    return search(docs, query, 9);
  }, [docs, query]);

  const go = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/risk/${slug}`);
    },
    [router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor].slug);
    }
  };

  return (
    <Ctx.Provider value={{ open, setOpen, toggle }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 flex items-start justify-center px-4 pt-[12vh] backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="plate w-full max-w-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="plate-core">
                <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
                  <Search className="size-4 shrink-0 text-ink-700" strokeWidth={1.5} />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setCursor(0);
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={`Search ${docs.length} failure modes, signals, precautions…`}
                    className="w-full bg-transparent text-[15px] text-ink-100 placeholder:text-ink-700 focus:outline-none"
                  />
                  <kbd className="hidden rounded-md border border-hairline px-2 py-1 font-mono text-[10px] text-ink-700 sm:block">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-[52vh] overflow-y-auto px-2 py-2">
                  <p className="px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700">
                    {query ? `${results.length} match${results.length === 1 ? "" : "es"}` : "Start here"}
                  </p>
                  {results.length === 0 ? (
                    <p className="px-3 py-8 text-center text-sm text-ink-500">
                      Nothing matches “{query}”. Try a domain name, an indicator, or a mitigation.
                    </p>
                  ) : (
                    results.map((doc, i) => {
                      const domain = getDomain(doc.domain);
                      const active = i === cursor;
                      return (
                        <button
                          key={doc.slug}
                          onMouseEnter={() => setCursor(i)}
                          onClick={() => go(doc.slug)}
                          className={`group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            active ? "bg-white/[0.055]" : "hover:bg-white/[0.03]"
                          }`}
                        >
                          <span
                            className="mt-1.5 size-2 shrink-0 rounded-full"
                            style={{ background: domain.accent, boxShadow: `0 0 10px ${domain.accent}` }}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] text-ink-100">{doc.title}</span>
                            <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                              {domain.name} · {doc.tag}
                            </span>
                          </span>
                          {active ? (
                            <CornerDownLeft className="mt-1 size-3.5 shrink-0 text-ink-500" strokeWidth={1.5} />
                          ) : null}
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
                  <span>↑↓ navigate · ⏎ open</span>
                  <a
                    href="/method"
                    onClick={() => setOpen(false)}
                    className="group inline-flex items-center gap-1 transition-colors duration-500 hover:text-ink-300"
                  >
                    how scoring works
                    <ArrowUpRight className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  const { toggle } = useCommand();
  return (
    <button
      onClick={toggle}
      className={`group inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] py-1.5 pl-3 pr-1.5 text-ink-500 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-300 ${className ?? ""}`}
    >
      <Search className="size-3.5" strokeWidth={1.5} />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Search</span>
      <span className="ml-1 rounded-full border border-hairline px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-ink-700 transition-colors duration-500 group-hover:text-ink-500">
        ⌘K
      </span>
    </button>
  );
}