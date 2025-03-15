import type { TStatus } from 'app/shared';
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

  currencies: string[]; // Валюты, в которых доступна карта
  limit: number | null; // Лимит по карте (null, если безлимитная)
  is_virtual: boolean;
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
export interface ICardRequest<C = string, U = string> {
  id: string;
  created_at: string;

  status: TStatus;
  rejected_at: string | null;
  reject_reason: string | null;
  description: string | null;

  card_id: C;
  user_id: U;
}

export type TFullBankAccount = IBankAccount<IUser, IUserCard>;
export type TFullUserCard = IUserCard<IUser, TFullBankAccount>;
export type TFullCardRequest = ICardRequest<ICard>;

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
  currencies: [],
  is_virtual: false,
  limit: 0,
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

export const CardRequestDto = {
  created_at: '',
  description: '',
  id: '',
  reject_reason: '',
  status: 'PENDING',
  rejected_at: null,
  card_id: CardDto,
} as ICardRequest<ICard>;
