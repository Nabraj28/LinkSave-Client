import React from 'react';
import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import { useTheme } from '@/data/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import upsertModalStyles from '../../styles/upsertStyles';
import { UpsertModalProps } from '@/data/types';


const GenericModal = ({ title, visible, onClose, children }: UpsertModalProps) => {

    const { colors } = useTheme();
    const styles = upsertModalStyles(colors);

    return (
        <Modal transparent animationType='fade' visible={visible} onRequestClose={onClose}>
            <Pressable style={styles.overLay} onPress={onClose}>
                <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{title}</Text>
                        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                            <AntDesign name="close" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default GenericModal;
