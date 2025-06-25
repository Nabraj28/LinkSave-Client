import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { CategoryResponse } from '@/data/types';
import { homeStyles } from '@/styles/homeStyles';
import { AntDesign } from '@expo/vector-icons';
import useCategoryStore from '@/data/store/useCategoryStore';
import AppSkeleton from '../Skeleton';
import useGetUserData from '@/data/hooks/User/useGetUserData';


const Category = () => {

    const styles = homeStyles();
    const { data, isLoading } = useGetUserData();
    const skeletonData = [1, 2, 3, 4];

    const categories = data?.user.categories || []
    const allLinks = categories.flatMap(item => item.links || []);

    const extendedData = useMemo(() => {
        return [{ _id: 'all', name: 'All', links: allLinks }, ...categories];
    }, [categories]);

    const { selectedCategory, setSelectedCategory, toggleModalAddCategory } = useCategoryStore();

    useEffect(() => {
        if (!isLoading && extendedData.length > 0) {
            setSelectedCategory(extendedData[0]);
        }
    }, [isLoading, extendedData]);


    const renderItem = ({ item }: { item: CategoryResponse | number }) => {
        return (
            <React.Fragment>
                {typeof item === 'number' ? (
                    <AppSkeleton width={80} height={60} />
                ) : (
                    <TouchableOpacity
                        style={item.name === selectedCategory?.name ? styles.selectedCatButton : styles.notSelectedCatButton}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <Text style={item.name === selectedCategory?.name ? styles.selectedButtonText : styles.notSelectedButtonText}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            </React.Fragment>
        )
    }

    return (
        <View style={styles.categoryContainer}>
            <FlatList
                data={isLoading ? skeletonData : extendedData}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                    typeof item === 'number' ? item.toString() : item.name || index.toString()
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.category}
                contentContainerStyle={styles.flatlistGap}
            />
            <View style={styles.addButtonContainer}>
                <TouchableOpacity disabled={isLoading} onPress={toggleModalAddCategory} style={styles.addButton}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Category;