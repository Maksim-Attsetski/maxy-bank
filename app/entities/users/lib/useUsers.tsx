import { useDataBase } from '~/shared';
import { useUsersStore } from '../slice';
import type { IUser } from '../types';

export const useUsers = () => {
  const { user, updateUser } = useUsersStore();
  const { onGetSelect, onCreateData, onDeleteData, onUpdateData } = useDataBase<IUser>('users', {
    create: updateUser,
    delete: () => updateUser(null),
    update: updateUser,
  });

  const onGetUser = async (uid: string) => {
    try {
      const response = await onGetSelect().eq('uid', uid).single();

      if (response.error) throw new Error(response.error?.message);

      updateUser(response?.data as unknown as IUser | null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    user,
    onGetUser,
    onCreateUser: onCreateData,
    onDeleteUser: onDeleteData,
    onUpdateUser: onUpdateData,
    setUser: updateUser,
  };
};
