import { accountRouter } from '@/server/routers/account';
import { categoryRouter } from '@/server/routers/category';
import { mockRouter } from '@/server/routers/mock';
import { transactionRouter } from '@/server/routers/transaction';
import { router } from '@/server/trpc';

export const appRouter = router({
  account: accountRouter,
  category: categoryRouter,
  transaction: transactionRouter,
  mock: mockRouter,
});

export type AppRouter = typeof appRouter;
