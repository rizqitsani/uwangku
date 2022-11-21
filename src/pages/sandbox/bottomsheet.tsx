import * as React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function BottomSheetPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onDismiss = () => setIsOpen(false);

  return (
    <Layout>
      <Seo templateTitle='BottomSheet' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-6'>
            <Button onClick={() => setIsOpen(true)}>Open</Button>
            <BottomSheet
              open={isOpen}
              onDismiss={onDismiss}
              className='mx-auto max-w-md'
            >
              <div className='mx-auto max-w-md p-4'>Tes</div>
            </BottomSheet>
          </div>
        </section>
      </main>
    </Layout>
  );
}
