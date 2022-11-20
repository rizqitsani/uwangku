import * as React from 'react';
import { HiArrowLeft, HiPlus } from 'react-icons/hi';

import { expenseCategories, incomeCategories } from '@/lib/mocks/data/category';

import IconButton from '@/components/buttons/IconButton';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type CategoriesCardProps = {
  children: React.ReactNode;
};

export default function CategoriesPage() {
  return (
    <Layout>
      <Seo templateTitle='Kategori Pemasukan & Pengeluaran' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-6'>
            <div className='flex items-start gap-2'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                href='/settings'
                icon={HiArrowLeft}
              />
              <h1 className='h3'>Kategori Pemasukan & Pengeluaran</h1>
            </div>

            <div className='mt-6 px-2'>
              <div className='flex items-center justify-between'>
                <h2 className='h4 font-semibold'>Pemasukan</h2>
                <IconButton variant='outline' size='small' icon={HiPlus} />
              </div>
              <div className='mt-3 grid grid-cols-3 gap-3'>
                {incomeCategories.map((category) => (
                  <CategoriesCard key={category}>{category}</CategoriesCard>
                ))}
              </div>
            </div>

            <div className='mt-6 px-2'>
              <div className='flex items-center justify-between'>
                <h2 className='h4 font-semibold'>Pengeluaran</h2>
                <IconButton variant='outline' size='small' icon={HiPlus} />
              </div>
              <div className='mt-3 grid grid-cols-3 gap-3'>
                {expenseCategories.map((category) => (
                  <CategoriesCard key={category}>{category}</CategoriesCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const CategoriesCard = ({ children }: CategoriesCardProps) => {
  return (
    <div className='flex min-h-[6.25rem] cursor-pointer items-center justify-center break-all rounded-lg px-3 py-2 text-center shadow'>
      <span className='text-based'>{children}</span>
    </div>
  );
};
