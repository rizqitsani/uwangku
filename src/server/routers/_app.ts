import { mockRouter } from '@/server/routers/mock';
import { router } from '@/server/trpc';

export const appRouter = router({
  mock: mockRouter,
});

export type AppRouter = typeof appRouter;
