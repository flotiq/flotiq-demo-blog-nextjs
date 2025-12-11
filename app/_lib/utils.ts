import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const locales = {
  en: { language: 'en', iconPath: '/us-flag.svg' },
  pl: { language: 'pl', iconPath: '/pl-flag.svg' },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
