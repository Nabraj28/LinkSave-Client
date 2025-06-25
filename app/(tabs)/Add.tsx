import useAddLink from '@/data/hooks/Link/useAddLink';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import useGetUserData from '@/data/hooks/User/useGetUserData';
import { LinkModel, LinkSchema } from '@/data/models/LinkModel';
import addStyles from '@/styles/addStyles';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import useCategoryStore from '@/data/store/useCategoryStore';

const Add: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = addStyles();

    const { data, isLoading } = useGetUserData();
    const categories = data?.user.categories || [];

    const {selectedCategory, setSelectedCategory} = useCategoryStore();

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(LinkSchema)
    });

    const {mutate, isPending} = useAddLink({
        cb:()=>{},
        cbSuccess:()=>{
            Toast.show({
                type:'success',
                text1: 'Link Added Successfully'
            });
            reset();
        },
        cbError:(error)=>{
            Toast.show({
                type:'error',
                text1: `Error: ${error.message}`
            })
        }
    })

    const onSubmit = (data: LinkModel) => {
        mutate({
            categoryId: selectedCategory?._id,
            payload: data
        })
    }

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
                            placeholder='Enter Category Name'
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
                            placeholder='Enter Category Name'
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
                <Dropdown
                    search={false}
                    value={selectedCategory}
                    data={categories}
                    labelField='name'
                    valueField='name'
                    placeholder='Select Category'
                    style={styles.dropDown}
                    placeholderStyle={styles.placeHolder}
                    minHeight={200}
                    containerStyle={styles.option}
                    itemContainerStyle={styles.optionItem}
                    onChange={(item) => setSelectedCategory(item)}
                />
            </View>
            <TouchableOpacity disabled={isPending} style={styles.addButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Add;
