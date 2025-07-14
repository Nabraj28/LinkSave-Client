import React from 'react';
import DeleteModal from '../DeleteModal';
import useUserStore from '@/data/store/useUserStore';
import useDeleteUser from '@/data/hooks/User/useDeleteUser';
import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const DeleteAccountModal: React.FunctionComponent = () => {

    const { authState } = useAuth();
    const { modalDeleteUser, toggleModalDeleteUser } = useUserStore();
    const { mutate, isPending } = useDeleteUser({
        cb: () => { },
        cbSuccess: async () => {
            Toast.show({
                type: 'success',
                text1: 'Account Deleted Successfully'
            })
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('authToken');
            window.location.reload();
        },
        cbError: (error) => {
            console.log('Full error:', error.response?.data || error.message);
            Toast.show({
                type: 'error',
                text1: 'Error While Deleting Account',
                text2: 'Please Re-Login and Try Again'
            })
        }
    });

    const handleDeleteLink = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            console.log('No Token')
        } else {
            console.log('Token exists')
        }
        mutate(authState.user?._id)
    };

    return (
        <DeleteModal
            text={'Account'}
            pending={isPending}
            isVisible={modalDeleteUser}
            onModalClose={toggleModalDeleteUser}
            onDelete={handleDeleteLink}
        />
    )
}

export default DeleteAccountModal