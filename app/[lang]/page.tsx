import { content } from '@/flotiq-api-client';
import { Card } from '../_components/Card/Card';
import { getDictionary } from './dictionaries';
import { BlogPostsGrid } from '../_components/BlogPostsGrid/BlosPostsGrid';

type HomePageParams = {
  readonly params: Promise<{ readonly lang: string }>;
};

export default async function Home({ params }: HomePageParams) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const blogposts = await content.blogpost
    .list({
      hydrate: 2,
      orderBy: 'internal.publishedAt',
      orderDirection: 'desc',
    })
    .then((response) => response.data);

  const firstBlogPost = blogposts.shift();

  return (
    <div className="space-y-8 py-10 md:py-16 lg:py-24">
      {firstBlogPost && (
        <Card blogpost={firstBlogPost} lang={lang} size="large" />
      )}
      <hr className="my-10 md:my-16 lg:my-24 border-b border-border-default 2xl:-mx-24" />
      <BlogPostsGrid
        heading={dict.home.latestArticles}
        description={dict.home.latestArticlesDescription}
        lang={lang}
        blogposts={blogposts}
      />
    </div>
  );
}
