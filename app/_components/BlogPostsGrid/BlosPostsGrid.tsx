import { BlogpostHydratedTwice } from '@flotiq/flotiq-api-sdk';
import { Card } from '../Card/Card';

type BlogPostsGridProps = {
  heading: string;
  description: string;
  lang: string;
  blogposts: BlogpostHydratedTwice[];
};

export function BlogPostsGrid({
  heading,
  description,
  lang,
  blogposts,
}: BlogPostsGridProps) {
  return (
    <>
      <div className="max-w-2xl mx-auto mb-6 sm:mb-12">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">
          {heading}
        </h1>
        <p className="text-center text-gray-500 text-lg sm:text-xl">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogposts.map((item) => (
          <Card key={item.id} blogpost={item} lang={lang} />
        ))}
      </div>
    </>
  );
}
