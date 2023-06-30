import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";
import DatabaseConnection from "../../DataBase/dbConnection"
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import Background from "../../Componentes/Background";

const VerTodosLosTratamientos = () => {

  const [Tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    DatabaseConnection.BuscarTratamientos(setTratamientos); 
  }, []);
  const handleObservar = (item) => {

    navigation.navigate('UnTratamiento', { 
        Id: item.id,
        Nombre : item.Nombre,
        Zona: item.Zona,
        Usuario: item.Usuario,
        FechaInicio: item.FechaInicio,
        FechaFinalizacion: item.FechaFinalizacion ,
        Tiempo: item.Tiempo,
        OrdenTrabajo: item.OrdenTrabajo,
        Insumos: item.Insumos,
        Observaciones: item.Observaciones ,    
     });
  };
  const handleBorrar = (item) => {
console.log(item.id)
   let comprobante = DatabaseConnection.DeleteTratamientos(item.id);
   if(comprobante = true){
    Alert.alert("Exito", "Tratamiento borrado correctamente", [
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
      <Background>
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Nombre" textStyle={styles.textStyle} />
        <MyText textValue={item.Nombre} textStyle={styles.textStyle} />

        <MyText textValue={item.id} textStyle={styles.textStyle} />
  
        <MyText textValue="Fecha Inicio" textStyle={styles.textStyle} />
        <MyText textValue={item.FechaInicio} textStyle={styles.textStyle} />

        <MyText textValue="Fecha Finalizacion" textStyle={styles.textStyle} />
        <MyText textValue={item.FechaFinalizacion} textStyle={styles.textStyle} />
  
        <BotonPrincipal title="Observar" onPress={() => handleObservar(item)} />
        <BotonPrincipal title="Borrar" onPress={()=> handleBorrar(item)}/>
      </View>
      </Background>
    );
  };

  return (
    <Background>
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
    </Background>
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