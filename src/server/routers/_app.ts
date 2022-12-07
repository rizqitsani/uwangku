import { accountRouter } from '@/server/routers/account';
import { categoryRouter } from '@/server/routers/category';
import { mockRouter } from '@/server/routers/mock';
import { router } from '@/server/trpc';

export const appRouter = router({
  account: accountRouter,
  category: categoryRouter,
  mock: mockRouter,
});

export type AppRouter = typeof appRouter;
