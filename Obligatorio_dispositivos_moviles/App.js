import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainScreen from './Src/Screen/PaginaPrincipal';


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
