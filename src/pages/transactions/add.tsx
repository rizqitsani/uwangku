import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';

import logger from '@/lib/logger';
import { accounts } from '@/lib/mocks/data/account';
import { expenseCategories, incomeCategories } from '@/lib/mocks/data/category';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type CreateTransactionForm = {
  date: Date;
  type: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
};

export default function TransactionsPage() {
  //#region  //*=========== Form ===========
  const methods = useForm<CreateTransactionForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Category ===========
  const transactionType = watch('type');
  const categories =
    transactionType === 'income' ? incomeCategories : expenseCategories;
  //#endregion  //*======== Category ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<CreateTransactionForm> = (data) => {
    logger({ data }, 'rhf.tsx line 33');
    return;
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
                    <option value='expense'>Pengeluaran</option>
                    <option value='income'>Pemasukan</option>
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
                  <SelectInput
                    id='category'
                    label='Kategori'
                    placeholder='Pilih kategori'
                    validation={{
                      required: 'Kategori harus dipilih',
                    }}
                  >
                    {categories.map((category, index) => (
                      <option key={`${category}-${index}`} value={category}>
                        {category}
                      </option>
                    ))}
                  </SelectInput>
                  <Input
                    id='amount'
                    label='Jumlah'
                    validation={{
                      required: 'Jumlah harus diisi',
                    }}
                  />
                  <Input
                    id='description'
                    label='Deskripsi'
                    validation={{ required: 'Deskripsi must be filled' }}
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
