import * as React from 'react';

import BottomBar from '@/components/layout/BottomBar';

type LayoutProps = {
  children: React.ReactNode;
  omitBottomBar?: boolean;
};

export default function Layout({
  children,
  omitBottomBar = false,
}: LayoutProps) {
  // Put Header or Footer Here
  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-md bg-white shadow-sm'>{children}</div>
      {!omitBottomBar && <BottomBar />}
    </div>
  );
}
