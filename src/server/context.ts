import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function createContext(opts: CreateNextContextOptions) {
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions
  );

  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
