import React from "react";
import { Text, View } from "react-native";

const UnaZona = ({ route }) => {
  const  item  = route.params;

  return (
    <View>
      <Text>Lugar: {item.Lugar}</Text>
      <Text>Departamento: {item.Departamento}</Text>
      <Text>Cantidad: {item.Cantidad}</Text>
      <Text>Latitud: {item.Latitud} </Text> 
      <Text>Longitud: {item.Longitud}</Text>
      {/* Mostrar otros datos de la zona si es necesario */}
    </View>
  );
};

export default UnaZona;
