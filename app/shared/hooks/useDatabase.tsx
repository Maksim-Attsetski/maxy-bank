import type { StoreApi, UseBoundStore } from 'zustand';
import { convertDto, supabase } from '../utils';

interface ICrudFunctions {
  set?: (d: any[]) => void;
  create?: (d: any) => void;
  update?: (d: any) => void;
  delete?: (d: string) => void;
}

export function useDataBase<T>(url: string, crudFunc: ICrudFunctions, dto?: object) {
  const onGetSelect = (select: string = '*') => {
    return supabase.from(url).select(select);
  };

  const onGetData = async (select: string = '*') => {
    try {
      const response = await onGetSelect(select);

      if (response?.error) throw new Error(response?.error?.message);

      crudFunc?.set?.(response.data as T[]);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateData = async (values: Partial<T & { uid: string }>) => {
    try {
      if (!values?.uid) throw new Error('uid обязательный параметр!');
      const response = await supabase.from(url).update(values).eq('uid', values?.uid).select('*');

      if (response?.error) throw new Error(response?.error?.message);

      crudFunc?.update?.(response.data as T);
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateData = async (values: T) => {
    try {
      const response = await supabase
        .from(url)
        .insert([values])
        .select(dto ? convertDto(dto) : undefined)
        .single();

      if (response?.error) throw new Error(response?.error?.message);

      crudFunc?.create?.(response.data as T);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteData = async (uid: string, idType: 'uid' | 'id' = 'uid') => {
    try {
      const response = await supabase.from(url).delete().eq(idType, uid);

      if (response?.error) throw new Error(response?.error?.message);

      crudFunc?.delete?.(uid);
    } catch (error) {
      console.error(error);
    }
  };

  return { onCreateData, onGetData, onDeleteData, onUpdateData, onGetSelect };
}
