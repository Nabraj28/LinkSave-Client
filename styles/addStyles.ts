import { useTheme } from "@/data/hooks/Theme/useTheme";
import { StyleSheet, TextStyle } from "react-native"


const addStyles = () => {

    const { colors } = useTheme();

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    return StyleSheet.create({

        addContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingVertical: 10,
            backgroundColor: colors.background
        },

        headerText: {
            fontSize: 30,
            color: colors.text,
            fontFamily: 'WorkSans-Bold'
        },

        label: {
            ...baseText,
            paddingLeft: 10
        },

        input: {
            ...baseText,
            backgroundColor: colors.input,
            borderRadius: 10,
            paddingLeft: 10,
            lineHeight: 30
        },
        placeHolder: {
            color: colors.placeholder
        },
        errorText: {
            ...baseText,
            color: colors.danger
        },
        addButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: colors.primary,
            marginTop: 15
        },
        addButtonText: {
            ...baseText,
            color: 'white'
        },
        dropDown: {
            paddingVertical: 15,
            backgroundColor: colors.input,
            borderRadius: 10,
            paddingHorizontal: 10
        },
        option: {
            paddingVertical: 10,
            marginTop: 10,
            borderRadius: 10
        },
        optionItem: {

        }
    })
};

export default addStyles