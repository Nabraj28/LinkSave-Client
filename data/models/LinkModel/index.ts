import * as z from 'zod';

export const LinkSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least three characters long' }),
    url: z.string().url({ message: 'Please fill the valid url' })
})

export type LinkModel = z.infer<typeof LinkSchema>