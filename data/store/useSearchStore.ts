import { create } from 'zustand';

interface SearchStoreProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    modalSearch: boolean;
    toggleModalSearch: () => void;
}

const useSearchStore = create<SearchStoreProps>((set) => ({
    modalSearch: false,
    searchTerm: '',
    setSearchTerm: (value) => set({ searchTerm: value }),
    toggleModalSearch: () => set((state) => ({ modalSearch: !state.modalSearch })),
}));

export default useSearchStore;