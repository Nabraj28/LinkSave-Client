import { View, Text, Dimensions, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'
import AppSkeleton from '../Skeleton'
import Toast from 'react-native-toast-message';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import { homeStyles } from '@/styles/homeStyles';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from '@/data/types';
import useLinkStore from '@/data/store/useLinkStore';


export interface LinkCardProps {
    item: Link | number;
    getCategoryName: (item: Link) => React.ReactNode;
}


const LinkCard = ({ item, getCategoryName }: LinkCardProps) => {

    const { colors } = useTheme();
    const styles = homeStyles();
    const {toggleModalDeleteLink, setLinkId, setSelectedLink, toggleModalEditLink, selectedLink} = useLinkStore();

    const handldDeletePress =(linkId: string)=>{
        toggleModalDeleteLink();
        setLinkId(linkId);
    }

    const cardWidth = Math.floor(Dimensions.get('window').width - 30);

    const handlePressLink = async (url: string) => {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        try {
            await Linking.openURL(formattedUrl);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to open URL'
            })
        }
    };

    const handleShareLink = async (item: Link) => {
        try {
            await Share.share({
                message: item.url
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to share the link'
            });
        }
    };

    const handleCopyLink = async (item: Link) => {
        try {
            const result = await Clipboard.setStringAsync(item.url);
            result && Toast.show({
                type: 'success',
                text1: 'Copied Successfully'
            })
        } catch (error) {

        }
    };

    const handleEditLink =(item: Link)=>{
        setSelectedLink(item);
        toggleModalEditLink();
    };



    return (
        <React.Fragment>
            {
                typeof item === 'number' ? (
                    <AppSkeleton width={cardWidth} height={150} />
                ) : (
                    <TouchableOpacity onPress={() => handlePressLink(item.url)} style={styles.linkCard}>
                        <View style={styles.crudContainer}>
                            <Text style={styles.linkCategory}>
                                {getCategoryName(item)}
                            </Text>
                            <View style={styles.crudIconContainer}>
                                <TouchableOpacity onPress={()=>handldDeletePress(item._id)} style={styles.deleteIcon}>
                                    <Feather name="trash" size={15} color={colors.danger} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleEditLink(item)} style={styles.icon}>
                                    <Feather name="edit" size={15} color={colors.primary} />
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                        <View style={styles.actionContainer}>
                            <View style={styles.actionSeparator}>
                                <View style={styles.icon}>
                                    <Entypo name="link" size={16} color={colors.primary} />
                                </View>
                                <View style={styles.linkContainer}>
                                    <Text numberOfLines={1} style={styles.link}>{item.url}</Text>
                                </View>
                            </View>
                            <View style={styles.actionSeparator}>
                                <TouchableOpacity onPress={() => handleCopyLink(item)} style={styles.icon}>
                                    <Ionicons name="copy-outline" size={16} color={colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleShareLink(item)} style={styles.icon}>
                                    <AntDesign name="sharealt" size={16} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        </React.Fragment>
    )
}

export default LinkCard