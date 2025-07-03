import { useTheme } from "@/data/hooks/Theme/useTheme";
import { StatusBar, StyleSheet, Dimensions } from "react-native";


const tabStyles = () => {

    const screenHeight = Dimensions.get('screen').height;
    const windowowHeight = Dimensions.get('window').height;

    const isButtonNavigation = screenHeight - windowowHeight > 0;
    const StatusBarHeight = StatusBar.currentHeight || 24;
    const buttonNavHeight = screenHeight - windowowHeight - StatusBarHeight;

    const { colors } = useTheme();

    return StyleSheet.create({

        sceneStyles: {
            paddingTop: StatusBar.currentHeight,
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: colors.background,
        },

        tabBarStyles: {
            backgroundColor: colors.tabbackground,
            elevation: 10,
            height: isButtonNavigation ? 110 : 95,
            paddingBottom: isButtonNavigation ? buttonNavHeight : 20,
        },
    })
};

export default tabStyles