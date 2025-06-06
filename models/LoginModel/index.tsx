import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least six characters long' })
})

export type LoginModel = z.infer<typeof LoginSchema>