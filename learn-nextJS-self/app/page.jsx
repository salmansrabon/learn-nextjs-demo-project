import fs from 'fs';
import path from 'path';
import EbookNav from '@/components/EbookNav';

function decodeText(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .trim();
}

function slugify(value, fallback) {
  const slug = decodeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || fallback;
}

function encodeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Book snippets come from three roots: the sibling demo-project (default, used
// by chapters 1-3), this project itself (chapter 4's lesson code), and the
// sibling user-demo-site (chapter 4's "finished app" section).
const SOURCE_ROOTS = {
  'demo-project': path.resolve(process.cwd(), '..', 'demo-project'),
  self: process.cwd(),
  'user-demo-site': path.resolve(process.cwd(), '..', 'user-demo-site'),
};

function renderDemoSource(files, root) {
  const sourceRoot = SOURCE_ROOTS[root];

  if (!sourceRoot) {
    throw new Error(`Unknown demo-source root: ${root}`);
  }

  const sourceRootWithSeparator = `${sourceRoot}${path.sep}`;

  const code = files
    .split(',')
    .map((file) => file.trim())
    .filter(Boolean)
    .map((file) => {
      const filePath = path.resolve(sourceRoot, file);

      if (!filePath.startsWith(sourceRootWithSeparator)) {
        throw new Error(`Invalid ${root} source path: ${file}`);
      }

      const source = fs.readFileSync(filePath, 'utf-8').trimEnd();
      return encodeHtml(`// ${file}\n${source}`);
    })
    .join('\n\n');

  return `<pre><code>${code}</code></pre>`;
}

// Accepts <demo-source data-files="a,b"> (reads demo-project) and the explicit
// <demo-source data-root="self|user-demo-site" data-files="a,b"> form.
function expandDemoSources(content) {
  return content.replace(
    /<demo-source(?:\s+data-root="([^"]*)")?\s+data-files="([^"]+)"\s*><\/demo-source>/gi,
    (match, root, files) => renderDemoSource(files, root || 'demo-project')
  );
}

function readBook() {
  const bookPath = path.join(process.cwd(), 'book.html');
  const html = fs.readFileSync(bookPath, 'utf-8');
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const withoutToc = body.replace(/<!-- ============ TOC ============ -->[\s\S]*?<\/div>\s*/i, '');
  const bookContent = expandDemoSources(withoutToc);

  const headings = [];
  const usedIds = new Map();

  const content = bookContent.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (match, level, title) => {
    const baseId = slugify(title, `section-${headings.length + 1}`);
    const count = usedIds.get(baseId) || 0;
    const id = count ? `${baseId}-${count + 1}` : baseId;
    usedIds.set(baseId, count + 1);

    headings.push({
      id,
      level: Number(level),
      title: decodeText(title),
    });

    return `<h${level} id="${id}">${title}</h${level}>`;
  });

  const chapters = [];
  let currentChapter = null;

  headings.forEach((heading) => {
    if (heading.level === 2) {
      currentChapter = { ...heading, sections: [] };
      chapters.push(currentChapter);
      return;
    }

    if (heading.level === 3 && currentChapter) {
      currentChapter.sections.push(heading);
    }
  });

  return { chapters, content };
}

export default function HomePage() {
  const { chapters, content } = readBook();

  return (
    <div className="ebook-shell">
      <aside className="ebook-sidebar">
        <div className="ebook-sidebar-header">
          <div className="ebook-kicker">Live Ebook</div>
          <h1>Demo Project</h1>
        </div>
        <EbookNav chapters={chapters} />
      </aside>

      <main className="ebook-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
