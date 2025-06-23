import { useTheme } from "@/data/hooks/useTheme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

const deleteModalStyles = () => {

    const { colors } = useTheme();

    const baseButton: ViewStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    };

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    return StyleSheet.create({
        infoText: {
            ...baseText
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 20
        },
        cancelButton: {
            ...baseButton,
            backgroundColor: colors.buttonBackground
        },
        cancelText: {
            ...baseText
        },
        deleteButton: {
            ...baseButton,
            backgroundColor: 'red'
        },
        deleteText: {
            ...baseText,
            color: 'white'
        }
    })
}

export default deleteModalStyles;