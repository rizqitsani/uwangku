import { useRouter } from 'next/router';
import * as React from 'react';
import { IconType } from 'react-icons';
import {
  HiChartBar,
  HiCog,
  HiHome,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import { IoWallet, IoWalletOutline } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

type Navigation = {
  name: string;
  href: string;
  icon: { active: IconType; base: IconType };
};

type BottomBarProps = React.ComponentPropsWithoutRef<'div'>;

const navItems: Navigation[] = [
  {
    name: 'Home',
    href: '/home',
    icon: {
      base: HiOutlineHome,
      active: HiHome,
    },
  },
  {
    name: 'Transaksi',
    href: '#',
    icon: {
      base: IoWalletOutline,
      active: IoWallet,
    },
  },
  {
    name: 'Laporan',
    href: '#',
    icon: {
      base: HiOutlineChartBar,
      active: HiChartBar,
    },
  },
  {
    name: 'Pengaturan',
    href: '#',
    icon: {
      base: HiOutlineCog,
      active: HiCog,
    },
  },
];

export default function BottomBar({ className, ...rest }: BottomBarProps) {
  const router = useRouter();

  return (
    <div
      className={clsxm(
        'fixed bottom-0 left-0 right-0 mx-auto flex h-16 w-full max-w-md flex-row items-center justify-around bg-white shadow-primary',
        className
      )}
      {...rest}
    >
      {navItems.map((item) => {
        const isActive = router.pathname.startsWith(item.href);
        const Icon = isActive ? item.icon.active : item.icon.base;

        return (
          <UnstyledLink
            key={item.name}
            href={item.href}
            className={clsxm(
              'relative flex h-full flex-1 flex-col items-center justify-center gap-1',
              isActive
                ? 'border-t-2 border-primary-300 text-primary-500'
                : 'text-gray-500 hover:text-gray-600'
            )}
          >
            <Icon className='h-6 w-6' />
            <span className='text-xs font-medium'>{item.name}</span>
          </UnstyledLink>
        );
      })}
    </div>
  );
}
