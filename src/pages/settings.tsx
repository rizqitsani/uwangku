import * as React from 'react';
import { HiCog } from 'react-icons/hi';

import Layout from '@/components/layout/Layout';
import { Arrow } from '@/components/links/ArrowLink';
import IconLink from '@/components/links/IconLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

const settings = [
  {
    name: 'Rekening',
    href: '/accounts',
  },
  {
    name: 'Kategori Pemasukan & Pengeluaran',
    href: '/categories',
  },
];

export default function SettingsPage() {
  return (
    <Layout withBottomBar>
      <Seo templateTitle='Pengaturan' />

      <main>
        <section>
          <div className='layout min-h-screen py-6'>
            <div className='flex items-center gap-2'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                href='/settings'
                icon={HiCog}
              />
              <h1 className='h3'>Pengaturan</h1>
            </div>
            <div className='mt-4 divide-y divide-gray-200'>
              {settings.map((setting) => (
                <UnstyledLink
                  key={setting.name}
                  href={setting.href}
                  className='group flex justify-between px-3 py-2 hover:bg-gray-100'
                >
                  <h2 className='flex-1 text-sm font-medium text-gray-700 md:text-base'>
                    {setting.name}
                  </h2>
                  <Arrow />
                </UnstyledLink>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
