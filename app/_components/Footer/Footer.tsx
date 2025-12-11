import { getDictionary } from '@/app/[lang]/dictionaries';

type FooterProps = {
  readonly lang: string;
};

export default async function Footer({ lang }: FooterProps) {
  const dict = await getDictionary(lang);
  return (
    <footer className="bg-footer flex py-12">
      <p className="mx-auto text-gray-500">
        &copy; {new Date().getFullYear()} Demo Flotiq Blog.{' '}
        {dict.footer.copyright}
      </p>
    </footer>
  );
}
