import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { AppRouter } from '@/server/routers/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return 'http://localhost:3000';
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
