"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchTrigger } from "./command";

const links = [
  { href: "/atlas", label: "Atlas" },
  { href: "/signals", label: "Signals" },
  { href: "/prepare", label: "Prepare" },
  { href: "/method", label: "Method" },
];

export function Nav({ count }: { count: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
        <nav className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-hairline bg-black/55 p-1.5 pl-4 backdrop-blur-2xl">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal-critical opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal-critical" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-ink-100">
              Tripwire
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    active ? "text-ink-100" : "text-ink-500 hover:text-ink-300"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-hairline"
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    />
                  ) : null}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700 lg:block">
              {count} tracked
            </span>
            <SearchTrigger className="hidden sm:inline-flex" />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="relative flex size-8 items-center justify-center rounded-full border border-hairline text-ink-300 transition-colors duration-500 hover:border-hairline-strong md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-center gap-2 bg-black/80 px-6 backdrop-blur-3xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-col gap-1">
              {[...links, { href: "/", label: "Overview" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-hairline py-5 text-3xl font-light tracking-tight text-ink-100"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {count} failure modes · every one has a precaution
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}