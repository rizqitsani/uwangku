type Account = {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'ewallet' | 'savings';
  total: number;
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
