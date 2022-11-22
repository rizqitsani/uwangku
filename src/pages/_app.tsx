import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import nProgress from 'nprogress';

import 'react-spring-bottom-sheet/dist/style.css';
import '@/styles/globals.css';
import '@/styles/nprogress.css';

import axiosClient from '@/lib/axios';
import { trpc } from '@/lib/trpc';

import DismissableToast from '@/components/DismissableToast';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await axiosClient.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DismissableToast />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default trpc.withTRPC(MyApp);
