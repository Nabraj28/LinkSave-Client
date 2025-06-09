import React, { memo } from "react";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface SkeletonProps {
    width: number,
    height: number
}

const AppSkeleton = ({ width, height }: SkeletonProps) => {
    const { theme } = useTheme();
    const colorMode = theme === "dark" ? "dark" : "light";

    return (
        <View style={{ marginRight: 15 }}>
            <Skeleton
                colorMode={colorMode}
                width={width}
                height={height}
                radius={15}
            />
        </View>
    );
};

export default AppSkeleton;