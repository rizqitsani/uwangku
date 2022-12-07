import { AccountType, TransactionAccount } from '@prisma/client';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';
import { BottomSheet } from 'react-spring-bottom-sheet';

import clsxm from '@/lib/clsxm';
import { formatRupiah } from '@/lib/currency';
import { trpc } from '@/lib/trpc';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useQueryToast from '@/hooks/toast/useQueryToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type CreateAccountForm = {
  name: string;
  type: keyof typeof AccountType;
};

type AccountStyle = {
  className: string;
  name: string;
};

const accountStyle: Record<TransactionAccount['type'], AccountStyle> = {
  BANK: { className: 'bg-green-100 text-green-800', name: 'Bank' },
  E_WALLET: { className: 'bg-yellow-100 text-yellow-800', name: 'E-Wallet' },
  CASH: { className: 'bg-indigo-100 text-indigo-800', name: 'Cash' },
  SAVINGS: { className: 'bg-red-100 text-red-800', name: 'Tabungan' },
  OTHER: { className: 'bg-slate-100 text-slate-800', name: 'Lainnya' },
};

export default withAuth(AccountsPage);
function AccountsPage() {
  //#region  //*=========== Form ===========
  const methods = useForm<CreateAccountForm>({
    mode: 'onTouched',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Get Initial Data ===========
  const { data: queryData, refetch } = useQueryToast(
    trpc.account.list.useQuery()
  );
  const accounts = queryData?.data.accounts || [];
  //#endregion  //*======== Get Initial Data ===========

  //#region  //*=========== Bottom Sheet ===========
  const [isOpen, setIsOpen] = React.useState(false);
  const openBottomSheet = () => setIsOpen(true);
  const onDismiss = () => {
    setIsOpen(false);
    reset();
  };
  //#endregion  //*======== Bottom Sheet ===========

  //#region  //*=========== Form Submit ===========
  const { mutate } = useMutationToast(
    trpc.account.create.useMutation({
      onSettled: () => {
        onDismiss();
        refetch();
      },
    }),
    {
      success: 'Rekening berhasil dibuat',
    }
  );

  const onSubmit: SubmitHandler<CreateAccountForm> = (data) => {
    mutate({
      name: data.name,
      type: AccountType[data.type],
    });
  };
  //#endregion  //*======== Form Submit ===========

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
              {accounts.length === 0 && (
                <p className='text-gray-500'>
                  Belum ada rekening yang ditambahkan
                </p>
              )}
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
                  {/* TODO: Get account total amount */}
                  <p className='text-sm font-medium'>{formatRupiah(100000)}</p>
                </div>
              ))}
            </div>
            <Button onClick={openBottomSheet} className='w-full rounded-lg'>
              Tambah Rekening
            </Button>
          </div>
        </section>
      </main>

      <BottomSheet
        open={isOpen}
        onDismiss={onDismiss}
        className='mx-auto max-w-md'
      >
        <div className='mx-auto max-w-md p-4'>
          <h2 className='h4'>Tambah Rekening</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-4 space-y-3'>
                <Input
                  id='name'
                  label='Nama Rekening'
                  validation={{ required: 'Nama rekening harus diisi' }}
                />
                <SelectInput
                  id='type'
                  label='Jenis Rekening'
                  placeholder='Pilih jenis rekening'
                  validation={{
                    required: 'Jenis rekening harus dipilih',
                  }}
                >
                  {Object.keys(AccountType).map((accountType) => (
                    <option key={accountType} value={accountType}>
                      {
                        accountStyle[accountType as keyof typeof AccountType]
                          .name
                      }
                    </option>
                  ))}
                </SelectInput>
              </div>
              <Button type='submit' className='mt-6 w-full rounded-lg'>
                Simpan Rekening
              </Button>
            </form>
          </FormProvider>
        </div>
      </BottomSheet>
    </Layout>
  );
}
