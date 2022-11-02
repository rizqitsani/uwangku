import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-lg bg-white'>{children}</div>
    </div>
  );
}
