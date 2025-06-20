import { ThemeColors } from "@/data/types";
import { StyleSheet, TextStyle, ViewStyle, Dimensions } from "react-native";


export const homeStyles = (colors: ThemeColors) => {

    const baseItem: ViewStyle = {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const baseText: TextStyle = {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: colors.text
    }

    const baseButton: ViewStyle = {
        padding: 5,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return StyleSheet.create({

        // Home Page Styles

        homeContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingVertical: 10,
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5
        },
        headerText: {
            fontSize: 30,
            color: colors.text,
            fontFamily: 'WorkSans-Bold'
        },

        // Category Componenet Styles

        categoryContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
        },

        category: {
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 5,

        },
        flatlistGap: {
            gap: 10,
        },
        addButtonContainer: {
            paddingVertical: 5,
        },
        addButton: {
            ...baseItem,
            backgroundColor: colors.primary,
        },

        selectedCatButton: {
            ...baseItem,
            backgroundColor: colors.primary
        },

        notSelectedCatButton: {
            ...baseItem,
            backgroundColor: colors.tabbackground,
            elevation: 5

        },

        selectedButtonText: {
            ...baseText,
            color: 'white'
        },

        notSelectedButtonText: {
            ...baseText
        },

        // Card Component Styles

        cardContainer: {
            display: 'flex',
            gap: 10,
        },

        cardHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5
        },

        categoryName: {
            color: colors.text,
            fontFamily: 'WorkSans-Regular',
            fontSize: 18
        },

        editCategoryButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#E2EAFF',
            borderRadius: 10
        },

        editCategoryText: {
            ...baseText,
            color: colors.primary
        },

        card: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 350
        },

        linkCard: {
            paddingHorizontal: 20,
            paddingVertical: 30,
            backgroundColor: colors.tabbackground,
            elevation: 5,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        crudContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        linkCategory: {
            color: '#719d4e',
            backgroundColor: '#dce9f5',
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignSelf: 'flex-start',
            borderRadius: 5,
            fontFamily: 'WorkSans-Regular',
            fontSize: 15
        },

        crudIconContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
        },

        deleteIcon: {
            ...baseButton,
            backgroundColor: '#FFE5E4',
        },

        icon: {
            ...baseButton,
            flexDirection: 'row',
            gap: 5,
            backgroundColor: '#E2EAFF',
        },

        editText: {
            color: colors.primary,
            fontFamily: 'WorkSans-Regular'
        },

        title: {
            color: colors.text,
            fontSize: 20,
            fontFamily: 'WorkSans-Regular'
        },

        actionContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 30
        },

        actionSeparator: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        linkContainer: {
            maxWidth: Dimensions.get('window').width * 0.5,
        },
        link: {
            color: colors.primary,
            fontFamily: 'WorkSans-Regular',
            fontSize: 15,
        }
    })
}