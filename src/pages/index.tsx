import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='font-extrabold text-primary-500'>Uwangku</h1>
            <p className='mt-2 text-base text-gray-500'>
              Solusi catat mencatat keuangan
            </p>
            <Button
              className='mt-24 items-center gap-2 font-normal'
              variant='light'
              onClick={() => signIn('google')}
            >
              <FcGoogle className='text-[1.15em]' />
              <span className='font-medium'>Continue with Google</span>
            </Button>

            <footer className='absolute bottom-4 text-sm text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://rizqitsani.com'>
                Muhammad Rizqi Tsani
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

/**
 * Redirect to home if user is already logged in
 *
 * @see https://next-auth.js.org/configuration/nextjs#in-getserversideprops
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
