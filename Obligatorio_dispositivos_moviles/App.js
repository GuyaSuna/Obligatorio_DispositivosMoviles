import React from 'react';
import { StyleSheet, View } from 'react-native';
import MensajitoNahuel from './Componentes/MensajitoNahuel';
import MensajitoAlex from './Componentes/Mensajito Alex';
import MensajitoAlejo from './Componentes/MensajitoAlejo';

const App = () => {
  return (
    <View style={styles.container}>
     <MensajitoAlejo/>
     <MensajitoAlex/>
     <MensajitoNahuel/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
