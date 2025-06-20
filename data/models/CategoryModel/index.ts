import * as z from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(3, { message: 'Category name must be at least three characters long' })
})

export type CategoryModel = z.infer<typeof CategorySchema>