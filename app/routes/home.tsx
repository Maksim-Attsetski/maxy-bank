import { Appear } from 'app/shared';
import { BecomeClient, Faq } from 'app/widgets';

import type { Route } from './+types/home';
import { theme, Typography } from 'antd';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Maxy Bank' }, { name: 'description', content: 'Добро пожаловать в Maxy Bank' }];
}

export default function Home() {
  const { token } = theme.useToken();
  return (
    <div className="container">
      <Appear>
        <Typography.Title level={2}>
          Добро пожаловать в{' '}
          <Typography.Text style={{ color: token.colorPrimary, fontSize: 32 }}>
            Maxy Bank
          </Typography.Text>
        </Typography.Title>
      </Appear>
      <br />
      <BecomeClient />
      <br />
      <div>
        <h3>Лучшие предложения для тебя</h3>
      </div>
      <br />
      <Faq />
    </div>
  );
}
