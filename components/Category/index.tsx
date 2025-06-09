import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { CategoryProps, CategoryResponse } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { homeStyles } from '@/styles/homeStyles';
import { AntDesign } from '@expo/vector-icons';
import Skeleton from '../Skeleton';
import useCategoryStore from '@/store/useCategoryStore';


const Category = ({ isLoading, data }: CategoryProps) => {

    const { colors } = useTheme();
    const styles = homeStyles(colors);
    const skeletonData = [1, 2, 3, 4];

    const categories = data?.user.categories || []
    const allLinks = categories.flatMap(item => item.links || []);

    const extendedData = useMemo(() => {
        return [{ _id: 'all', name: 'All', links: allLinks }, ...categories];
    }, [categories]);

    const { selectedCategory, setSelectedCategory } = useCategoryStore()

    useEffect(() => {
        if (!isLoading && extendedData.length > 0) {
            setSelectedCategory(extendedData[0]);
        }
    }, [isLoading, extendedData]);


    const renderItem = ({ item }: { item: CategoryResponse | number }) => {
        return (
            <React.Fragment>
                {typeof item === 'number' ? (
                    <Skeleton width={80} height={60} />
                ) : (
                    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                        <Text style={item.name === selectedCategory?.name ? styles.selectedItem : styles.notSelectedItem}>
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
            <TouchableOpacity style={styles.addButton}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Category;