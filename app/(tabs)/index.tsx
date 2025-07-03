import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Category from "@/components/Category";
import Card from "@/components/Card";
import { AntDesign } from "@expo/vector-icons";
import AddCategoryModal from "@/components/AddCategoryModal";
import EditCategoryModal from "@/components/EditCategoryModal";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import DeleteCategoryModal from "@/components/DeleteCategoryModal";
import { homeStyles } from "@/styles/homeStyles";
import { useTheme } from "@/data/hooks/Theme/useTheme";
import EditLinkModal from "@/components/EditLinkModal";
import useSearchStore from "@/data/store/useSearchStore";
import SearchModal from "@/components/SearchModal";

const Home = () => {

    const { colors } = useTheme();
    const styles = homeStyles();

    const { toggleModalSearch } = useSearchStore();

    const handleSearch = () => {
        toggleModalSearch();
    }

    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>LinkSave</Text>
                <TouchableOpacity onPress={handleSearch}>
                    <AntDesign name="search1" size={28} color={colors.text} />
                </TouchableOpacity>
            </View>
            <Category />
            <Card />
            <AddCategoryModal />
            <EditCategoryModal />
            <EditLinkModal />
            <DeleteLinkModal />
            <DeleteCategoryModal />
            <SearchModal />
        </View>
    );
};

export default Home;
