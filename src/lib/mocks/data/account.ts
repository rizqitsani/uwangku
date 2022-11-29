import { TransactionAccount } from '@prisma/client';

type AccountStyle = {
  className: string;
  name: string;
};

type Account = {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'ewallet' | 'savings';
  total: number;
};

export const accountStyle: Record<TransactionAccount['type'], AccountStyle> = {
  BANK: { className: 'bg-green-100 text-green-800', name: 'Bank' },
  E_WALLET: { className: 'bg-yellow-100 text-yellow-800', name: 'E-Wallet' },
  CASH: { className: 'bg-indigo-100 text-indigo-800', name: 'Cash' },
  SAVINGS: { className: 'bg-red-100 text-red-800', name: 'Tabungan' },
  OTHER: { className: 'bg-slate-100 text-slate-800', name: 'Lainnya' },
};

export const accounts: Account[] = [
  {
    id: '1',
    name: 'Bank BNI',
    type: 'bank',
    total: 1000000,
  },
  {
    id: '2',
    name: 'Gopay',
    type: 'ewallet',
    total: 100000,
  },
  {
    id: '3',
    name: 'Bibit',
    type: 'savings',
    total: 500000,
  },
  {
    id: '4',
    name: 'Cash',
    type: 'cash',
    total: 1,
  },
];
