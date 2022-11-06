import { useMutation, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import toast from 'react-hot-toast';

import apiMock, { mockQuery } from '@/lib/axios-mock';
import useLoadingToast from '@/hooks/toast/useLoadingToast';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useQueryToast from '@/hooks/toast/useQueryWithToast';

import Button from '@/components/buttons/Button';
import Seo from '@/components/Seo';

import { ApiReturn } from '@/types/api';

type User = {
  id: number;
  name: string;
  token: string;
};

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export default function SandboxPage() {
  const isLoading = useLoadingToast();

  const { data: mutationData, mutate } = useMutationToast<
    ApiReturn<LoginResponse>,
    LoginData
  >(
    useMutation((data) => apiMock.post('/login', data).then((res) => res.data))
  );

  const { data: queryData } = useQueryToast(
    useQuery<ApiReturn<User>, Error>(['/me'], mockQuery)
  );

  return (
    <>
      <Seo templateTitle='Sandbox' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-start space-y-3 py-20'>
          <Button onClick={() => toast.success('Hello!')}>Open Toast</Button>
          <Button
            isLoading={isLoading}
            onClick={() =>
              mutate({ email: 'admin@mail.com', password: 'admin' })
            }
          >
            Submit
          </Button>
          <h3>Query:</h3>
          {queryData && <pre>{JSON.stringify(queryData, null, 2)}</pre>}
          <h3>Mutation:</h3>
          {mutationData && <pre>{JSON.stringify(mutationData, null, 2)}</pre>}
        </div>
      </section>
    </>
  );
}
