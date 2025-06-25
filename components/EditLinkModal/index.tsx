import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import upsertModalStyles from "@/styles/upsertStyles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericModal from "../GenericModal";
import Toast from "react-native-toast-message";
import useLinkStore from "@/data/store/useLinkStore";
import useUpdateLink from "@/data/hooks/Link/useUpdateLink";
import { useTheme } from "@/data/hooks/Theme/useTheme";
import { LinkModel, LinkSchema } from "@/data/models/LinkModel";


const EditLinkModal = () => {

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
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Error While Updating Link'
            })
        }
    });


    const { control, formState: { errors }, handleSubmit, } = useForm({
        resolver: zodResolver(LinkSchema),
    });

    const onSubmit = (data: LinkModel) => {
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
                                defaultValue={selectedLink?.title}
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
                                defaultValue={selectedLink?.url}
                            />
                        )}
                    />
                    {errors.url && <Text style={styles.errorText}>{errors.url.message}</Text>}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.upsertButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending}
                >
                    <Text style={styles.buttonText}>
                        {isPending ? 'Updating...' : 'Update'}
                    </Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    );
};

export default EditLinkModal;
