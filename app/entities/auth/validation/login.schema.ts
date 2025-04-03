import { z } from 'zod';

const required_error = 'Поле обязательное';

export const loginSchema = z.object({
  email: z.string({ required_error }).email('Введите валидный email'),
  password: z.string({ required_error }).min(2, 'Минимум 2 символа').max(20, 'До 20 символов'),
});

export type TLoginForm = z.infer<typeof loginSchema>;
