import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(30, 'El apellido no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  email: z
    .string()
    .email('Email inválido')
    .toLowerCase(),
  whatsapp: z
    .string()
    .regex(/^\d+$/, 'Solo se permiten números')
    .regex(/^09\d{8}$/, 'WhatsApp debe tener formato 09XXXXXXXX')
    .length(10, 'WhatsApp debe tener 10 dígitos'),
});

export const registerMultipleSchema = z.object({
  firstName1: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  lastName1: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(30, 'El apellido no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  email1: z
    .string()
    .email('Email inválido')
    .toLowerCase(),
  whatsapp1: z
    .string()
    .regex(/^\d+$/, 'Solo se permiten números')
    .regex(/^09\d{8}$/, 'WhatsApp debe tener formato 09XXXXXXXX')
    .length(10, 'WhatsApp debe tener 10 dígitos'),
  firstName2: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  lastName2: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(30, 'El apellido no puede exceder 30 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y tildes'),
  email2: z
    .string()
    .email('Email inválido')
    .toLowerCase(),
  whatsapp2: z
    .string()
    .regex(/^\d+$/, 'Solo se permiten números')
    .regex(/^09\d{8}$/, 'WhatsApp debe tener formato 09XXXXXXXX')
    .length(10, 'WhatsApp debe tener 10 dígitos'),
}).refine((data) => data.email1 !== data.email2, {
  message: 'Los emails deben ser diferentes',
  path: ['email2'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterMultipleFormData = z.infer<typeof registerMultipleSchema>;
