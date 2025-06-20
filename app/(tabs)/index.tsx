import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { homeStyles } from '@/styles/homeStyles'
import { useTheme } from '@/data/hooks/useTheme';
import Category from '@/components/Category';
import useGetUserData from '@/data/hooks/useGetUserData';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/Card';
import { AntDesign } from '@expo/vector-icons';
import AddCategoryModal from '@/components/AddCategoryModal';
import EditCategoryModal from '@/components/EditCategoryModal';

const Home: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = homeStyles(colors);
    const [isAddOpen, setisAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const toggleAddModal = () => {
        setisAddOpen(prevState => !prevState);
    };

    const toggleEditModal = () => {
        setIsEditOpen(prevState => !prevState);
    };

    const { authState } = useAuth();
    const userId = authState.user?._id;

    const { data, isLoading } = useGetUserData(userId);

    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    LinkSave
                </Text>
                <AntDesign name="search1" size={28} color={colors.text} />
            </View>
            <Category
                data={data}
                isLoading={isLoading}
                toggleAddModal={toggleAddModal}
            />
            <Card
                isLoading={isLoading}
                data={data}
                toggleEditModal={toggleEditModal}
            />
            <AddCategoryModal
                isVisible={isAddOpen}
                toggleAddModal={toggleAddModal}
            />
            <EditCategoryModal
                isEditOpen={isEditOpen}
                toggleEditModal={toggleEditModal}
            />
        </View>
    )
}

export default Home