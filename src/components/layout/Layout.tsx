import * as React from 'react';

import BottomBar from '@/components/layout/BottomBar';

type LayoutProps = {
  children: React.ReactNode;
  withBottomBar?: boolean;
};

export default function Layout({
  children,
  withBottomBar = false,
}: LayoutProps) {
  // Put Header or Footer Here
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-md bg-white shadow-sm'>{children}</div>
      {withBottomBar && <BottomBar />}
    </div>
  );
}
