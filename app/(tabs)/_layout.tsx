import { Tabs } from "expo-router";
import tabStyles from "@/styles/tabStyles";
import { useTheme } from "@/hooks/useTheme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { AddIcon } from "@/assets/icons/AddIcon";


const Layout: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = tabStyles(colors);


    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: styles.sceneStyles,
                tabBarActiveTintColor: colors.activeIcon,
                tabBarInactiveTintColor: colors.inactiveIcon,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: styles.tabBarStyles,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => (
                        <HomeIcon color={color} size={size} focused={focused} indicatorColor={colors.background} />
                    )
                }}
            />
            <Tabs.Screen
                name="Add"
                options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => (
                        <AddIcon color={color} size={size} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => (
                        <SettingsIcon color={color} size={size} focused={focused} />
                    )
                }}
            />
        </Tabs>
    )
}

export default Layout