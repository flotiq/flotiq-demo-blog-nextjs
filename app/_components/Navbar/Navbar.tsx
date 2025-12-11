import Link from 'next/link';
import LanguageSwitcher from '@/app/_components/LanguageSwitcher/LanguageSwitcher';
import { getDictionary } from '@/app/[lang]/dictionaries';

type NavbarProps = {
  readonly lang: string;
};

export default async function Navbar({ lang }: NavbarProps) {
  const dictionary = await getDictionary(lang);

  return (
    <nav className="border-b border-border-default">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-4 md:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <span className="text-2xl">BLOG</span>
        </Link>

        <div className="ml-auto flex items-center">
          <LanguageSwitcher lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </nav>
  );
}
