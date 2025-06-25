
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text  } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { styles } from './ToastConfigStyle'

interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

const toastConfig = {
    error: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.errorToast]}>
            <MaterialIcons name="cancel" size={20} color="#FF0000" />
            <View style={styles.textContainer}>
                {text1 ? <Text style={styles.errorText}>{text1}</Text> : null}
                {text2 ? <Text style={styles.secondaryText}>{text2}</Text> : null}
            </View>
        </View>
    ),

    success: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.successToast]}>
            <AntDesign name="checkcircle" size={20} color="#00A91B" />
            <View style={styles.textContainer}>
                {text1 ? <Text style={styles.successText}>{text1}</Text> : null}
                {text2 ? <Text style={styles.secondaryText}>{text2}</Text> : null}
            </View>
        </View>
    ),

    info: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.infoToast]}>
            <View style={styles.textContainer}>
                {text1 ? <Text style={styles.infoText}>{text1}</Text> : null}
                {text2 ? <Text style={styles.secondaryText}>{text2}</Text> : null}
            </View>
        </View>
    ),
};

export default toastConfig;