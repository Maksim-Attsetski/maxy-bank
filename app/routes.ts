import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('shared/components/AppLayout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('support', 'routes/support.tsx'),
  ]),
] satisfies RouteConfig;
