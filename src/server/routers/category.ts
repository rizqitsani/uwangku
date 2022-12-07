import { CategoryType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { protectedProcedure, router } from '@/server/trpc';

export const categoryRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.nativeEnum(CategoryType),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const isCategoryExists = await prisma.category.findFirst({
        where: {
          name: input.name,
          type: input.type,
          user: {
            id: ctx.user?.id,
          },
        },
      });

      if (isCategoryExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Kategori telah dibuat sebelumnya',
        });
      }

      try {
        const category = await prisma.category.create({
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
            category,
          },
        };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal membuat kategori',
        });
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const incomeCategories = await prisma.category.findMany({
        where: {
          type: 'INCOME',
          user: {
            id: ctx.user?.id,
          },
        },
      });

      const expenseCategories = await prisma.category.findMany({
        where: {
          type: 'EXPENSE',
          user: {
            id: ctx.user?.id,
          },
        },
      });

      return {
        code: 200,
        data: {
          incomeCategories,
          expenseCategories,
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
