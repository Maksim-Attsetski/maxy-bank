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
