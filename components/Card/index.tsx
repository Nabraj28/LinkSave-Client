import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { homeStyles } from '@/styles/homeStyles';
import useCategoryStore from '@/store/useCategoryStore';
import { Link } from '@/types';
import { Skeleton } from 'moti/skeleton';

interface LinkCardProps {
    isLoading: boolean;
}

const Card = ({ isLoading }: LinkCardProps) => {

    const { colors } = useTheme();
    const styles = homeStyles(colors);

    const cardWidth = Math.floor(Dimensions.get('window').width - 30);

    const { selectedCategory } = useCategoryStore();

    const skeletonData = [1, 2, 3, 4];


    const renderLinks = ({ item }: { item: Link | number }) => {
        return (
            <React.Fragment>
                {
                    typeof item === 'number' ? (
                        <Skeleton width={cardWidth} height={150} />
                    ) : (
                        <View style={styles.linkCard}>
                            <View style={styles.crudContainer}>
                                <Text style={styles.linkCategory}>{selectedCategory?.name === 'All' ? 'Category' : selectedCategory?.name}</Text>
                                <View style={styles.crudIconContainer}>
                                    <TouchableOpacity style={styles.deleteIcon}>
                                        <Feather name="trash" size={15} color="#ba3b35" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editIcon}>
                                        <Text style={styles.editText}>Edit</Text>
                                        <Feather name="edit" size={15} color="#2556bd" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.actionContainer}>
                                <Text style={styles.link} >{item?.url.length > 30 ? item.url.slice(0, 30) + '...' : item.url}</Text>
                                <View style={styles.linkContainer}>
                                    <Ionicons name="copy-outline" size={16} color="#1A80E5" />
                                    <AntDesign name="sharealt" size={16} color={colors.text} />
                                </View>
                            </View>
                        </View>
                    )
                }
            </React.Fragment>
        )
    }


    return (
        <FlatList
            data={isLoading ? skeletonData : selectedCategory?.links}
            renderItem={renderLinks}
            keyExtractor={(item, index) =>
                typeof item === 'number' ? item.toString() : item.title || index.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.card}
        />
    )
}

export default Card