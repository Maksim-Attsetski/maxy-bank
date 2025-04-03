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
  avatar: string | null;
  updated_at: string | null;
}

export interface IUserAddress {
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  house: string;
  building: string;
  apartment: string;
  postal_code: string;
}

export interface IUserDocument<T = string> {
  passport_number: string;
  issued_by: string;
  identification_number: string;
  issued_at: string;
  expire_at: string;
  address_reg: IUserAddress;
  address_live: IUserAddress;

  user_id: T;
  id: string;
  created_at: string;
  updated_at: string | null;
}

export type TUserGender = 'MALE' | 'FEMALE';
export type TUserType = 'USER' | 'COMPANY';

export const AddressDto: IUserAddress = {
  country: '',
  region: '',
  city: '',
  district: '',
  street: '',
  house: '',
  building: '',
  apartment: '',
  postal_code: '',
};

export const DocumentDto: IUserDocument = {
  passport_number: 'MP3334455',
  issued_by: 'Лучший район',
  identification_number: '8494434A344PB6',
  issued_at: new Date().toLocaleDateString(),
  expire_at: new Date().toLocaleDateString(),
  address_reg: AddressDto,
  address_live: AddressDto,
  created_at: '',
  id: '',
  updated_at: null,
  user_id: '',
};

export const UserDto: IUser = {
  id: 1,
  uid: '',
  email: '',
  gender: 'MALE',
  type: 'USER',
  first_name: 'Тестер',
  last_name: 'Тестерович',
  middle_name: '',
  updated_at: '',
  created_at: '',
  birthed_at: '',
  avatar: null,
};
