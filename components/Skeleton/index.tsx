import { StyleSheet, View } from "react-native";
import { useTheme } from "@/data/hooks/Theme/useTheme";
import { SkeletonProps, ThemeColors } from "@/data/types";
import React from "react";

const AppSkeleton: React.FunctionComponent<SkeletonProps> = ({ width, height }) => {
    const { colors } = useTheme();
    const styles = sekletonStyles(colors, width, height);

    return (
        <View style={{ marginRight: 15 }}>
            <View style={styles.skeleton} ></View>
        </View>
    );
};

export default AppSkeleton;

const sekletonStyles = (colors: ThemeColors, width: number, height: number) => {
    return StyleSheet.create({
        skeleton: {
            width: width,
            height: height,
            backgroundColor: colors.input,
            borderRadius: 15

        }
    })
}