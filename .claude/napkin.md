# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-05-18] Jest needs Watchman disabled in sandbox**
   Do instead: run `JEST_WATCHMAN=false npm test -- --watchAll=false --watchman=false`.
2. **[2026-05-18] Build validates TypeScript**
   Do instead: run `npm run build` after component or API typing changes.

## Shell & Command Reliability
1. **[2026-05-18] No repo-specific shell notes yet**
   Do instead: document repeatable command workarounds only after they prove useful.

## Domain Behavior Guardrails
1. **[2026-05-18] RapidAPI key may be absent**
   Do instead: keep local fallback exercise data and skip RapidAPI calls without `REACT_APP_RAPID_API_KEY`.
2. **[2026-05-18] Preserve gym discovery flow**
   Do instead: keep hero, search/filter, exercise cards, and exercise detail routes usable after redesigning.

## User Directives
1. **[2026-05-18] Spanish collaboration**
   Do instead: respond in Spanish unless the user switches language.
