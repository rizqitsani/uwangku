import { UseTRPCMutationResult } from '@trpc/react-query/shared';
import * as React from 'react';
import toast from 'react-hot-toast';

import { isTRPCClientError } from '@/lib/trpc';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

type OptionType = {
  loading?: string;
  success?: string;
  error?: string;
};

export default function useMutationToast<T, E, V, C>(
  mutation: UseTRPCMutationResult<T, E, V, C>,
  customMessages: OptionType = {}
) {
  const { data, isError, isLoading, error } = mutation;

  const toastStatus = React.useRef<string>(data ? 'done' : 'idle');
  const toastMessage = {
    ...DEFAULT_TOAST_MESSAGE,
    ...customMessages,
  };

  React.useEffect(() => {
    // If it is not the first render
    if (toastStatus.current === 'done' && !isLoading) return;

    if (isError && isTRPCClientError(error)) {
      toast.error(error.shape?.message || toastMessage.error);
    } else if (isError) {
      toast.error(toastMessage.error, {
        id: toastStatus.current,
      });
      toastStatus.current = 'done';
    } else if (isLoading) {
      toastStatus.current = toast.loading(toastMessage.loading);
    } else if (data) {
      toast.success(toastMessage.success, { id: toastStatus.current });
      toastStatus.current = 'done';
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
  }, [
    data,
    error,
    isError,
    isLoading,
    toastMessage.error,
    toastMessage.loading,
    toastMessage.success,
  ]);

  return { ...mutation };
}
