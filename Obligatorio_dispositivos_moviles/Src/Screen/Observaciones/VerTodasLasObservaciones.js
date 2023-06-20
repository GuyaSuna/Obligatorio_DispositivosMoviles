import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";
import DatabaseConnection from "../../DataBase/dbConnection"
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";


const db = DatabaseConnection.getConnection();

const TodasLasObservaciones = () => {
  // definir un estado local, para guardar los usuarios
  const [Observaciones, setObservaciones] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar las zonas
  useEffect(() => {
    DatabaseConnection.BuscarObservaciones(setObservaciones); // Llamada a BuscarZonas con setZonas como argumento
  }, []);
  const handleObservar = (item) => {

    navigation.navigate('VerObservaciones', { 
        Titulo : item.Titulo,
        Foto: item.Foto,
        Latitud: item.Latitud,
        Longitud: item.Longitud        
     });
  };

  const handleBorrar = (item) => {
   let comprobante =  DatabaseConnection.DeleteObservaciones(item.Titulo, item.Foto, item.Latitud, item.Longitud)
      if(comprobante){
        Alert.alert("Éxito", "Observación borrada correctamente", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("PaginaPrincipal"),
          }
        ],
        {
          cancelable: false
        });
      }
      else {
        Alert.alert("Error", error.message, [
          {
            text: "Ok",
          }
        ],
        {
          cancelable: false
        });    
  };
}
  
  
  
  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Titulo" textStyle={styles.textStyle} />
        <MyText textValue={item.Titulo} textStyle={styles.textStyle} />
  
        <MyText textValue="Latitud" textStyle={styles.textStyle} />
        <MyText textValue={item.Latitud} textStyle={styles.textStyle} />

        <MyText textValue="Longitud" textStyle={styles.textStyle} />
        <MyText textValue={item.Longitud} textStyle={styles.textStyle} />
  
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
            data={Observaciones}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TodasLasObservaciones;

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