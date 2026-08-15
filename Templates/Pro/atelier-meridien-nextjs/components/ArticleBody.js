'use client';

import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <span className="article-prose__img frame" style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
          <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
          <Image
            src={urlFor(value).width(1200).height(750).fit('crop').url()}
            alt={value.alt || ''}
            width={1200}
            height={750}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </span>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target={value?.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function ArticleBody({ value }) {
  if (!value) return null;
  return (
    <div className="article-prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
