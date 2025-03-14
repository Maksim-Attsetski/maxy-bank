import { decode, useDataBase } from 'app/shared';
import { useUsersStore } from '../slice';
import type { IUserDocument } from '../types';

export const useUserDocuments = () => {
  const { updateUserDocument, userDocument, user } = useUsersStore();
  const { onGetSelect, onCreateData, onDeleteData, onUpdateData } = useDataBase<IUserDocument>(
    'user-docs',
    {
      create: updateUserDocument,
      delete: () => updateUserDocument(null),
      update: updateUserDocument,
    }
  );

  const onGetUserDoc = async () => {
    try {
      if (userDocument) return;
      const response = await onGetSelect().eq('user_id', user?.uid).single();

      if (response.error) throw new Error(response.error?.message);

      if (response.data) {
        const doc = response?.data as unknown as IUserDocument;
        const identification_number = await decode(doc?.identification_number);
        const passport_number = await decode(doc?.passport_number);
        console.log('🔑 Расшифровано:', identification_number, passport_number);

        updateUserDocument({
          ...doc,
          identification_number,
          passport_number,
        } as unknown as IUserDocument | null);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    userDocument,
    onGetUserDoc,
    onCreateUserDoc: onCreateData,
    onDeleteUserDoc: onDeleteData,
    onUpdateUserDoc: onUpdateData,
    setUserDoc: updateUserDocument,
  };
};
