import React from 'react';
import { Text, View } from 'react-native';
import { homeStyles } from '@/styles/homeStyles'
import { useTheme } from '@/hooks/useTheme';
import Category from '@/components/Category';
import useGetUserData from '@/hooks/useGetUserData';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/Card';

const Home: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = homeStyles(colors);

    const { authState } = useAuth();
    const userId = authState.user?._id;

    const { data, isLoading } = useGetUserData(userId);


    return (
        <View style={styles.homeContainer}>
            <Text style={styles.headerText}>
                LinkSave
            </Text>
            <Category
                data={data}
                isLoading={isLoading}
            />
            <Card isLoading={isLoading} />
        </View>
    )
}

export default Home