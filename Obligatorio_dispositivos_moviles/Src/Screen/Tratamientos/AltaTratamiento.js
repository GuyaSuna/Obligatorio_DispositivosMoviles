import React, {useState} from 'react'
import { View, DatePickerIOS, StyleSheet} from 'react-native'
import MyModal from '../../Componentes/MyModal';

const AltaTratamiento = () => {

  const [chosenDate, setChosenDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <MyModal visible={modalVisible} onClose={handleCloseModal}>
      <View style={styles.container}>
        <DatePickerIOS date={chosenDate} onDateChange={setChosenDate} />
      </View>
    </MyModal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});
export default AltaTratamiento
