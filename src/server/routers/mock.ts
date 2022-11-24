import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure, router } from '@/server/trpc';

export const mockRouter = router({
  me: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        code: 200,
        data: {
          id: 1,
          name: input.name,
          token: 'dummy-token',
        },
      };
    }),
  login: publicProcedure.mutation(async () => {
    const errorRate = 0.5;

    const promise = new Promise((resolve, reject) =>
      setTimeout(
        () =>
          Math.random() > +errorRate
            ? resolve({
                code: 200,
                data: {
                  token: 'dummy-token',
                },
              })
            : reject(
                new TRPCError({
                  code: 'UNAUTHORIZED',
                  message: `Simulasi error (${+errorRate * 100}% error rate)`,
                })
              ),
        1000
      )
    );

    return await promise;
  }),
});
