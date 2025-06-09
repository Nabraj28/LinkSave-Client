import { CategoryResponse } from '@/types'
import { create } from 'zustand'

interface CategoryStoreTypes {
    selectedCategory: CategoryResponse | null,
    setSelectedCategory: (value: CategoryResponse | null) => void
}

const useCategoryStore = create<CategoryStoreTypes>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (value) => set({ selectedCategory: value })
}));

export default useCategoryStore