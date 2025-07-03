import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@/data/hooks/Theme/useTheme';

const Loader: React.FunctionComponent = () => {

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