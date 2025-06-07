import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => {

    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background
            }}
        >
            <ActivityIndicator
                size="large"
                color={colors.primary}
            />
        </View>
    )
}

export default Loader