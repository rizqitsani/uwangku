import { TransactionType } from '@prisma/client';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';

import { trpc } from '@/lib/trpc';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type CreateTransactionForm = {
  date: Date;
  type: keyof typeof TransactionType;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
};

export default withAuth(TransactionsPage);
function TransactionsPage() {
  const router = useRouter();

  //#region  //*=========== Form ===========
  const methods = useForm<CreateTransactionForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Get Initial Data ===========
  const { data: _accountData } = trpc.account.list.useQuery();
  const accounts = _accountData?.data.accounts || [];

  const { data: _categoryData } = trpc.category.list.useQuery();
  const incomeCategories = _categoryData?.data.incomeCategories || [];
  const expenseCategories = _categoryData?.data.expenseCategories || [];

  //#endregion  //*======== Get Initial Data ===========

  //#region  //*=========== Category ===========
  const transactionType = watch('type') as TransactionType;
  const categories =
    transactionType === 'INCOME' ? incomeCategories : expenseCategories;
  //#endregion  //*======== Category ===========

  //#region  //*=========== Form Submit ===========
  const { mutate } = useMutationToast(
    trpc.transaction.create.useMutation({
      onSuccess: () => {
        router.push('/transactions');
      },
    }),
    {
      success: 'Transaksi berhasil dibuat',
    }
  );

  const onSubmit: SubmitHandler<CreateTransactionForm> = (data) => {
    mutate({ ...data, date: new Date(data.date).toISOString() });
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout>
      <Seo templateTitle='Buat Transaksi' />

      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col py-6'>
            <div className='flex items-center gap-2'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                href='/transactions'
                icon={HiArrowLeft}
              />
              <h1 className='h3'>Buat Transaksi</h1>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-1 flex-col'
              >
                <div className='mt-6 flex-1 space-y-3'>
                  <SelectInput
                    id='type'
                    label='Jenis Transaksi'
                    placeholder='Pilih jenis transaksi'
                    validation={{
                      required: 'Jenis transaksi harus dipilih',
                    }}
                  >
                    <option value='INCOME'>Pemasukan</option>
                    <option value='EXPENSE'>Pengeluaran</option>
                  </SelectInput>
                  <DatePicker
                    id='date'
                    label='Waktu Transaksi'
                    dateFormat='dd MMMM yyyy'
                    locale='id'
                    defaultValue={new Date().toString()}
                    placeholder='dd/mm/yyyy'
                    validation={{
                      required: 'Waktu transaksi harus dipilih',
                    }}
                  />
                  <SelectInput
                    id='account'
                    label='Rekening'
                    placeholder='Pilih rekening'
                    validation={{
                      required: 'Rekening harus dipilih',
                    }}
                  >
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </SelectInput>
                  {transactionType !== 'TRANSFER' && (
                    <SelectInput
                      id='category'
                      label='Kategori'
                      placeholder='Pilih kategori'
                      validation={{
                        required: 'Kategori harus dipilih',
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </SelectInput>
                  )}
                  <Input
                    id='amount'
                    label='Jumlah'
                    validation={{
                      required: 'Jumlah harus diisi',
                      valueAsNumber: true,
                      validate: (value) =>
                        /^[0-9]+$/.test(value) || 'Jumlah harus berupa angka',
                    }}
                  />
                  <Input
                    id='description'
                    label='Deskripsi'
                    validation={{ required: 'Deskripsi harus diisi' }}
                  />
                  <TextArea id='note' label='Catatan (Opsional)' />
                </div>
                <Button type='submit' className='w-full rounded-lg'>
                  Simpan Transaksi
                </Button>
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </Layout>
  );
}
