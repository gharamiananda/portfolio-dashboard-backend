"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }).refine((val) => val.length >= 8 && val.length <= 16, {
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
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().refine((val) => val.length >= 8 && val.length <= 16, {
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
        email: zod_1.z.string({ required_error: 'Email is required' }),
        name: zod_1.z.string({ required_error: 'Name is required' }),
    })
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'User id is required!',
        }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'User id is required!',
        }),
        newPassword: zod_1.z.string({
            required_error: 'User password is required!',
        }),
    }),
});
exports.AuthValidations = {
    loginValidationSchema,
    registerValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
