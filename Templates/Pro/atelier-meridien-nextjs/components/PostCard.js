import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PostCard({ post, delay }) {
  const image = post.coverImage ? urlFor(post.coverImage).width(700).height(460).fit('crop').url() : null;

  return (
    <Link href={`/actualites/${post.slug}`} className="post-card frame" data-reveal data-reveal-delay={delay}>
      <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
      <div className="post-card__img">
        {image ? (
          <Image src={image} alt="" fill sizes="(max-width: 780px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        ) : (
          <span className="post-card__mono">A</span>
        )}
      </div>
      <div className="post-card__body">
        <p className="post-card__date">{formatDate(post.publishedAt)}</p>
        <p className="post-card__title">{post.title}</p>
        {post.excerpt && <p className="post-card__excerpt">{post.excerpt}</p>}
      </div>
    </Link>
  );
}
