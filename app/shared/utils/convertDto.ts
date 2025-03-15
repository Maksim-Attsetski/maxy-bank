export const convertDto = (dto: {}): string => {
  let res = '';

  for (const k in dto) {
    if (Object.prototype.hasOwnProperty.call(dto, k)) {
      const key = k as keyof typeof dto;
      if (typeof dto[key] === 'object') {
        if (dto[key]) {
          res += key + '(' + Object.keys(dto[key]).join(',') + ')';
        } else {
          res += key + ', ';
        }
      } else {
        res += key + ', ';
      }
    }
  }

  return res;
};
