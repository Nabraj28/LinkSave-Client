import { create } from 'zustand';
import useDeleteLink from '../hooks/Link/useDeleteLink';

interface LinkStoreProps {
    id: string,
    setLinkId: (id: string) => void
    modalDeleteLink: boolean,
    toggleModalDeleteLink: () => void,
}

const useLinkStore = create<LinkStoreProps>((set) => ({
    id: '',
    setLinkId: (id) => set({ id }),
    modalDeleteLink: false,
    toggleModalDeleteLink: () => set((state) => ({ modalDeleteLink: !state.modalDeleteLink })),
}))

export default useLinkStore