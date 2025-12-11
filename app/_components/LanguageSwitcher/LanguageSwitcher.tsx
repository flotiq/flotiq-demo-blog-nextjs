'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn, locales } from '@/app/_lib/utils';
import Image from 'next/image';
import { getAssetPath } from '@/app/_lib/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '../Button/Button';

type LanguageSwitcherProps = {
  readonly lang: string;
  // eslint-disable-next-line
  readonly dictionary: any;
};

export default function LanguageSwitcher({
  lang,
  dictionary,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Function to get the path without the language prefix
  const getPathWithoutLang = () => {
    const segments = pathname.split('/');
    segments.splice(1, 1);
    return segments.join('/') || '/';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span className="sr-only">Switch language</span>
          <Image
            src={getAssetPath(locales[lang as keyof typeof locales]?.iconPath)}
            alt=""
            width={20}
            height={20}
          />
          <span>{dictionary.language[lang]}</span>
          <ChevronDown size={40} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          'bg-white flex flex-col z-50 rounded-md border border-border-default shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        }
        align="end"
        sideOffset={8}
      >
        {Object.values(locales).map(({ language, iconPath }) => (
          <DropdownMenuItem
            key={language}
            asChild
            className={cn(
              'text-sm outline-none transition-colors hover:bg-gray-200',
            )}
          >
            <Link
              href={`/${language}${getPathWithoutLang()}`}
              className={cn(
                'flex gap-2 px-4 py-2',
                lang === language ? 'font-bold' : '',
              )}
            >
              <Image
                src={getAssetPath(iconPath)}
                alt=""
                width={20}
                height={20}
              />
              {dictionary.language[language]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
