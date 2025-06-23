import { ThemeColors } from "@/data/types"
import { StyleSheet, TextStyle, ViewStyle } from "react-native"

const upsertModalStyles = (colors: ThemeColors, theme?: string) => {

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    const baseButton: ViewStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    }

    const baseContainer: ViewStyle = {
        display: 'flex',
        width: '100%'
    }

    return StyleSheet.create({
        overLay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.8)'}`

        },
        content: {
            ...baseContainer,
            width: '90%',
            flexDirection: 'column',
            gap: 20,
            borderRadius: 10,
            backgroundColor: colors.card,
            padding: 20,
            elevation: 10
        },
        headerContainer: {
            ...baseContainer,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerText: {
            ...baseText,
            fontFamily: 'WorkSans-Bold',
            fontSize: 20,
            color: colors.primary,
        },
        closeIcon: {
            padding: 5,
            backgroundColor: colors.buttonBackground,
            borderRadius: 10,
        },
        inputContainer: {
            ...baseContainer,
            flexDirection: 'column',
            gap: 5
        },
        label: {
            ...baseText
        },
        nameInput: {
            ...baseText,
            backgroundColor: colors.input,
            borderRadius: 10,
            paddingLeft: 10,
        },
        errorText: {
            ...baseText,
            color: colors.danger
        },
        buttonContainer: {
            ...baseContainer,
            flexDirection: 'column',
            gap: 10
        },
        upsertButton: {
            ...baseButton,
            backgroundColor: colors.primary,
        },
        buttonText: {
            ...baseText,
            color: 'white'
        },
        deleteButton: {
            ...baseButton,
            backgroundColor: 'red'
        }
    })
}

export default upsertModalStyles;