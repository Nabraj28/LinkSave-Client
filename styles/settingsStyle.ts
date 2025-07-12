import { useTheme } from "@/data/hooks/Theme/useTheme"
import { StyleSheet, TextStyle } from "react-native"

const settingsStyle = () => {

    const { colors } = useTheme();

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    return StyleSheet.create({
        settingsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
            paddingVertical: 10,
            backgroundColor: colors.background
        },

        headerText: {
            fontSize: 30,
            color: colors.text,
            fontFamily: 'WorkSans-Bold'
        },

        sectionHeader: {
            ...baseText,
            fontFamily: 'WorkSans-Medium'
        },

        sectionContainer: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
        },
        selectedTheme: {
            backgroundColor: colors.input
        },
        firstItem: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        borderItem: {
            borderTopWidth: 1,
            borderColor: colors.border,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        contentText: {
            ...baseText,
            color: colors.text,
            textAlign: 'justify'
        },
        contentIcon: {
            color: colors.themeIcon
        },
        buttonContainer: {
            padding: 10
        },
        deleteButton: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.input,
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 10,
        },
        deleteText: {
            ...baseText
        }
    })
};

export default settingsStyle;