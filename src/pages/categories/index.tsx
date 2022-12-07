import { CategoryType } from '@prisma/client';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiArrowLeft, HiPlus } from 'react-icons/hi';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { trpc } from '@/lib/trpc';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type CategoriesCardProps = {
  children: React.ReactNode;
};

type CreateCategoryForm = {
  name: string;
  type: keyof typeof CategoryType;
};

export default function CategoriesPage() {
  //#region  //*=========== Form ===========
  const methods = useForm<CreateCategoryForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Get Initial Data ===========
  const { data: queryData, refetch } = trpc.category.list.useQuery();
  const incomeCategories = queryData?.data.incomeCategories || [];
  const expenseCategories = queryData?.data.expenseCategories || [];
  //#endregion  //*======== Get Initial Data ===========

  //#region  //*=========== Bottom Sheet ===========
  const [currentCategory, setCurrentCategory] =
    React.useState<keyof typeof CategoryType>('EXPENSE');
  const [isOpen, setIsOpen] = React.useState(false);
  const openBottomSheet = () => setIsOpen(true);
  const onDismiss = () => {
    setIsOpen(false);
    reset();
  };
  //#endregion  //*======== Bottom Sheet ===========

  //#region  //*=========== Form Submit ===========
  const { mutate } = useMutationToast(
    trpc.category.create.useMutation({
      onSettled: () => {
        onDismiss();
        refetch();
      },
    }),
    {
      success: 'Kategori berhasil dibuat',
    }
  );

  const onSubmit: SubmitHandler<CreateCategoryForm> = (data) => {
    mutate({
      name: data.name,
      type: currentCategory,
    });
  };
  //#endregion  //*======== Form Submit ===========

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
                <IconButton
                  onClick={() => {
                    setCurrentCategory('INCOME');
                    openBottomSheet();
                  }}
                  variant='outline'
                  size='small'
                  icon={HiPlus}
                />
              </div>
              {incomeCategories.length > 0 ? (
                <div className='mt-3 grid grid-cols-3 gap-3'>
                  {incomeCategories.map((category) => (
                    <CategoriesCard key={category.id}>
                      {category.name}
                    </CategoriesCard>
                  ))}
                </div>
              ) : (
                <p className='mt-3 text-sm text-gray-500'>
                  Belum ada kategori pemasukan yang ditambahkan
                </p>
              )}
            </div>

            <div className='mt-6 px-2'>
              <div className='flex items-center justify-between'>
                <h2 className='h4 font-semibold'>Pengeluaran</h2>
                <IconButton
                  onClick={() => {
                    setCurrentCategory('EXPENSE');
                    openBottomSheet();
                  }}
                  variant='outline'
                  size='small'
                  icon={HiPlus}
                />
              </div>
              {expenseCategories.length > 0 ? (
                <div className='mt-3 grid grid-cols-3 gap-3'>
                  {expenseCategories.map((category) => (
                    <CategoriesCard key={category.id}>
                      {category.name}
                    </CategoriesCard>
                  ))}
                </div>
              ) : (
                <p className='mt-3 text-sm text-gray-500'>
                  Belum ada kategori pengeluaran yang ditambahkan
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <BottomSheet
        open={isOpen}
        onDismiss={onDismiss}
        className='mx-auto max-w-md'
      >
        <div className='mx-auto max-w-md p-4'>
          <h2 className='h4'>
            Tambah Kategori{' '}
            {currentCategory === 'EXPENSE' ? 'Pengeluaran' : 'Pemasukan'}
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-4 space-y-3'>
                <Input
                  id='name'
                  label='Nama Kategori'
                  validation={{ required: 'Nama kategori harus diisi' }}
                />
              </div>
              <Button type='submit' className='mt-6 w-full rounded-lg'>
                Simpan Kategori
              </Button>
            </form>
          </FormProvider>
        </div>
      </BottomSheet>
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
