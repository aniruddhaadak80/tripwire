# Contributing to Tripwire

Thanks for helping make the atlas sharper. Content corrections are the most valuable
contributions — a better indicator, a more honest status on a mitigation, or a source that
actually supports a claim.

## The rules that keep it honest

1. **Estimates, never predictions.** Scores are structured judgements from the cited sources.
2. **No invented precision.** Where a number is contested, write a range or use ≈ rather than a
   confident figure attached to a named institution.
3. **Optimism is recorded, not hidden.** Mitigations that stalled or regressed get the same
   prominence as the ones that scaled.
4. **Every claim links out.** Signals, advancements and entries point to primary sources.
5. **Personal means personal.** Anything in the individual column must be actionable by one person
   without a budget approval, an engineering team, or a policy change.

## Adding or correcting a risk

1. Fork the repo, create a branch.
2. Edit (or add) an entry in `data/risks/<domain>.ts`. Match the `Risk` interface in
   `lib/types.ts` exactly — every required field, no extra fields.
3. Run the gates:

   ```bash
   bun run validate    # integrity: links, ranges, thin entries
   bun run typecheck
   bun run lint
   ```

4. Open a PR with: **what changed**, **why**, and **how to test**.

## Proposing a new risk

Use the **new risk proposal** issue template. A proposal needs:

- A one-sentence failure mode a stranger understands
- At least three measurable warning signs with real sources
- Precautions for at least two audiences (you / org / policy)
- At least two mitigations with honest status
- A timeline of at least three dated events

## Fixing a score

Scores are editorial, not computed. If you think an entry is mis-scored, open a **content
correction** issue with the evidence and the number you'd defend. The method page explains how
each axis is defined.

## Code changes

- TypeScript strict, ESM, bun.
- Client boundaries get slim projections from `lib/views.ts` — never serialize a whole `Risk` into
  the RSC payload.
- Animations: transform + opacity only, `cubic-bezier(0.32, 0.72, 0, 1)`, GPU-safe.
- Run `bun run validate && bun run typecheck && bun run lint` before pushing.

## Recognition

Contributors are listed in the release notes of each corpus revision. Substantive content
contributors are added to the README contributors section on request.
