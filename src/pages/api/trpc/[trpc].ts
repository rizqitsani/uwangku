import * as trpcNext from '@trpc/server/adapters/next';

import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';

/**
 * Create tRPC's HTTP response handler
 *
 * @see https://github.com/trpc/examples-next-prisma-starter/blob/main/src/pages/api/trpc/%5Btrpc%5D.ts
 */
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
