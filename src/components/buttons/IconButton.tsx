import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
}

type IconButtonProps = {
  icon: IconType;
  iconClassName?: string;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      disabled,
      iconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          'min-h-[28px] min-w-[28px] rounded-lg p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-500',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border border-primary-500',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className
        )}
        {...rest}
      >
        {Icon && <Icon className={clsxm(iconClassName)} />}
      </button>
    );
  }
);

export default IconButton;
