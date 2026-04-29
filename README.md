# Pokemon Champions VP Planner

Paste a Pokemon Champions / Showdown-style team and get a practical VP plan:

- estimated total VP cost
- per-Pokemon cost breakdown
- missing VP based on current budget
- daily completion estimate
- upgrade priority order
- copyable share report

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

1. paste real teams,
2. edit current VP,
3. copy/share the generated report,
4. ask for owned Pokemon box support,
5. ask for cheaper alternatives or better cost data.
