import { Appear } from 'app/shared';
import { BecomeClient, Faq } from 'app/widgets';

import type { Route } from './+types/home';
import { Grid, Typography } from '@mui/material';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Maxy Bank' }, { name: 'description', content: 'Добро пожаловать в Maxy Bank' }];
}

export default function Home() {
  return (
    <div className="container">
      <Appear>
        <Grid container gap={2}>
          <Typography variant="h3">Добро пожаловать в </Typography>
          <Typography color="primary" variant="h3">
            Maxy Bank
          </Typography>
        </Grid>
      </Appear>
      <br />
      <BecomeClient />
      <br />
      <div>
        <Typography variant="h4">Лучшие предложения для тебя</Typography>
      </div>
      <br />
      <Faq />
    </div>
  );
}
