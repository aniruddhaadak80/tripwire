# Tripwire

**An atlas of everything that could go wrong** — with the warning signs, the precautions, and the
mitigations that are actually working.

Tripwire tracks failure modes across ten domains (machine intelligence, climate, biology, nuclear,
cyber, finance, information, infrastructure, space, personal exposure). Every entry carries the
same four things:

| | |
|---|---|
| **Warning signs** | Measurable indicators with current readings, cadence and history — not vibes |
| **Precautions** | Split by who has to act: you, your organisation, or policy |
| **Advancements** | Mitigations scored honestly, including the ones that stalled |
| **Scoring** | Exposure and action priority, defined and reproducible |

Built as a public-good reference: no accounts, no tracking, no paywall. The preparedness plan
runs entirely in your browser.

## Features

- **The atlas** — every entry, filterable by domain, band and free text, sortable by exposure or
  action priority (`/atlas`)
- **Signals board** — all warning indicators ordered by how loud they are, with sparkline history
  (`/signals`)
- **Preparedness** — every individual-level precaution pulled into one checklist with a readiness
  score, cadence-aware grouping and Markdown export (`/prepare`)
- **Deep dives** — radar profile, warning signs, precautions by audience, mitigation maturity,
  timeline, connected risks and primary sources (`/risk/[slug]`)
- **⌘K command palette** — search across risks, indicators, precautions and mitigations
- **Method page** — the full scoring model, editorial rules and stated limits (`/method`)

## Stack

Next.js 16 (App Router, static generation) · React 19 · TypeScript strict · Tailwind CSS v4 ·
Motion · lucide-react. No backend, no database, no API keys.

## Getting started

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # production build
bun run lint
```

## Data model

Everything lives in `data/risks/*.ts`, typed by `lib/types.ts`:

```ts
interface Risk {
  slug: string;
  domain: DomainId;
  likelihood: number;   // 0–100, chance it bites within ~10 years
  severity: number;     // 0–100, worst-case damage
  speed: number;        // 0–100, how fast it hits once triggered
  defence: number;      // 0–100, how well we are doing (higher = better)
  signals: Signal[];         // measurable early warnings
  precautions: Precaution[]; // you / org / policy
  advancements: Advancement[]; // honest mitigation status
  timeline: TimelineEvent[];
  sources: Source[];
}
```

Adding a risk is one object in one domain file. `data/index.ts` aggregates them, the atlas board
filters them, the signals board flattens them, and `/prepare` picks up every `audience: "you"`
precaution automatically.

### Scoring

```
exposure        = likelihood × (0.62 + 0.38 × severity) × speed bump
action priority = exposure × (1 − 0.7 × defence)
```

Exposure alone buries risks that are already well defended. Action priority surfaces the
dangerous-and-ignored, which is the list worth working through.

## Contributing

Content corrections are the most valuable contributions — especially a better indicator, a more
honest status on a mitigation, or a source that actually supports a claim. Keep the editorial
rules in `/method`: no invented precision, no hidden bad news, every claim links out.

## License

MIT