export const colors = {
  light: {
    primary: '#3772FF',
    background: '#e9e9e9',
  },
  dark: {
    primary: '#3772FF',
    background: '#e9e9e9',
  },
};

export const routes = {
  home: 'home',
  profile: 'profile',
  about: 'about',
  support: 'support',
  cards: 'cards',
  currency_exchange: 'currency_exchange',
  deposits: 'deposits',
};

export const authRoutes = {
  signup: 'signup',
  login: 'login',
};

const sbUrl = 'https://ptpiibeyfahlotxjmnqa.supabase.co';
export const imagesUrl = sbUrl + '/storage/v1/object/public/images/';
export const avatarsImagesUrl = imagesUrl + 'user-avatars/';
export const cardsImagesUrl = imagesUrl + 'cards/';
