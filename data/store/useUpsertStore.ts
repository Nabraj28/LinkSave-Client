import { create } from 'zustand';


interface UpsertTypes {
    isUpsertOpen: boolean
    setIsUpsertOpen: (value: boolean) => void
}

const useUpsertStore = create<UpsertTypes>((set) => ({
    isUpsertOpen: false,
    setIsUpsertOpen: (value) => set({ isUpsertOpen: value })
}));

export default useUpsertStore;