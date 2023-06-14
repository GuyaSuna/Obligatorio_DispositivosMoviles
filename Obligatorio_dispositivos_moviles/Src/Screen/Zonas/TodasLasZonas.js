import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";
import DatabaseConnection from "../../DataBase/dbConnection"
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const TodasLasZonas = () => {
  // definir un estado local, para guardar los usuarios
  const [Zonas, setZonas] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar las zonas
  useEffect(() => {
    DatabaseConnection.BuscarZonas(setZonas); // Llamada a BuscarZonas con setZonas como argumento
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
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Lugar" textStyle={styles.textStyle} />
        <MyText textValue={item.Lugar} textStyle={styles.textStyle} />
  
        <MyText textValue="Cantidad" textStyle={styles.textStyle} />
        <MyText textValue={item.Cantidad} textStyle={styles.textStyle} />
  
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
            data={Zonas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TodasLasZonas;

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