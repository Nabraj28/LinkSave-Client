import React from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useTheme } from "@/data/hooks/Theme/useTheme";
import upsertModalStyles from "@/styles/upsertStyles";
import useCategoryStore from "@/data/store/useCategoryStore";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryModel, CategorySchema } from "@/data/models/CategoryModel";
import Toast from "react-native-toast-message";
import useUpdateCategory from "@/data/hooks/Category/useUpdateCategory";
import GenericModal from "../GenericModal";


const EditCategoryModal: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = upsertModalStyles(colors);

    const { selectedCategory, modalEditCategory, toggleModalEditCategory, toggleModalDeleteCategory } = useCategoryStore();

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(CategorySchema),
    });

    const { mutate, isPending } = useUpdateCategory({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Category Updated Successfully'
            });
            toggleModalEditCategory();
        },
        cbError: (error) => {
            if (error.response) {
                const { status } = error.response;

                if (status === 409) {
                    Toast.show({
                        type: 'error',
                        text1: 'Category with this name already exists'
                    })
                } else if (status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Server Error',
                        text2: 'Please try again later'
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error while updating Category'
                    })
                }
            }
        }
    });

    const handleDelete = () => {
        toggleModalEditCategory();
        toggleModalDeleteCategory();
    };

    const onSubmit = (data: CategoryModel) => {
        mutate({
            categoryId: selectedCategory?._id,
            payload: data
        })
    };

    const closeModal = () => {
        toggleModalEditCategory();
        reset();
    }

    return (
        <GenericModal
            title="Edit Category"
            onClose={closeModal}
            visible={modalEditCategory}
        >
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.label}>Category Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onBlur, onChange } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Enter Category Name"
                                style={styles.nameInput}
                                placeholderTextColor={colors.placeholder}
                                defaultValue={selectedCategory?.name}
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.upsertButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending}
                >
                    <Text style={styles.buttonText}>
                        {isPending ? <ActivityIndicator color='white' /> : 'Update'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    );
};

export default EditCategoryModal;
