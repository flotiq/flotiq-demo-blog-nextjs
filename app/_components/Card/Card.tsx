import { cn } from '@/app/_lib/utils';
import { helpers } from '@/flotiq-api-client';
import { BlogpostHydratedTwice } from '@flotiq/flotiq-api-sdk';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { Author } from '../Author/Author';

type CardProps = BlogpostHydratedTwice & {
  readonly lang: string;
  size?: 'default' | 'large';
};

export async function Card({
  title,
  slug,
  headerImage,
  category,
  author,
  lead,
  read_time,
  internal,
  lang,
  size = 'default',
}: CardProps) {
  const dict = await getDictionary(lang);

  const blogCategory = category?.[0];
  const blogAuthor = author?.[0];
  const publishAt = internal.publishedAt;

  return (
    <Link href={`/${lang}/blogpost/${slug}`}>
      <div
        className={cn(
          'h-full bg-white cursor-pointer flex flex-col gap-4 group overflow-hidden rounded-lg',
          size === 'default' && 'shadow-lg p-6',
        )}
      >
        <div className="aspect-feature-blog relative overflow-hidden rounded-lg shrink-0">
          <Image
            src={helpers.getMediaUrl(headerImage, {
              width: 1600,
              type: 'image',
              omitFileName: false,
            })}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {blogCategory && (
          <Badge variant={blogCategory.color}>{blogCategory.name}</Badge>
        )}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex flex-col h-full gap-4">
          <p
            className={cn(
              'text-gray-500 line-clamp-3',
              size === 'large' ? 'text-lg order-last' : '',
            )}
          >
            {lead}
          </p>
          <Author
            {...blogAuthor}
            publishAt={publishAt}
            readTime={read_time}
            lang={lang}
          />
        </div>
        <div className="flex items-center gap-1 text-blue-800 group-hover:underline">
          {dict.blog.readMore}
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
