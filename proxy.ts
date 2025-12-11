import { createInternationalizationMiddleware } from '@flotiq/nextjs-internationalization';
import { NextRequest } from 'next/server';
import { locales } from './app/_lib/utils';

export async function proxy(request: NextRequest) {
  return createInternationalizationMiddleware(
    request,
    Object.keys(locales),
    'en',
  );
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
