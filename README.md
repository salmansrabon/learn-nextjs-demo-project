# Learn Next.js

Two sibling Next.js (App Router) projects for learning React/Next.js fundamentals by building the same set of lessons twice.

## Projects

### `learn-nextJS-self/` — the tutorial
Start here. This is the guided, from-scratch learning path.

- **`book.html`** — a self-contained HTML book, opened directly in a browser. Explains Next.js App Router basics (page.jsx convention, folder-to-URL routing, dynamic `[id]` segments) and walks through every lesson step by step.
- A working Next.js app that mirrors the book's lessons. Every lesson page renders:
  - a **Theory** block — the explanation/rules/tables from the book, live on the page
  - a **CodePanel** — the lesson's actual source code, read live from disk
- Goal: read the theory, see the real code, see it run — all on one page — before moving to the plain version.

### `demo-project/` — the goal / reference implementation
The destination. A minimal, "answer key" version of the same lessons — just the working code, no theory or code-preview scaffolding. This is what you're building toward: clean components with nothing extra.

Both apps cover the same topics: creating/using/nesting components, JSX syntax, fragments, events, conditional rendering, rendering lists, and all core React hooks (`useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRouter`, `useParams`).

## How to run

Each project is independent — install and run separately.

```bash
# Tutorial (with theory + live code panels)
cd learn-nextJS-self
npm install
npm run dev
# → http://localhost:3000
```

```bash
# Reference implementation (clean, minimal)
cd demo-project
npm install
npm run dev
# → http://localhost:3000 (run one project at a time, or change the port)
```

Both use the same scripts: `npm run dev` (development), `npm run build` (production build), `npm start` (serve production build).

## Suggested workflow

1. Open `learn-nextJS-self/book.html` in a browser for the narrative walkthrough.
2. Run `learn-nextJS-self` and open a lesson route — read the Theory block, inspect the CodePanel.
3. Compare against the equivalent route in `demo-project` to see the same feature as plain, production-style code.
