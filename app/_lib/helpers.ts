/**
 * Get page absolute URL based on path
 * @param {string} path - page path
 * @param {boolean} trailingSlash - if page should have trailing slash at the end
 * @returns {string} page absolute URL
 */
export function getAbsoluteUrl(
  path?: string,
  trailingSlash: boolean = true,
): string {
  const baseURL = `${(process.env.PUBLIC_URL || 'https://demo-shop.com').replace(/\/+$/, '')}${trailingSlash ? '/' : ''}`;
  if (!path) return baseURL;
  return `${baseURL.replace(/\/+$/, '')}/${path.replace(/^\/*/, '')}${trailingSlash ? '/' : ''}`;
}

/**
 * Get asset path with sub-path name
 * @param {string} path - asset path
 * @returns {string} asset path
 */
export function getAssetPath(path: string): string {
  const subPath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (!subPath) return path.replace(/\/+$/, '');
  return `${subPath.replace(/\/+$/, '')}/${path.replace(/^\/*/, '')}`;
}

type Translatable<T> = {
  __translations?: Array<{ __language: string } & Partial<T>>;
};

export function getTranslatedField<
  T extends Translatable<T>,
  K extends keyof T = keyof T,
>(object: T, field: K, lang: string): T[K] {
  const translation = object?.__translations?.find(
    (translation) => translation?.__language == lang,
  );
  return (translation?.[field] as T[K]) || object?.[field];
}

export function getFieldName(key: string, lang: string): string {
  return lang === 'en' ? key : `__translations.[0].${key}`;
}
