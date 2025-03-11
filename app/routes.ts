import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';
import { authRoutes, routes } from './shared';

export default [
  route(authRoutes.signup, 'routes/signup.tsx'),
  route(authRoutes.login, 'routes/login.tsx'),
  layout('shared/components/AppLayout.tsx', [
    index('routes/home.tsx'),
    route(routes.about, 'routes/about.tsx'),
    route(routes.support, 'routes/support.tsx'),
    route(routes.cards, 'routes/cards.tsx'),
    route(routes.currency_exchange, 'routes/currency_exchange.tsx'),
    route(routes.deposits, 'routes/deposits.tsx'),
  ]),
] satisfies RouteConfig;
