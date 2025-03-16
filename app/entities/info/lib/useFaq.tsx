import { useEffect, useMemo } from 'react';

import { useDataBase } from 'app/shared';

import { useInfoStore } from '../slice';
import type { IFaq } from '../types';

export const useFaq = (load: boolean = false) => {
  const { faq, setFaq } = useInfoStore();
  const { onGetData } = useDataBase<IFaq>('faq', { set: setFaq });

  const onGetCards = async () => {
    if (faq.length > 0) return;
    await onGetData();
  };

  useEffect(() => {
    if (load) onGetCards();
  }, [load]);

  return {
    faq,
    onGetCards,
  };
};
