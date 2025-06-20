import * as z from 'zod';

export const RegisterSchema = z.object({
    username: z.string().min(4, { message: 'Username must be at least four characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least six characters long' })
})

export type RegisterModel = z.infer<typeof RegisterSchema>