import React from 'react'
import DeleteModal from '../DeleteModal'
import Toast from 'react-native-toast-message';
import useCategoryStore from '@/data/store/useCategoryStore';
import useDeleteCategory from '@/data/hooks/Category/useDeleteCategory';

const DeleteCategoryModal: React.FunctionComponent = () => {

    const { modalDeleteCategory, toggleModalDeleteCategory, selectedCategory } = useCategoryStore();

    const { isPending: isDelteCategoryPending, mutate: deleteCategory } = useDeleteCategory({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Category Deleted Successfully'
            });
            toggleModalDeleteCategory();
        },
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Error on Deleting Category'
            })
        }
    });

    const deleteText = "category?. This will delete all the links existing in this category."

    const handleDeleteCategory = () => {
        deleteCategory({ categoryId: selectedCategory?._id })
    }

    return (
        <DeleteModal
            text={deleteText}
            pending={isDelteCategoryPending}
            isVisible={modalDeleteCategory}
            onModalClose={toggleModalDeleteCategory}
            onDelete={handleDeleteCategory}
        />
    )
}

export default DeleteCategoryModal