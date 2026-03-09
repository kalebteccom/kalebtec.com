import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Only match page routes — skip all static files and internal paths
  matcher: [
    '/((?!api|_next|_vercel|admin|.*\\..*).*)'
  ],
};
