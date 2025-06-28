import { useTheme } from "@/data/hooks/Theme/useTheme";
import { StyleSheet, TextStyle } from "react-native"


const searchModalStyles = () => {

    const { colors } = useTheme();

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    return StyleSheet.create({

        searchContainer: {
            flex: 1,
            backgroundColor: colors.background,
            gap: 20,
        },

        container: {
            paddingHorizontal: 20,
            paddingTop: 20
        },

        queryDataContainer: {
            paddingHorizontal: 10,
            paddingTop: 5
        },

        searchInput: {
            ...baseText,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            paddingLeft: 15,
        },

        emptyText: {
            ...baseText
        }
    })
};

export default searchModalStyles;