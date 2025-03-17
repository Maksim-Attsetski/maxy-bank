import { type IUserCard } from '../cards';
import { type IUser } from '../users';

export interface IBankAccount<A = string, C = string> {
  id: string;
  uid: string;
  created_at: string;

  author_id: A;
  card_id: C;
  number: number;
}

export type TFullBankAccount = IBankAccount<IUser, IUserCard>;

export const BankAccountDto = {
  author_id: '',
  card_id: '',
  created_at: '',
  id: '',
  number: 1,
  uid: '',
} as unknown as IBankAccount;
