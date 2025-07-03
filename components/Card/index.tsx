import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { homeStyles } from '@/styles/homeStyles';
import useGetUserData from '@/data/hooks/User/useGetUserData';
import useCategoryStore from '@/data/store/useCategoryStore';
import { Link } from '@/data/types';
import LinkCard from '../LinkCard';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const Card: React.FunctionComponent = () => {

    const bannerRef = useRef<BannerAd>(null);

    const styles = homeStyles();

    const { data, isLoading } = useGetUserData();

    const { selectedCategory, toggleModalEditCategory } = useCategoryStore();

    const skeletonData = [1, 2, 3, 4];

    const adUnitId = "ca-app-pub-8896855737169894/6546849550";

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
                        <TouchableOpacity style={styles.editCategoryButton} onPress={toggleModalEditCategory}>
                            <Text style={styles.editCategoryText}>Edit Category</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
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