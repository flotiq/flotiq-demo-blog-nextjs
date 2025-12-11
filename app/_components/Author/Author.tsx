import { cn } from '@/app/_lib/utils';
import { helpers } from '@/flotiq-api-client';
import { AuthorHydrated } from '@flotiq/flotiq-api-sdk';
import Image from 'next/image';

type AuthorProps = AuthorHydrated & {
  publishAt: string;
  readTime?: number;
  lang: string;
  size?: 'default' | 'large';
};

export function Author({
  size = 'default',
  name,
  avatar,
  publishAt,
  readTime,
  lang,
}: AuthorProps) {
  return (
    <div className="flex gap-3 items-center mt-auto">
      {avatar && (
        <Image
          src={helpers.getMediaUrl(avatar, {
            width: 128,
          })}
          alt={name}
          width={64}
          height={64}
          className={cn(
            'rounded-full object-cover',
            size === 'large' ? 'w-16 h-16' : 'w-8 h-8',
          )}
        />
      )}
      <div className={cn('flex flex-col', size === 'default' && 'text-sm')}>
        <span
          className={cn(
            'font-medium text-gray-900',
            size === 'large' && 'text-xl',
          )}
        >
          {name}
        </span>
        <span className="text-gray-500">
          {new Date(publishAt).toLocaleDateString(lang, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
          {readTime && ` • ${readTime} min read`}
        </span>
      </div>
    </div>
  );
}
