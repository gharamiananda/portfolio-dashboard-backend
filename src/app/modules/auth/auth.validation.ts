import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }).refine((val) => val.length >= 8 && val.length <= 16, {
      message: "Password must be between 8 and 16 characters long",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Password must contain at least one special character",
    }),
  }),
});


const registerValidationSchema = z.object({
  body: z.object({

  password:z.string().refine((val) => val.length >= 8 && val.length <= 16, {
    message: "Password must be between 8 and 16 characters long",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character",
  }),
  email:z.string({ required_error: 'Email is required' }),
  name:z.string({ required_error: 'Name is required' }),

  })
 
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  registerValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};