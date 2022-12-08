import { Category, Transaction } from '@prisma/client';
import { parseISO } from 'date-fns';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiPlus } from 'react-icons/hi';
import { IoWallet } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';
import { formatRupiah } from '@/lib/currency';
import { formatLocale } from '@/lib/date';
import logger from '@/lib/logger';
import { trpc } from '@/lib/trpc';
import useQueryToast from '@/hooks/toast/useQueryToast';

import DatePicker from '@/components/forms/DatePicker';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';

type TransactionRecap = Transaction & {
  category: Category;
};

type GroupedTransaction = {
  date: Date;
  transactions: TransactionRecap[];
}[];

type MonthForm = {
  date: Date;
};

export default withAuth(TransactionsPage);
function TransactionsPage() {
  //#region  //*=========== Form ===========
  const methods = useForm<MonthForm>({
    mode: 'onTouched',
    defaultValues: {
      date: new Date(),
    },
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Get Initial Data ===========
  const date = watch('date');

  const { data: queryData } = useQueryToast(
    trpc.transaction.getByMonth.useQuery(
      {
        currentDate: date.toISOString(),
      },
      {
        enabled: !!date,
      }
    )
  );
  const transactions = queryData?.data.transactions || [];
  //#endregion  //*======== Get Initial Data ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<MonthForm> = (data) => {
    logger({ data }, 'rhf.tsx line 33');
    return;
  };
  //#endregion  //*======== Form Submit ===========

  const groupedTransactionList = transactions.reduce((acc, curr) => {
    const parsedTransaction = {
      ...curr,
      date: parseISO(curr.date),
      createdAt: parseISO(curr.createdAt),
      updatedAt: parseISO(curr.updatedAt),
    };

    const isGroupExist = acc.find(
      (transactionGroup) =>
        transactionGroup.date.getDate() === parsedTransaction.date.getDate()
    );

    if (isGroupExist) {
      isGroupExist.transactions.push(parsedTransaction);
    } else {
      acc.push({
        date: parsedTransaction.date,
        transactions: [parsedTransaction],
      });
    }

    return acc;
  }, [] as GroupedTransaction);

  return (
    <Layout withBottomBar>
      <Seo templateTitle='Transaksi' />

      <main>
        <section className=''>
          <div className='layout min-h-main relative py-6'>
            <div className='flex items-center gap-2'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                href='/settings'
                icon={IoWallet}
              />
              <h1 className='h3'>Riwayat Transaksi</h1>
            </div>

            <div className='mt-4'>
              <FormProvider {...methods}>
                <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <DatePicker
                    id='date'
                    label={null}
                    dateFormat='MMMM yyyy'
                    placeholder='dd/mm/yyyy'
                    showMonthYearPicker
                  />
                </form>
              </FormProvider>
            </div>

            <div className='mt-4 divide-y divide-gray-100'>
              {groupedTransactionList.map((groupedTransaction) => (
                <div key={formatLocale(groupedTransaction.date, 'FULL')}>
                  <h2 className='py-2 text-sm font-normal'>
                    {formatLocale(groupedTransaction.date, 'FULL')}
                  </h2>
                  {groupedTransaction.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className='block rounded-md bg-white py-2 hover:bg-gray-50'
                    >
                      <span className='flex space-x-4'>
                        <span className='flex flex-1 space-x-2 truncate'>
                          <span
                            className={clsxm(
                              transaction.type === 'INCOME'
                                ? 'bg-green-100'
                                : 'bg-red-100',
                              'mt-[2px] flex h-4 w-4 items-center justify-center rounded-full'
                            )}
                            aria-hidden='true'
                          >
                            <span
                              className={clsxm(
                                transaction.type === 'INCOME'
                                  ? 'bg-green-400'
                                  : 'bg-red-400',
                                'h-2 w-2 rounded-full'
                              )}
                            />
                          </span>
                          <span className='flex flex-col truncate'>
                            <span className='text-sm font-medium'>
                              {transaction.description}
                            </span>
                            <span className='text-xs font-medium text-gray-500'>
                              {transaction.category.name}
                            </span>
                          </span>
                        </span>
                        <span className='text-sm font-medium text-gray-900'>
                          {formatRupiah(transaction.amount)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <IconLink
              variant='primary'
              className='absolute bottom-4 right-0 min-h-[48px] min-w-[48px] rounded-full'
              iconClassName='text-2xl md:text-xl'
              href='/transactions/add'
              icon={HiPlus}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
