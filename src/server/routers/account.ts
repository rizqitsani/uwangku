import { AccountType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { protectedProcedure, router } from '@/server/trpc';

export const accountRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.nativeEnum(AccountType),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const isAccountExists = await prisma.transactionAccount.findFirst({
        where: {
          name: input.name,
          type: input.type,
          user: {
            id: ctx.user?.id,
          },
        },
      });

      if (isAccountExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Rekening telah dibuat sebelumnya',
        });
      }

      try {
        const account = await prisma.transactionAccount.create({
          data: {
            name: input.name,
            type: input.type,
            user: {
              connect: {
                id: ctx.user?.id,
              },
            },
          },
        });

        return {
          code: 200,
          data: {
            account,
          },
        };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal membuat rekening',
        });
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const accounts = await prisma.transactionAccount.findMany({
        where: {
          user: {
            id: ctx.user?.id,
          },
        },
      });

      return {
        code: 200,
        data: {
          accounts,
        },
      };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Gagal membuat rekening',
      });
    }
  }),
});
