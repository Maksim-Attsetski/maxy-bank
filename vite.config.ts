import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log('Loaded env:', env);

  return {
    ssr: {
      noExternal: ['@supabase/supabase-js'], // 👈 Исключаем Supabase из SSR
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'process.env.VITE_PUBLIC_ENCRYPTION_KEY': JSON.stringify(env.VITE_PUBLIC_ENCRYPTION_KEY),
    },
  };
});
