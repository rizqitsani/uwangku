import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from '@/server/context';
import { prisma } from '@/server/prisma';

const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource.',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: ctx.session.user.email || '',
    },
  });

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
