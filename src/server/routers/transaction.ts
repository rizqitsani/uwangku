import { TransactionType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { endOfMonth, startOfMonth } from 'date-fns';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { protectedProcedure, router } from '@/server/trpc';

export const transactionRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        type: z.nativeEnum(TransactionType),
        account: z.string(),
        category: z.string(),
        amount: z.number(),
        note: z.string(),
        description: z.optional(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const transaction = await prisma.transaction.create({
          data: {
            date: input.date,
            amount: input.amount,
            note: input.note,
            description: input.description,
            type: input.type,
            account: {
              connect: {
                id: input.account,
              },
            },
            category: {
              connect: {
                id: input.category,
              },
            },
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
            transaction,
          },
        };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal membuat transaksi',
        });
      }
    }),
  getByMonth: protectedProcedure
    .input(
      z.object({
        currentDate: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const startDate = startOfMonth(
          new Date(input.currentDate)
        ).toISOString();
        const endDate = endOfMonth(new Date(input.currentDate)).toISOString();

        const transactions = await prisma.transaction.findMany({
          include: {
            category: true,
          },
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
            user: {
              id: ctx.user?.id,
            },
          },
          orderBy: {
            date: 'desc',
          },
        });

        return {
          code: 200,
          data: {
            transactions,
          },
        };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengambil data kategori',
        });
      }
    }),
});
