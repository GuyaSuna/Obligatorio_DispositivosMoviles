import React from 'react';
import {Text, View} from 'react-native'

const UnUsuario  = ({route}) => {
    const item = route.params;
    return ( 
        <View>
            <Text>Nombre:{item.Nombre}</Text>
            <Text>Email:{item.Email}</Text>
        </View>
     );
}
 
export default UnUsuario ;