import React from 'react'
import { TouchableWithoutFeedback, View, Text , onPress } from 'react-native'
import { useState } from 'react';
const Contador = (ModifCont) => {



  return (
    
    <View>
        <TouchableWithoutFeedback onPress={ModifCont()} >
        <Text>
      Presioname Jiji
         </Text>
        </TouchableWithoutFeedback>
    </View>
 
  
  )
}

export default Contador
