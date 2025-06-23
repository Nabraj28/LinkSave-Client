import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useTheme } from "@/data/hooks/useTheme";
import upsertModalStyles from "@/styles/upsertStyles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryModel, CategorySchema } from "@/data/models/CategoryModel";
import useCategoryStore from "@/data/store/useCategoryStore";
import GenericModal from "../GenericModal";
import Toast from "react-native-toast-message";
import useUpdateCategory from "@/data/hooks/Category/useUpdateCategory";


const EditCategoryModal = () => {

    const { colors } = useTheme();
    const styles = upsertModalStyles(colors);

    const { selectedCategory, modalEditCategory, toggleModalEditCategory, toggleModalDeleteCategory } = useCategoryStore();

    const {mutate, isPending} = useUpdateCategory({
        cb:()=>{},
        cbSuccess:()=>{
            Toast.show({
                type:'success',
                text1:'Category Updated Successfully'
            });
            toggleModalEditCategory();
        },
        cbError:()=>{
            Toast.show({
                type:'error',
                text1:'Error while updating Category'
            })
        }
    });


    const { control, formState: { errors }, handleSubmit, } = useForm({
        resolver: zodResolver(CategorySchema),
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

    return (
        <GenericModal
            title="Edit Category"
            onClose={toggleModalEditCategory}
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
                        {isPending ? 'Updating...':'Update'}
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
