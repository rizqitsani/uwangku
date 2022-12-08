import { TransactionType } from '@prisma/client';

export const transactionTypeTexts: Record<TransactionType, string> = {
  EXPENSE: 'Pengeluaran',
  INCOME: 'Pemasukan',
  TRANSFER: 'Transfer',
};
