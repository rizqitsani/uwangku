import { z } from 'zod';

import { procedure, router } from '@/server/trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return `Hello ${input.text}`;
    }),
});

export type AppRouter = typeof appRouter;
