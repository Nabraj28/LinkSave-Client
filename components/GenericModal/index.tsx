import React from 'react';
import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import { useTheme } from '@/data/hooks/Theme/useTheme';
import { AntDesign } from '@expo/vector-icons';
import upsertModalStyles from '../../styles/upsertStyles';
import { UpsertModalProps } from '@/data/types';


const GenericModal: React.FunctionComponent<UpsertModalProps> = ({ title, visible, onClose, children }) => {

    const { colors, theme } = useTheme();
    const styles = upsertModalStyles(colors, theme);

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
