import { useEffect } from 'react';

import { useDataBase } from 'app/shared';

import { useInfoStore } from '../slice';
import type { IBankAccount } from '../types';
import { useUsers } from 'app/entities/users';

export const useBankAccount = (load: boolean = false) => {
  const { bankAccounts, setBankAccounts } = useInfoStore();
  const { onGetSelect } = useDataBase<IBankAccount>('bank-accounts', {});

  const { user } = useUsers();

  const onGetBankAccounts = async () => {
    try {
      if (bankAccounts.length > 0 || !user?.uid) return;
      const res = await onGetSelect().eq('user_id', user?.uid);

      if (res.error) throw res.error?.message;

      setBankAccounts((res?.data as unknown as IBankAccount[]) ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (load) onGetBankAccounts();
  }, [load]);

  return {
    bankAccounts,
    onGetBankAccounts,
  };
};
