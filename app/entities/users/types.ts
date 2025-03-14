export interface IUser {
  id: number;
  uid: string;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  birthed_at: string;
  gender: TUserGender;
  type: TUserType;
  updated_at: string;
}

export type TUserGender = 'MALE' | 'FEMALE';
export type TUserType = 'USER' | 'COMPANY';

export const UserDto: IUser = {
  id: 1,
  uid: '',
  email: '',
  gender: 'MALE',
  type: 'USER',
  first_name: '',
  last_name: '',
  middle_name: '',
  updated_at: '',
  created_at: '',
  birthed_at: '',
};
