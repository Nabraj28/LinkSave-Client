import React from "react";
import { Text, View } from "react-native";
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

const Home: React.FunctionComponent = () => {

    const {colors} = useTheme();
    const styles = homeStyles();

    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>LinkSave</Text>
                <AntDesign name="search1" size={28} color={colors.text} />
            </View>
            <Category/>
            <Card/>
            <AddCategoryModal />
            <EditCategoryModal />
            <EditLinkModal/>
            <DeleteLinkModal/>
            <DeleteCategoryModal/>
        </View>
    );
};

export default Home;
