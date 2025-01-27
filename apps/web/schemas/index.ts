import * as z from "zod";

export const PasswordSchema = z.object({
   password: z.string().min(6,{
        message: "Minimum of 6 characters required"
    })
});


export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is requires"
    })
});


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Password is requires"
    }),
    name: z.string().min(1,{
       message: "Name is required"
    })
});