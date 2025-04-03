import type { TStatus } from 'app/shared';
import { UserDto, type IUser } from '../users';
import { type IBankAccount } from '../bank-accounts';

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

export type TFullUserCard = IUserCard<IUser, IBankAccount>;
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

const date = new Date();
date.setFullYear(date.getFullYear() + 4);

export const UserCardDto: TFullUserCard = {
  id: '',
  uid: '',
  created_at: '',
  archived_at: null,
  blocked_at: null,
  expire_at: date.toLocaleDateString(),
  card_number: 1111222233334444,
  cvv: 123,
  name: 'Карта 1',
  card_bg: 1,
  pin: 2123,
  bank_account_id: {
    author_id: '',
    card_id: '',
    created_at: '',
    id: '',
    number: 1,
    uid: '',
    balance: 0,
  },
  author_id: UserDto,
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
