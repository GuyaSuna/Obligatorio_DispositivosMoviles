import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

import { useNavigation } from "@react-navigation/native";

const TodosLosInusmos = () => {
  //Definimos un estado local para guardar los datos de Insumos

  const [Insumos, setInsumos] = useState([]);
  const navigation = useNavigation();

  //Con el useEffect cargamos los insumos.

  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
  }, []);
  const handleObservar = (item) => {
    navigation.navigate("UnInsumo", {
      Nombre: item.Nombre,
      Cantidad: item.Cantidad,
    });
  };
  const handleBorrar = (item) => {
    let comprobante = DatabaseConnection.DeleteInsumo(
      item.id,
      item.Nombre,
      item.Cantidad
    );
    if ((comprobante = true)) {
      Alert.alert(
        "Exito",
        "Insumo eliminado correctamente",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("PaginaPrincipal"),
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      Alert.alert(
        "Error",
        "Fallo en Delete",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("PaginaPrincipal"),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };
  //LISTA DE INSUMOS
  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="INSUMO: " textStyle={styles.textStyle} />
        <MyText textValue={item.Nombre} textStyle={styles.textStyle} />

        <MyText textValue="CANT. EN LITROS: " textStyle={styles.textStyle} />
        <MyText textValue={item.Cantidad} textStyle={styles.textStyle} />

        <BotonPrincipal title="Observar" onPress={() => handleObservar(item)} />
        <BotonPrincipal title="Borrar" onPress={() => handleBorrar(item)} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={Insumos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TodosLosInusmos;

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
