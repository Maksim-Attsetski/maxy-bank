import { type IUser, UserDto } from '~/entities/users';

export interface ICard<T = string> {
  id: '',
  created_at: '',
  name: '',
  author_id: T;
}

export type TFullCard = ICard<IUser>;

export const CardDto: TFullCard = {
  id: '',
  name: '',
  created_at: '',
  author_id: UserDto
}