import { content, helpers } from '@/flotiq-api-client';
import { getFieldName, getTranslatedField } from '@/app/_lib/helpers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { LivePreviewBox } from '@flotiq/nextjs-live-preview/server';
import { Author } from '@/app/_components/Author/Author';
import { Badge } from '@/app/_components/Badge/Badge';
import { BlogPostsGrid } from '@/app/_components/BlogPostsGrid/BlosPostsGrid';

import './post.css';

type BlogpostPageParams = {
  readonly params: Promise<{
    readonly slug: string;
    readonly lang: string;
  }>;
};

export default async function BlogpostPage({ params }: BlogpostPageParams) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);

  const blogpostData = await content.blogpost.list({
    limit: 1,
    filters: { slug: { type: 'equals', filter: slug } },
    hydrate: 2,
  });

  const blogpost = blogpostData.data[0];

  if (!blogpost) {
    return notFound();
  }

  const blogpostImage = blogpost.headerImage?.[0];
  const blogpostAuthor = blogpost.author?.[0];
  const blogpostCategory = blogpost.category?.[0];
  const publishedAt = blogpost.internal.publishedAt;

  const otherBlogPosts = await content.blogpost
    .list({
      limit: 3,
      filters: { id: { type: 'notEqual', filter: blogpost.id } },
      hydrate: 2,
      orderBy: 'internal.publishedAt',
      orderDirection: 'desc',
    })
    .then((response) => response.data);

  return (
    <div className="pt-6 md:pt-10 lg:pt-12 pb-10 md:pb-16 lg:pb-24">
      <article className="space-y-5 mdLspace-y-8 mb-20 md:mb-24 lg:mb-32">
        <Author
          {...blogpostAuthor}
          publishAt={publishedAt}
          lang={lang}
          readTime={blogpost.read_time}
          size="large"
        />

        {blogpostCategory && (
          <Badge variant={blogpostCategory.color}>
            {blogpostCategory.name}
          </Badge>
        )}

        <h1 className="text-4xl font-bold sm:text-4xl">
          <LivePreviewBox
            data={blogpost}
            fieldName={getFieldName('title', lang)}
          >
            {getTranslatedField(blogpost, 'title', lang)}
          </LivePreviewBox>
        </h1>

        <LivePreviewBox data={blogpost} fieldName={getFieldName('lead', lang)}>
          <div
            className="text-lg text-gray-500"
            dangerouslySetInnerHTML={{
              __html: getTranslatedField(blogpost, 'lead', lang) || '<p></p>',
            }}
          />
        </LivePreviewBox>

        {blogpostImage && (
          <div className="aspect-feature-blog relative overflow-hidden rounded-md">
            <Image
              src={helpers.getMediaUrl(blogpostImage, {
                width: 1600,
                type: 'image',
                omitFileName: false,
              })}
              alt={blogpost.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <LivePreviewBox
          data={blogpost}
          fieldName={getFieldName('content', lang)}
        >
          <div
            className="blogpost-content"
            dangerouslySetInnerHTML={{
              __html:
                getTranslatedField(blogpost, 'content', lang) || '<p></p>',
            }}
          />
        </LivePreviewBox>
      </article>

      <BlogPostsGrid
        heading={dict.blog.otherArticles}
        description={dict.blog.otherArticlesDescription}
        lang={lang}
        blogposts={otherBlogPosts}
      />
    </div>
  );
}
