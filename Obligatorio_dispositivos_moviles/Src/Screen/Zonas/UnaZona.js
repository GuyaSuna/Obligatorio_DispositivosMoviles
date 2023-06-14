import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const UnaZona = ({ route }) => {
  const item = route.params;
const navigation = useNavigation();

const HandleModificar = () => {
  navigation.navigate("ModificarZona",  { 
    Lugar : item.Lugar,
    Departamento: item.Departamento,
    Cantidad: item.Cantidad,
    Latitud: item.Latitud,
    Longitud: item.Longitud        
 });
}

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lugar: {item?.Lugar}</Text>


      <Text style={styles.label}>Departamento: {item?.Departamento}</Text>
    

      <Text style={styles.label}>Cantidad: {item?.Cantidad}</Text>
   

      <Text style={styles.label}>Latitud: {item?.Latitud}</Text>
    

      <Text style={styles.label}>Longitud: {item?.Longitud}</Text>


      <BotonPrincipal
      title="Modificar"
      onPress={() =>HandleModificar()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default UnaZona;
