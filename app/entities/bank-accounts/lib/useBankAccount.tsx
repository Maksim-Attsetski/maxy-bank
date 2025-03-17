import { useEffect } from 'react';

import { useDataBase } from 'app/shared';

import { useBankAccountStore } from '../slice';
import type { IBankAccount } from '../types';
import { useUsers } from 'app/entities/users';

export const useBankAccount = (load: boolean = false) => {
  const { bankAccounts, setBankAccounts } = useBankAccountStore();
  const { onGetSelect, onUpdateData } = useDataBase<IBankAccount>('bank-accounts', {});

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

  const onGetBankAccountBy = async (field: keyof IBankAccount, value: any) => {
    try {
      const res = await onGetSelect().eq(field, value).single();

      if (res.error) throw res.error?.message;
      return res.data as unknown as IBankAccount;
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
    onGetBankAccountBy,
    onUpdateBankAccounts: onUpdateData,
  };
};
