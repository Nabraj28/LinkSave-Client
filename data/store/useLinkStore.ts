import { create } from 'zustand';
import { Link } from '../types';

interface LinkStoreProps {
    selectedLink: Link | null;
    setSelectedLink: (value: Link | null) => void;
    id: string;
    setLinkId: (id: string) => void;
    modalDeleteLink: boolean;
    toggleModalDeleteLink: () => void;
    modalEditLink: boolean;
    toggleModalEditLink: () => void;
}

const useLinkStore = create<LinkStoreProps>((set) => ({
    selectedLink: null,
    setSelectedLink: (value) => set({ selectedLink: value }),
    id: '',
    setLinkId: (id) => set({ id }),
    modalDeleteLink: false,
    modalEditLink: false,
    toggleModalDeleteLink: () => set((state) => ({ modalDeleteLink: !state.modalDeleteLink })),
    toggleModalEditLink: () => set((state) => ({ modalEditLink: !state.modalEditLink }))
}))

export default useLinkStore