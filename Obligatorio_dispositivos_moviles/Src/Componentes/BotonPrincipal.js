import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BotonPrincipal = ({

  title = 'Fallo',
  btnIcon = '',
  btnColor = '',
  onPress = () => console.log('click')
}) => {
  return (

   <TouchableOpacity style={btnIcon ? styles.button : styles.button2} onPress={onPress}>
           <View style={styles.container}>
        {btnIcon != '' &&  <Icon name={btnIcon} size={40} color="white" />}
        <Text style={styles.text}>{title}</Text>
      </View>
   </TouchableOpacity>

  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderColor: 'black',
    color: "white",
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
    
  },
  button: {
    backgroundColor: 'rgba(0, 128, 0, 0.5)',
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BotonPrincipal;
