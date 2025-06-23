import { CategoryResponse } from '@/data/types'
import { create } from 'zustand'

interface CategoryStoreTypes {
    selectedCategory: CategoryResponse | null;
    setSelectedCategory: (value: CategoryResponse | null) => void;
    modalAddCategory: boolean;
    modalEditCategory: boolean;
    modalDeleteCategory: boolean;
    toggleModalAddCategory: () => void;
    toggleModalEditCategory: () => void;
    toggleModalDeleteCategory: () => void

}

const useCategoryStore = create<CategoryStoreTypes>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (value) => set({ selectedCategory: value }),
    modalAddCategory: false,
    modalEditCategory: false,
    modalDeleteCategory: false,
    toggleModalAddCategory: () => set((state) => ({ modalAddCategory: !state.modalAddCategory })),
    toggleModalEditCategory: () => set((state) => ({ modalEditCategory: !state.modalEditCategory })),
    toggleModalDeleteCategory: () => set((state) => ({ modalDeleteCategory: !state.modalDeleteCategory }))

}));

export default useCategoryStore