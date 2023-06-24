import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";
import DatabaseConnection from "../../DataBase/dbConnection"
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const VerTodosLosTratamientos = () => {

  const [Tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    DatabaseConnection.BuscarTratamientos(setTratamientos); 
  }, []);
  const handleObservar = (item) => {

    navigation.navigate('UnaZona', { 
        Lugar : item.Lugar,
        Departamento: item.Departamento,
        Cantidad: item.Cantidad,
        Latitud: item.Latitud,
        Longitud: item.Longitud        
     });
  };
  const handleBorrar = (item) => {

   let comprobante = DatabaseConnection.DeleteZona(item.Latitud, item.Longitud, item.Lugar);
   if(comprobante = true){
    Alert.alert("Exito", "Zona borrada correctamente", [
        {
          text: "Ok",
          onPress: () => navigation.navigate("PaginaPrincipal"),
        }
      ],
      {
        cancelable: false
      }
      );
   }else {
    Alert.alert("Error", "Fallo en Delete", [
      {
        text: "Ok",
        onPress: () => navigation.navigate("PaginaPrincipal"),
      }
    ],
    {
      cancelable: false
    }
    )
  }


  };
  const listItemView = (item) => {
    const fechaInicio = format(new Date(item.FechaInicio), "dd/MM/yyyy");
  const fechaFinalizacion = format(new Date(item.FechaFinalizacion), "dd/MM/yyyy");
  
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Nombre" textStyle={styles.textStyle} />
        <MyText textValue={item.Nombre} textStyle={styles.textStyle} />
  
        <MyText textValue="Fecha Inicio" textStyle={styles.textStyle} />
        <MyText textValue={fechaInicio} textStyle={styles.textStyle} />

        <MyText textValue="Fecha Finalizacion" textStyle={styles.textStyle} />
        <MyText textValue={fechaFinalizacion} textStyle={styles.textStyle} />
  
        <BotonPrincipal title="Observar" onPress={() => handleObservar(item)} />
        <BotonPrincipal title="Borrar" onPress={()=> handleBorrar(item)}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={Tratamientos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerTodosLosTratamientos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});