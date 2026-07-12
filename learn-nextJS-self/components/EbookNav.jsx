'use client';

import { useEffect, useState } from 'react';

export default function EbookNav({ chapters }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const syncHash = () => {
      setActiveId(window.location.hash.replace('#', '') || chapters[0]?.id || '');
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [chapters]);

  const getLinkClassName = (id, baseClassName = '') => {
    const classNames = [baseClassName];
    if (activeId === id) classNames.push('is-active');
    return classNames.filter(Boolean).join(' ');
  };

  return (
    <nav aria-label="Book chapters">
      {chapters.map((chapter) => (
        <div className="ebook-nav-chapter" key={chapter.id}>
          <a
            href={`#${chapter.id}`}
            className={getLinkClassName(chapter.id, 'ebook-nav-chapter-link')}
            onClick={() => setActiveId(chapter.id)}
          >
            {chapter.title}
          </a>
          {chapter.sections.length > 0 && (
            <ul>
              {chapter.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={getLinkClassName(section.id)}
                    onClick={() => setActiveId(section.id)}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
