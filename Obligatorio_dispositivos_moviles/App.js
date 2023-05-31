import React from 'react';
import { StyleSheet, View } from 'react-native';
import MensajitoNahuel from './Componentes/MensajitoNahuel';

import MainScreen from './Componentes/PaginaPrincipal';


const App = () => {
  return (

    <>     
      <MainScreen/>     

    </>
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
