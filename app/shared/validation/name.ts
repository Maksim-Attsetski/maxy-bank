export const isNameValid = (name: string): string => {
  if (!name) {
    return 'Обязательно к заполнению';
  } else if (!/[а-яА-Я]/.test(name)) {
    return 'Вводите только кириллицу';
  } else if (name.length < 2) {
    return 'Минимум 2 символа';
  }
  const firstLetter = name.substring(0, 1);
  if (firstLetter !== firstLetter.toUpperCase()) {
    return '1 буква должна быть заглавной';
  }

  return '';
};
