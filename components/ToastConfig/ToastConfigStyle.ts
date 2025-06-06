import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    toastContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: '90%',
        minHeight: 52,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginHorizontal: '5%',
    },
    errorToast: {
        backgroundColor: '#FEF3F2',
        borderColor: '#FF0000',
        borderLeftWidth: 4
    },
    infoToast: {
        backgroundColor: '#FFF',
        borderColor: '#1A80E5',
        borderLeftWidth: 4
    },
    successToast: {
        backgroundColor: '#ECFDF3',
        borderColor: '#00A91B',
        borderLeftWidth: 4
    },

    textContainer: {
        maxWidth: '90%'
    },
    errorText: {
        color: '#D92D20',
        fontSize: 15,
        fontFamily: 'serif'
    },
    infoText: {
        color: '#1A80E5',
        fontSize: 15,
        fontFamily: 'serif'
    },
    successText: {
        color: '#067647',
        fontSize: 15,
        fontFamily: 'serif'
    },
    secondaryText: {
        color: '#333',
        fontSize: 12,
        marginTop: 2,
    },
});