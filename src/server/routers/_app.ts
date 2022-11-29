import { accountRouter } from '@/server/routers/account';
import { mockRouter } from '@/server/routers/mock';
import { router } from '@/server/trpc';

export const appRouter = router({
  account: accountRouter,
  mock: mockRouter,
});

export type AppRouter = typeof appRouter;
