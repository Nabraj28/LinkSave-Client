import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useTheme } from '@/data/hooks/useTheme';
import { homeStyles } from '@/styles/homeStyles';
import useCategoryStore from '@/data/store/useCategoryStore';
import { Link, LinkSaveResponse } from '@/data/types';
import LinkCard from '../LinkCard';


interface CardProps {
    isLoading: boolean;
    data?: LinkSaveResponse;
    toggleEditModal?: () => void
}

const Card = ({ isLoading, data, toggleEditModal }: CardProps) => {

    const { colors } = useTheme();
    const styles = homeStyles(colors);

    const { selectedCategory } = useCategoryStore();

    const skeletonData = [1, 2, 3, 4];


    const getCategoryName = (item: Link) => {
        if (selectedCategory?.name === 'All') {
            const realCategory = data?.user.categories.find(category =>
                category.links.some(catLink => catLink._id === item._id)
            );
            return realCategory?.name || 'Unknown';
        } else {
            return selectedCategory?.name || 'Unknown';
        }
    };

    const renderItem = ({ item }: { item: Link | number }) => (
        <LinkCard item={item} getCategoryName={getCategoryName} />
    );


    return (
        <View style={styles.cardContainer}>
            {!isLoading &&
                <View style={styles.cardHeader}>
                    <Text style={styles.categoryName}>{selectedCategory?.name}</Text>
                    {selectedCategory?.name === 'All' ? null :
                        <TouchableOpacity style={styles.editCategoryButton} onPress={toggleEditModal}>
                            <Text style={styles.editCategoryText}>Edit Category</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            <FlatList
                data={isLoading ? skeletonData : selectedCategory?.links}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                    typeof item === 'number' ? item.toString() : item._id || index.toString()
                }
                contentContainerStyle={styles.card}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Card