import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '@/data/hooks/useTheme'
import upsertModalStyles from '@/styles/upsertStyles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryModel, CategorySchema } from '@/data/models/CategoryModel';
import useCategoryStore from '@/data/store/useCategoryStore';
import GenericModal from '../GenericModal';

interface EditCategoryProps {
    isEditOpen: boolean
    toggleEditModal: () => void
}

const EditCategoryModal = ({ toggleEditModal, isEditOpen }: EditCategoryProps) => {

    const { colors } = useTheme();
    const styles = upsertModalStyles(colors);

    const { selectedCategory } = useCategoryStore();

    const { control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: selectedCategory?.name || ''
        }
    });

    const handleDelete = () => { };
    const onSubmit = (data: CategoryModel) => {
        console.log(data);
    };

    return (
        <GenericModal title='Edit Category' onClose={toggleEditModal} visible={isEditOpen}>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.label}>Category Name</Text>
                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onBlur, onChange } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder='Enter Category Name'
                                style={styles.nameInput}
                            />
                        )}
                    />
                    {errors.name && (
                        <Text style={styles.errorText}>
                            {errors.name.message}
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.upsertButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.label}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={styles.label}>Delete</Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    )
}

export default EditCategoryModal