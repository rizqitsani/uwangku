import * as React from 'react';

import { trpc } from '@/lib/trpc';
import useLoadingToast from '@/hooks/toast/useLoadingToast';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useQueryToast from '@/hooks/toast/useQueryToast';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function TRPCPage() {
  const isLoading = useLoadingToast();

  const { data: queryData } = useQueryToast(
    trpc.mock.me.useQuery({ name: 'Muhammad Rizqi Tsani' })
  );

  const { data: mutationData, mutate } = useMutationToast(
    trpc.mock.login.useMutation()
  );

  return (
    <Layout>
      <Seo templateTitle='TRPC' />

      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col items-start space-y-3 py-20'>
            <>
              <Button isLoading={isLoading} onClick={() => mutate()}>
                Submit
              </Button>
              <h3>Query:</h3>
              {queryData && <pre>{JSON.stringify(queryData, null, 2)}</pre>}
              <h3>Mutation:</h3>
              {mutationData && (
                <pre>{JSON.stringify(mutationData, null, 2)}</pre>
              )}
            </>
          </div>
        </section>
      </main>
    </Layout>
  );
}
