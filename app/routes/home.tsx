import { Appear } from 'app/shared';
import { Faq } from 'app/widgets';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Maxy Bank' }, { name: 'description', content: 'Добро пожаловать в Maxy Bank' }];
}

export default function Home() {
  return (
    <div className="container">
      <br />
      <Appear>
        <h2>
          Добро пожаловать в{' '}
          <span className="bg-primary py-1 px-3 text-text rounded-2xl">Maxy Bank</span>
        </h2>
      </Appear>
      <br />
      <Faq />
    </div>
  );
}
