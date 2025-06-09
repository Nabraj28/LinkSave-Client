import { ThemeColors } from "@/types";
import { StyleSheet, TextStyle } from "react-native";


export const homeStyles = (colors: ThemeColors) => {

    const baseItem: TextStyle = {
        paddingHorizontal: 20,
        paddingVertical: 15,
        color: 'white',
        borderRadius: 10,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
    }

    return StyleSheet.create({
        homeContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingVertical: 10,
            // paddingHorizontal: 5
        },
        headerText: {
            fontSize: 30,
            color: colors.text,
            fontFamily: 'WorkSans-Bold'
        },

        categoryContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 5
        },

        category: {
            flex: 1
        },

        flatlistGap: {
            gap: 10
        },

        addButton: {
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1A80E5',
        },


        selectedItem: {
            ...baseItem,
            backgroundColor: '#1A80E5',
        },

        notSelectedItem: {
            ...baseItem,
            backgroundColor: 'gray',
        },

        card: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingBottom: 150,
            paddingHorizontal: 5
        },

        linkCard: {
            paddingHorizontal: 20,
            paddingVertical: 30,
            backgroundColor: colors.tabbackground,
            elevation: 10,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
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
        crudContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        crudIconContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10
        },

        deleteIcon: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#dce9f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },

        editIcon: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            padding: 5,
            backgroundColor: '#dce9f5',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },

        editText: {
            color: '#2556bd',
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

        linkContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            overflow: 'hidden'
        },

        link: {
            flex: 1,
            overflow: 'hidden',
            color: colors.text,
            fontFamily: 'WorkSans-Regular',
            fontSize: 14
        }
    })
}