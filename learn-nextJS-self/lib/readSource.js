import fs from 'fs';
import path from 'path';

// Reads one or more project-relative files and concatenates them with a
// filename header. Runs on the server only (Node fs) — called from Server
// Component page.jsx files so the code panel always shows the real,
// currently-saved source, never a hand-copied string that can drift.
export function readSource(...relativePaths) {
  return relativePaths
    .map((rel) => {
      const contents = fs.readFileSync(path.join(process.cwd(), rel), 'utf-8').trimEnd();
      return `// ${rel}\n${contents}`;
    })
    .join('\n\n');
}

export function readDemoSource(...relativePaths) {
  const demoProjectRoot = path.resolve(process.cwd(), '..', 'demo-project');

  return relativePaths
    .map((rel) => {
      const contents = fs.readFileSync(path.join(demoProjectRoot, rel), 'utf-8').trimEnd();
      return `// ${rel}\n${contents}`;
    })
    .join('\n\n');
}
