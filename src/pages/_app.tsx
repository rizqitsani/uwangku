import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import nProgress from 'nprogress';

import 'react-spring-bottom-sheet/dist/style.css';
import '@/styles/globals.css';
import '@/styles/nprogress.css';

import { trpc } from '@/lib/trpc';

import DismissableToast from '@/components/DismissableToast';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <DismissableToast />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
