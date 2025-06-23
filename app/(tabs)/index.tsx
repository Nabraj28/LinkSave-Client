import React from "react";
import { Text, View } from "react-native";
import { homeStyles } from "@/styles/homeStyles";
import { useTheme } from "@/data/hooks/useTheme";
import Category from "@/components/Category";
import useGetUserData from "@/data/hooks/useGetUserData";
import Card from "@/components/Card";
import { AntDesign } from "@expo/vector-icons";
import AddCategoryModal from "@/components/AddCategoryModal";
import EditCategoryModal from "@/components/EditCategoryModal";
import DeleteModal from "@/components/DeleteModal";
import useDeleteLink from "@/data/hooks/Link/useDeleteLink";
import Toast from "react-native-toast-message";
import useLinkStore from "@/data/store/useLinkStore";
import useCategoryStore from "@/data/store/useCategoryStore";
import useDeleteCategory from "@/data/hooks/Category/useDeleteCategory";

const Home: React.FunctionComponent = () => {

    const { colors, theme } = useTheme();
    const styles = homeStyles(colors, theme);

    const { data, isLoading } = useGetUserData();

    const { modalDeleteLink, toggleModalDeleteLink, id } = useLinkStore();
    const { modalDeleteCategory, toggleModalDeleteCategory, selectedCategory } = useCategoryStore();

    const { isPending: isDelteLinkPending, mutate: deleteLink } = useDeleteLink({
        cb: () => { },
        cbSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Link Deleted Successfully'
            });
            toggleModalDeleteLink();
        },
        cbError: () => {
            Toast.show({
                type: 'error',
                text1: 'Error on Deleting Link'
            })
        }
    })
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
    })

    const handleDeleteLink = () => {
        deleteLink({ linkId: id })
    };

    const handleDeleteCategory = ()=>{
        deleteCategory({categoryId: selectedCategory?._id})
    }


    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>LinkSave</Text>
                <AntDesign name="search1" size={28} color={colors.text} />
            </View>
            <Category data={data} isLoading={isLoading} />
            <Card data={data} isLoading={isLoading} />
            <AddCategoryModal />
            <EditCategoryModal />
            <DeleteModal
                item="link"
                pending={isDelteLinkPending}
                isVisible={modalDeleteLink}
                onModalClose={toggleModalDeleteLink}
                onDelete={handleDeleteLink}
            />
            <DeleteModal
                item="category"
                pending={isDelteCategoryPending}
                isVisible={modalDeleteCategory}
                onModalClose={toggleModalDeleteCategory}
                onDelete={handleDeleteCategory}
            />
        </View>
    );
};

export default Home;
