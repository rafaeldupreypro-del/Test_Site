'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

const FILTERS = [
  { value: 'all', label: 'Tous' },
  { value: 'residentiel', label: 'Résidentiel' },
  { value: 'culturel', label: 'Équipement culturel' },
  { value: 'bureaux', label: 'Bureaux' },
  { value: 'urbanisme', label: 'Urbanisme' },
];

function matchesFilter(project, filter) {
  if (filter === 'all') return true;
  if (filter === 'residentiel') return project.category === 'residentiel' || project.category === 'residentiel-collectif';
  return project.category === filter;
}

export default function ProjectFilterGrid({ projects }) {
  const [filter, setFilter] = useState('all');
  const visible = projects.filter((p) => matchesFilter(p, filter));

  return (
    <>
      <div className="filter-bar" data-reveal>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className="filter-btn"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-3" id="project-grid" style={{ marginTop: '2rem' }}>
        {visible.map((project, i) => (
          <div className="project-grid-item" key={project.slug} data-category={project.category} data-reveal data-reveal-delay={i % 3}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        {visible.length === 0 && (
          <p style={{ color: 'var(--ink-55)' }}>Aucun projet dans cette catégorie pour le moment.</p>
        )}
      </div>
    </>
  );
}
