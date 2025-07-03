import { useTheme } from "@/data/hooks/Theme/useTheme";
import { StatusBar, StyleSheet, TextStyle } from "react-native";


const authStyles = () => {

    const { colors } = useTheme();

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }
    return StyleSheet.create({
        authWrapper: {
            flex: 1,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: colors.background
        },

        authContainer: {
            paddingHorizontal: 24,
            paddingTop: 15,
            paddingBottom: 50,
            flex: 1,
            justifyContent: 'space-between'
        },

        authBoxContainer: {
            display: 'flex',
            gap: 50,
        },

        headerText: {
            fontSize: 32,
            fontFamily: 'WorkSans-Bold',
            color: colors.text
        },

        formContainer: {
            display: 'flex',
            gap: 25
        },

        inputContainer: {
            display: 'flex',
            gap: 8
        },

        inputLabel: {
            ...baseText
        },

        input: {
            ...baseText,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 4,
        },

        errorText: {
            ...baseText,
            fontSize: 12,
            color: '#FF4949'
        },

        authButton: {
            width: '100%',
            paddingVertical: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            borderRadius: 4
        },

        buttonText: {
            ...baseText,
            color: 'white'
        },

        footerText: {
            color: colors.subheader,
            textAlign: 'center',
            paddingBottom: 30,
            fontFamily: 'WorkSans-Regular',
            fontSize: 16

        },

        linkText: {
            fontFamily: 'WorkSans-Bold',
        }
    })
}

export default authStyles