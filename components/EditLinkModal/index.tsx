import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import upsertModalStyles from "@/styles/upsertStyles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericModal from "../GenericModal";
import Toast from "react-native-toast-message";
import useLinkStore from "@/data/store/useLinkStore";
import useUpdateLink from "@/data/hooks/Link/useUpdateLink";
import { useTheme } from "@/data/hooks/Theme/useTheme";
import { UpdateLinkModel, UpdateLinkSchema } from "@/data/models/LinkModel";


const EditLinkModal: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = upsertModalStyles(colors);

    const { modalEditLink, toggleModalEditLink, selectedLink } = useLinkStore();

    const { mutate, isPending } = useUpdateLink({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Link Updated Successfully'
            });
            toggleModalEditLink();
        },
        cbError: (error) => {
            if (error.response) {
                const { data, status } = error.response;
                if (status === 400) {
                    Toast.show({
                        type: 'error',
                        text1: 'No changes detected. Modify at least one field to update.'
                    })
                } else if (status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Servery Busy, Please try again later'
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: `${data.message}`
                    })
                }
            }
        }
    });


    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(UpdateLinkSchema),
        defaultValues: {
            title: '',
            url: ''
        }
    });

    useEffect(() => {
        if (selectedLink) {
            reset({
                title: selectedLink.title,
                url: selectedLink.url
            });
        }
    }, [selectedLink, reset]);

    const onSubmit = (data: UpdateLinkModel) => {
        mutate({
            linkId: selectedLink?._id,
            payload: data
        })
    };


    return (
        <GenericModal
            title="Edit Link"
            onClose={toggleModalEditLink}
            visible={modalEditLink}
        >
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.label}>Link Title</Text>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { value, onBlur, onChange } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Enter Link Title"
                                style={styles.nameInput}
                                placeholderTextColor={colors.placeholder}
                            />
                        )}
                    />
                    {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Link Url</Text>
                    <Controller
                        control={control}
                        name="url"
                        render={({ field: { value, onBlur, onChange } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Enter Link Url"
                                style={styles.nameInput}
                                placeholderTextColor={colors.placeholder}
                            />
                        )}
                    />
                    {errors.url && <Text style={styles.errorText}>{errors.url.message}</Text>}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.upsertButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending || !selectedLink}
                >
                    <Text style={styles.buttonText}>
                        {isPending ? <ActivityIndicator color="white" /> : 'Update'}
                    </Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    );
};

export default EditLinkModal;
