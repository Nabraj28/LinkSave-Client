import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryModel, CategorySchema } from '@/data/models/CategoryModel';
import upsertModalStyles from '@/styles/upsertStyles';
import GenericModal from '../GenericModal';
import useCategoryStore from '@/data/store/useCategoryStore';
import useAddCategory from '@/data/hooks/Category/useAddCategory';
import Toast from 'react-native-toast-message';

const AddCategoryModal = () => {

    const { colors, theme } = useTheme()
    const styles = upsertModalStyles(colors, theme);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(CategorySchema)
    });
    const {modalAddCategory, toggleModalAddCategory} = useCategoryStore();

    const {mutate, isPending} = useAddCategory({
        cb:()=>{},
        cbSuccess:()=>{
            Toast.show({
                type:'success',
                text1:'Category Added Successfully'
            });
            toggleModalAddCategory();
            reset();
        },
        cbError:()=>{
            Toast.show({
                type:'error',
                text1:'Error While Adding Category'
            })
        }
    });

    const handleCloseModal = () => {
        toggleModalAddCategory();
        reset();
    };

    const onSubmit = (data: CategoryModel) => {
        mutate(data)
    }

    return (
        <GenericModal title='Add Category' onClose={handleCloseModal} visible={modalAddCategory}>
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
                                placeholderTextColor={colors.placeholder}
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
                <TouchableOpacity disabled={isPending} style={styles.upsertButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>
                        {isPending ? "Adding..." : "Add"}
                    </Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    )
}

export default AddCategoryModal;
