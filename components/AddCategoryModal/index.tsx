import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useTheme } from '@/data/hooks/useTheme';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryModel, CategorySchema } from '@/data/models/CategoryModel';
import upsertModalStyles from '@/styles/upsertStyles';
import GenericModal from '../GenericModal';

const AddCategoryModal = ({ isVisible, toggleAddModal }: { isVisible: boolean, toggleAddModal: () => void }) => {

    const { colors } = useTheme()
    const styles = upsertModalStyles(colors);

    const { control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(CategorySchema)
    })

    const handleCloseModal = () => {
        toggleAddModal()
    };

    const onSubmit = (data: CategoryModel) => {
        console.log(data)
    }

    return (
        <GenericModal title='Add Category' onClose={handleCloseModal} visible={isVisible}>
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
                    <Text style={styles.label}>Add</Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    )
}

export default AddCategoryModal;
