export const isEmailValid = (email: string): string => {
  if (!email) {
    return 'Обязательно к заполнению';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'Введите валидный адрес';
  }

  return '';
};
