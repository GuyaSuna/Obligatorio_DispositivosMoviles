import React from "react";
import { Text, View } from "react-native";

const UnaZona = ({ route }) => {
  const  item  = route.params;

  return (
    <View>
      <Text>Lugar: {item.Lugar}</Text>
      <Text>Cantidad: {item.Cantidad}</Text>
      {/* Mostrar otros datos de la zona si es necesario */}
    </View>
  );
};

export default UnaZona;
