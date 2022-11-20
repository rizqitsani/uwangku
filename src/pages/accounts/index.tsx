import * as React from 'react';
import { HiArrowLeft } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { formatRupiah } from '@/lib/currency';
import { accounts, accountStyle } from '@/lib/mocks/data/account';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

export default function AccountsPage() {
  return (
    <Layout>
      <Seo templateTitle='Rekening' />

      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col py-6'>
            <div className='flex items-center gap-2'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                href='/settings'
                icon={HiArrowLeft}
              />
              <h1 className='h3'>Rekening Anda</h1>
            </div>
            <div className='mt-6 flex-1 space-y-3'>
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className='flex cursor-pointer justify-between rounded-lg px-4 py-3 shadow'
                >
                  <div>
                    <p className='text-sm font-medium'>{account.name}</p>
                    <span
                      className={clsxm(
                        'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
                        accountStyle[account.type].className
                      )}
                    >
                      {accountStyle[account.type].name}
                    </span>
                  </div>
                  <p className='text-sm font-medium'>
                    {formatRupiah(account.total)}
                  </p>
                </div>
              ))}
            </div>
            <Button className='w-full rounded-lg'>Tambah Rekening</Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
