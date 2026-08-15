import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

const ART_CLASSES = ['art-1', 'art-2', 'art-3', 'art-4', 'art-5', 'art-6'];

export function artClassFor(seed) {
  const n = typeof seed === 'number' ? seed : (seed ? seed.length : 0);
  return ART_CLASSES[n % ART_CLASSES.length];
}

export default function ProjectCard({ project, index = 0, delay }) {
  const artClass = artClassFor(index);
  const image = project.coverImage ? urlFor(project.coverImage).width(600).height(450).fit('crop').url() : null;

  return (
    <Link href={`/projets/${project.slug}`} className="project-card frame" data-reveal data-reveal-delay={delay}>
      <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
      <div className={`project-card__art ${artClass}`}>
        {image ? (
          <Image src={image} alt="" fill sizes="(max-width: 780px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        ) : (
          <>
            <span className="project-card__plate">{project.plateNumber || ''}</span>
            <span className="project-card__mono">M</span>
          </>
        )}
      </div>
      <div className="project-card__meta">
        <div>
          <p className="project-card__title">{project.title}</p>
          <p className="project-card__tag">{project.tag}</p>
        </div>
        <p className="project-card__loc">{project.location}<br />{project.year}</p>
      </div>
    </Link>
  );
}
