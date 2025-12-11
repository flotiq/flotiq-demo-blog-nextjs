import 'server-only';

export const dictionaries = {
  en: () => import('../_dictionaries/en.json').then((module) => module.default),
  pl: () => import('../_dictionaries/pl.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale !== 'en' && locale !== 'pl') {
    locale = 'en';
  }
  return dictionaries[locale as keyof typeof dictionaries]();
};
