import React from "react";
import { StyleSheet, Text, View , ScrollView} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const UnTratamiento = ({ route }) => {
  const item = route.params;
const navigation = useNavigation();

const HandleModificar = () => {
  navigation.navigate("ModificarTratamientos",  { 
    Lugar : item.Lugar,
    Departamento: item.Departamento,
    Cantidad: item.Cantidad,
    Latitud: item.Latitud,
    Longitud: item.Longitud        
 });
}

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Nombre: {item?.Nombre}</Text>


      <Text style={styles.label}>FechaInicio: {item?.FechaInicio}</Text>
    

      <Text style={styles.label}>FechaFinalizacion: {item?.FechaFinalizacion}</Text>
   

      <Text style={styles.label}>Insumos: {item?.Insumos}</Text>
    

      <Text style={styles.label}>Observacion: {item?.Observaciones}</Text>


      <BotonPrincipal
      title="Modificar"
      onPress={() =>HandleModificar()}
      />
    </View>
    </ScrollView>
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

export default UnTratamiento;
