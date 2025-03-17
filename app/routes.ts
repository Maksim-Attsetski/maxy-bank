import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';
import { authRoutes, routes } from './shared';

export default [
  route(authRoutes.signup, 'routes/signup.tsx'),
  route(authRoutes.login, 'routes/login.tsx'),
  layout('shared/components/AppLayout.tsx', [
    index('routes/home.tsx'),
    route(routes.about, 'routes/about.tsx'),
    route(routes.support, 'routes/support.tsx'),
    route(routes.currency_exchange, 'routes/currency-exchange.tsx'),
    route(routes.deposits, 'routes/deposits.tsx'),

    ...prefix('cards', [
      index('routes/cards/index.tsx'),
      route('add', 'routes/cards/add.tsx'),
      route(':uid', 'routes/cards/card.tsx'),
    ]),

    ...prefix('money-transfer', [
      index('routes/money-transfer/index.tsx'),
      route(':uid', 'routes/money-transfer/from.tsx'),
    ]),

    ...prefix('profile', [
      index('routes/profile/private_cabinet.tsx'),
      route(':uid', 'routes/profile/profile.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
