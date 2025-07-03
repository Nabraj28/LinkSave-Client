import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import addStyles from '@/styles/addStyles';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import useAddLink from '@/data/hooks/Link/useAddLink';
import useGetUserData from '@/data/hooks/User/useGetUserData';
import { LinkModel, LinkSchema } from '@/data/models/LinkModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import useCategoryStore from '@/data/store/useCategoryStore';
import DropDownPicker from 'react-native-dropdown-picker';

const Add: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = addStyles();

    const [open, setOpen] = useState<boolean>(false);

    const { data } = useGetUserData();
    const categories = data?.user.categories;

    const { selectedCategory, setSelectedCategory } = useCategoryStore();

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(LinkSchema)
    });

    const { mutate, isPending } = useAddLink({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Link Added Successfully'
            });
            reset();
        },
        cbError: (error) => {
            if (error.response) {
                const { status } = error.response;

                if (status === 409) {
                    Toast.show({
                        type: 'error',
                        text1: `Link with this Name/URL already exists`
                    })
                } else if (status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: `Server Busy, Please try again later`
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: `Error: ${error.message}`
                    })
                }
            }
        }
    })

    const onSubmit = (data: LinkModel) => {
        mutate({
            categoryId: selectedCategory?._id,
            payload: data
        })
    };


    return (
        <View style={styles.addContainer}>
            <Text style={styles.headerText}>Add Link</Text>
            <View>
                <Text style={styles.label}>Title</Text>
                <Controller
                    control={control}
                    name='title'
                    render={({ field: { value, onBlur, onChange } }) => (
                        <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder='Enter Link Title'
                            style={styles.input}
                            placeholderTextColor={colors.placeholder}
                        />
                    )}
                />
                {errors.title && (
                    <Text style={styles.errorText}>
                        {errors.title.message}
                    </Text>
                )}
            </View>
            <View>
                <Text style={styles.label}>Url</Text>
                <Controller
                    control={control}
                    name='url'
                    render={({ field: { value, onBlur, onChange } }) => (
                        <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder='Enter Link URL'
                            style={styles.input}
                            placeholderTextColor={colors.placeholder}
                        />
                    )}
                />
                {errors.url && (
                    <Text style={styles.errorText}>
                        {errors.url.message}
                    </Text>
                )}
            </View>
            <View>
                <Text style={styles.label}>Select Category</Text>
                <Controller
                    control={control}
                    name="categoryId"
                    render={({ field: { onChange, value } }) => (
                        <DropDownPicker
                            open={open}
                            setOpen={setOpen}
                            value={value}
                            setValue={(callback) => {
                                const value = callback(selectedCategory?._id || null);
                                onChange(value);
                                const selected = categories?.find(category => category._id === value);
                                setSelectedCategory(selected || null);
                            }}
                            items={categories?.map(category => ({
                                label: category.name,
                                value: category._id
                            })) || []}
                            placeholder="Select Category"
                            placeholderStyle={styles.placeHolder}
                            style={styles.dropDown}
                            dropDownContainerStyle={styles.dropDownOptions}
                            textStyle={styles.label}
                            listItemLabelStyle={styles.label}
                            zIndex={3000}
                            zIndexInverse={1000}
                            listMode="SCROLLVIEW"
                        />
                    )}
                />
                {errors.categoryId && (
                    <Text style={styles.errorText}>
                        {errors.categoryId.message}
                    </Text>
                )}
            </View>
            <TouchableOpacity disabled={isPending} style={styles.addButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.addButtonText}>
                    {isPending ? <ActivityIndicator color={'white'} /> : 'Add'}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default Add;
