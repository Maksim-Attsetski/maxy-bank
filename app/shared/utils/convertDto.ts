export const convertDto = (dto: {}): string => {
  let res = '';

  const keys = Object.keys(dto);

  for (let inx = 0; inx < keys.length; inx++) {
    const key = keys[inx] as keyof typeof dto;
    if (typeof dto[key] === 'object') {
      if (dto[key]) {
        const isLast: boolean = !keys[inx + 1];
        res += key + '(' + Object.keys(dto[key]).join(',') + (isLast ? ')' : '),');
      } else {
        res += key + ', ';
      }
    } else {
      res += key + ', ';
    }
  }

  return res;
};
