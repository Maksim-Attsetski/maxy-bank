import { UserDto, type IUser } from '../users';

export interface ICard {
  id: string;
  uid: string;
  created_at: string;
  name: string;
  tags: string[];
  benefits: string[];
  description: string;
  price: number;
  service_fee: number;
}
export interface IBankAccount<A = string, C = string> {
  id: string;
  uid: string;
  created_at: string;

  author_id: A;
  card_id: C;
  number: number;
}
export interface IUserCard<A = string, B = string> {
  id: string;
  uid: string;
  created_at: string;
  name: string;
  author_id: A;
  bank_account_id: B;
  card_number: number;
  cvv: number;
  expire_at: string | null;
  blocked_at: string | null;
  archived_at: string | null;
  pin: number;
  card_bg: number;
}

export type TFullBankAccount = IBankAccount<IUser, IUserCard>;
export type TFullUserCard = IUserCard<IUser, TFullBankAccount>;

export const CardDto: ICard = {
  id: '',
  uid: '',
  description: '',
  price: 0,
  service_fee: 0,
  tags: '' as unknown as string[],
  benefits: '' as unknown as string[],
  name: '',
  created_at: '',
};

export const BankAccountDto = {} as TFullBankAccount;

export const UserCardDto: TFullUserCard = {
  id: '',
  uid: '',
  created_at: '',
  archived_at: null,
  blocked_at: null,
  expire_at: null,
  card_number: 0,
  cvv: 0,
  name: '',
  card_bg: 1,
  pin: 0,
  author_id: UserDto,
  bank_account_id: BankAccountDto,
};
