import { useRouter } from 'next/router';
import * as React from 'react';
import { HiArrowDown, HiArrowUp, HiOutlineLogout } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { formatRupiah } from '@/lib/currency';
import { transactions } from '@/lib/mocks/data/transaction';

import IconButton from '@/components/buttons/IconButton';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Layout withBottomBar>
      <Seo templateTitle='Home' />

      <main>
        <div className='layout min-h-screen space-y-4 py-6'>
          <section className='flex items-center justify-between'>
            <div>
              <p className='font-semibold text-gray-700'>Halo,</p>
              <p className='text-xl font-bold'>Rizqi Tsani</p>
            </div>
            <IconButton
              variant='ghost'
              icon={HiOutlineLogout}
              iconClassName='h-6 w-6'
              onClick={handleLogout}
            />
          </section>

          <section className='rounded-lg bg-primary-500 p-4 text-white'>
            <div>
              <h2 className='text-base font-medium'>Total Saldo</h2>
              <h4 className='h3 text-2xl'>Rp19,543,172</h4>
            </div>

            <div className='mt-3 flex justify-between gap-4'>
              <div>
                <div className='flex items-center gap-1'>
                  <span className='inline-block rounded-full bg-primary-400 p-1'>
                    <HiArrowUp />
                  </span>
                  <span className='text-sm font-normal'>Pemasukan</span>
                </div>
                <h5 className='text-lg font-semibold'>Rp3,500,000</h5>
              </div>

              <div>
                <div className='flex items-center justify-end gap-1'>
                  <span className='inline-block rounded-full bg-primary-400 p-1'>
                    <HiArrowDown />
                  </span>
                  <span className='text-sm font-normal'>Pengeluaran</span>
                </div>
                <h5 className='text-right text-lg font-semibold'>Rp150,000</h5>
              </div>
            </div>
          </section>

          <section>
            <h2 className='h3 md:text-xl'>Transaksi Terakhir</h2>
            <ul
              role='list'
              className='mt-2 divide-y divide-gray-200 overflow-hidden'
            >
              {transactions.slice(0, 2).map((transaction) => (
                <div
                  key={transaction.id}
                  className='block bg-white px-2 py-3 hover:bg-gray-50'
                >
                  <span className='flex space-x-4'>
                    <span className='flex flex-1 space-x-2 truncate'>
                      <span
                        className={clsxm(
                          transaction.type === 'income'
                            ? 'bg-green-100'
                            : 'bg-red-100',
                          'mt-[2px] flex h-4 w-4 items-center justify-center rounded-full'
                        )}
                        aria-hidden='true'
                      >
                        <span
                          className={clsxm(
                            transaction.type === 'income'
                              ? 'bg-green-400'
                              : 'bg-red-400',
                            'h-2 w-2 rounded-full'
                          )}
                        />
                      </span>
                      <span className='flex flex-col truncate'>
                        <span className='text-sm font-medium'>
                          {transaction.name}
                        </span>
                        <span className='text-xs font-medium text-gray-500'>
                          {transaction.category}
                        </span>
                        <span className='text-xs'>{transaction.date}</span>
                      </span>
                    </span>
                    <span className='text-sm font-medium text-gray-900'>
                      {formatRupiah(transaction.amount)}
                    </span>
                  </span>
                </div>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}
