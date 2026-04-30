# Pokemon Champions VP Planner

Paste a Pokemon Champions / Showdown-style team and get a practical VP plan:

- estimated total VP cost
- per-Pokemon cost breakdown
- missing VP based on current budget
- daily completion estimate
- upgrade priority order
- 8 validation-ready sample teams for different player intents
- copyable share report
- URL share links that restore the same team, VP settings, owned Pokemon, and assumptions
- prefilled GitHub feedback issues for wrong or missing VP data
- category-specific VP data feedback links from each cost transparency row
- SEO-friendly explanation guide for first-time visitors

This MVP intentionally focuses on the Pokemon Champions-specific pain point: "Can I afford this team, and who should I build first?"

## Local development

```bash
npm install
npm run dev -- --port 5173
```

Open:

```text
http://127.0.0.1:5173
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Current MVP limitations

- Cost rules are estimates, not official complete data.
- Item pricing is not complete yet.
- No account system or saved teams yet.
- No full damage calculator; this is intentionally not competing as a generic calc.

## Next validation target

Share the app with Pokemon Champions / VGC players and check whether users:

1. load a sample team that matches their intent,
2. paste real teams,
3. edit current VP,
4. copy/share the generated report or URL,
5. report wrong VP data through the prefilled GitHub issue link,
6. ask for owned Pokemon box support,
7. ask for cheaper alternatives or better cost data.
