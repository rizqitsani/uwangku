import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import toast from 'react-hot-toast';
import { ImSpinner8 } from 'react-icons/im';

const LOGIN_ROUTE = '/';

/**
 * Add access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<
  T extends Record<string, unknown> = Record<string, unknown>
>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const { push } = router;

    const { data: session } = useSession({
      required: true,
      onUnauthenticated: () => {
        toast.error('Silahkan login terlebih dahulu');
        push(LOGIN_ROUTE);
      },
    });

    const isAuthenticated = !!session?.user;

    if (!isAuthenticated) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
          <ImSpinner8 className='mb-4 animate-spin text-4xl' />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} />;
  };

  return ComponentWithAuth;
}
