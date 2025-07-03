import React from 'react'
import useDeleteLink from '@/data/hooks/Link/useDeleteLink';
import Toast from 'react-native-toast-message';
import useLinkStore from '@/data/store/useLinkStore';
import DeleteModal from '../DeleteModal';

const DeleteLinkModal: React.FunctionComponent = () => {

    const { modalDeleteLink, toggleModalDeleteLink, id } = useLinkStore();

    const { isPending: isDelteLinkPending, mutate: deleteLink } = useDeleteLink({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Link Deleted Successfully'
            });
            toggleModalDeleteLink();
        },
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Error on Deleting Link'
            })
        }
    });

    const handleDeleteLink = () => {
        deleteLink({ linkId: id })
    };

    return (
        <DeleteModal
            text={'link'}
            pending={isDelteLinkPending}
            isVisible={modalDeleteLink}
            onModalClose={toggleModalDeleteLink}
            onDelete={handleDeleteLink}
        />
    )
}

export default DeleteLinkModal