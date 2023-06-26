import React from "react";
import { StyleSheet, Text, View , ScrollView} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const UnTratamiento = ({ route }) => {
  const item = route.params;
const navigation = useNavigation();

const HandleModificar = () => {
  navigation.navigate("ModificarTratamiento",  { 
    Id : item.Id,
    Nombre : item.Nombre,
    Zona : item.Zona,
    Usuario: item.Usuario,
    FechaInicio: item.FechaInicio,   
    FechaFinalizacion: item.FechaFinalizacion,
    Tiempo: item.Tiempo,
    OrdenTrabajo: item.OrdenTrabajo,
    Insumos: item.Insumos,
    Observaciones: item.Observaciones,
 });
}

  return (
    <ScrollView>
    <View style={styles.container}>

    <Text style={styles.label}>Id: {item?.Id}</Text>

      <Text style={styles.label}>Nombre: {item?.Nombre}</Text>


      <Text style={styles.label}>FechaInicio: {item?.FechaInicio}</Text>
    

      <Text style={styles.label}>FechaFinalizacion: {item?.FechaFinalizacion}</Text>
   

      <Text style={styles.label}>Usuario: {item?.Usuario}</Text>
    

      <Text style={styles.label}>Zona: {item?.Zona}</Text>


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
