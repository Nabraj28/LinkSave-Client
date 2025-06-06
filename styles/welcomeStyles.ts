import { ThemeColors } from "@/types";
import { StatusBar, StyleSheet, TextStyle, ViewStyle } from "react-native";

const welcomeStyles = (colors: ThemeColors) => {

    const textStyle: TextStyle = {
        textAlign: 'center',
        color: colors.text,
        fontFamily: 'serif',
        fontSize: 16
    }

    const buttonStyle: ViewStyle = {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 4
    }

    return StyleSheet.create({
        authContainer: {
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: colors.background,
            paddingTop: StatusBar.currentHeight,
            paddingHorizontal: 25
        },

        separator: {
            display: 'flex',
            gap: 20,
            width: '100%'
        },

        headerText: {
            ...textStyle,
            fontSize: 32,
        },

        subHeaderText: {
            ...textStyle,
            color: colors.subheader
        },
        loginButton: {
            ...buttonStyle,
            backgroundColor: colors.primary,
        },
        registerButton: {
            ...buttonStyle,
            borderWidth: 2,
            borderColor: colors.primary,
            backgroundColor: 'transparenet'
        },
        loginButtonText: {
            ...textStyle,
            color: 'white'
        },
        registerButtonText: {
            ...textStyle,
        }
    })
}

export default welcomeStyles