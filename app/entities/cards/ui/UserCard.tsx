import { type FC, memo, useMemo, useState } from 'react';

import type { TFullUserCard } from '../types';
import { useNavigate } from 'react-router';
import { Box, Grid, Typography } from '@mui/material';

import logo from 'app/assets/logo.png';
import chip from 'app/assets/chip.png';

interface IProps {
  card: TFullUserCard;
}

const UserCard: FC<IProps> = ({ card }) => {
  const navigate = useNavigate();
  const [cvvVisible, setCvvVisible] = useState<boolean>(false);

  const formatedCardNumber = useMemo(
    () => (card?.card_number + '').replace(/(\d{4})(?=\d)/g, '$1 '),
    [card?.card_number]
  );

  const formatedExpireDate = useMemo(() => {
    const date = new Date(card?.expire_at ?? new Date());
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2, 4);
    return (month < 10 ? '0' + month : month) + '/' + year;
  }, [card?.expire_at]);

  return (
    <Box
      sx={{
        width: 300,
        height: 150,
        p: 2,
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(9, 58, 101, 0.8), rgba(191, 187, 187, 0.8))',
        color: '#fff',
      }}
    >
      <Grid container flexWrap={'nowrap'}>
        <Typography color="inherit">{card?.name}</Typography>
        <Box sx={{ marginLeft: 'auto', borderRadius: 4, bgcolor: '#fff' }}>
          <img src={logo} alt="logo" width={40} />
        </Box>
      </Grid>
      <img src={chip} style={{ marginTop: -4 }} alt="chip" width={45} />
      <Typography color="inherit" textAlign={'center'} fontSize={20} fontWeight={500}>
        {formatedCardNumber}
      </Typography>
      <Grid container justifyContent={'space-between'}>
        <Typography color="inherit">{formatedExpireDate}</Typography>
        <Typography
          color="inherit"
          sx={{ cursor: 'pointer' }}
          onClick={() => setCvvVisible((prev) => !prev)}
        >
          {cvvVisible ? card?.cvv : 'CVV'}
        </Typography>
      </Grid>
      <Typography color="inherit">
        {card?.author_id?.first_name?.toUpperCase?.()} {card?.author_id?.last_name?.toUpperCase?.()}
      </Typography>
    </Box>
  );
};

export default memo(UserCard);
