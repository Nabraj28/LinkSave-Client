import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GenericModal from '../GenericModal'
import deleteModalStyles from './deleteModalStyles';
import { DeleteModalProps } from '@/data/types';

const DeleteModal = ({item, isVisible, onModalClose, onDelete, pending}:DeleteModalProps) => {

  const styles = deleteModalStyles();

  const handleCloseModal =()=>{
    onModalClose();
  }


  return (
    <GenericModal title={`Delete ${item}?`} onClose={handleCloseModal} visible={isVisible}>
        <Text style={styles.infoText}>Are you sure you want to delete this {item} ?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText} onPress={handleCloseModal}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={pending} onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>
              {pending ? "Deleting..." : "Delete"}
            </Text>
          </TouchableOpacity>
        </View>
    </GenericModal>
  )
}

export default DeleteModal