import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Пароль должен содержать минимум 8 символов' });
