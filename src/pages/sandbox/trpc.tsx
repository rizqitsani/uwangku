import * as React from 'react';

import { trpc } from '@/lib/trpc';
import useQueryToast from '@/hooks/toast/useQueryToast';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function TRPCPage() {
  const { data } = useQueryToast(trpc.hello.useQuery({ text: 'world' }));

  return (
    <Layout>
      <Seo templateTitle='TRPC' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-6'>
            <h1 className='h3'>{data}</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}
