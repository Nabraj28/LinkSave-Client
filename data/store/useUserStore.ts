import { create } from 'zustand';

interface UserStoreProps {
    modalDeleteUser: boolean;
    toggleModalDeleteUser: () => void;
}


const useUserStore = create<UserStoreProps>((set) => ({
    modalDeleteUser: false,
    toggleModalDeleteUser: () => set((state) => ({ modalDeleteUser: !state.modalDeleteUser }))
}));

export default useUserStore;