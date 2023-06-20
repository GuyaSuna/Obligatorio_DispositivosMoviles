import React, {useState} from 'react'
import {Modal,Text, View, Button, StyleSheet} from 'react-native'

const MyModal = ({contenido = ""}) => {

    const [modalVisible, setModalVisible] = useState(false);
    
    

    return (
        <View style={styles.container}>
        <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />
  
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{contenido}</Text>
              <Button title="Cerrar Modal" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
  });

export default MyModal
