import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import deleteModalStyles from './deleteModalStyles';
import GenericModal from '../GenericModal'
import { DeleteModalProps } from '@/data/types';

const DeleteModal: React.FunctionComponent<DeleteModalProps> = ({ text, isVisible, onModalClose, onDelete, pending }) => {

  const styles = deleteModalStyles();

  const handleCloseModal = () => {
    onModalClose();
  }


  return (
    <GenericModal title={`Delete?`} onClose={handleCloseModal} visible={isVisible}>
      <Text style={styles.infoText}>Are you sure you want to delete this {text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText} onPress={handleCloseModal}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={pending} onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>
            {pending ? <ActivityIndicator color={'white'} /> : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  )
}

export default DeleteModal