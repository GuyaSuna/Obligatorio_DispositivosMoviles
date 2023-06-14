import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../Componentes/MyText";

import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

import { useNavigation } from "@react-navigation/native";

const TodosLosInusmos = () => {
  //Definimos un estado local para guardar los datos de Insumos

  const [insumos, setInsumos] = useState([]);
  const navigation = useNavigation();

  //Con el useEffect cargamos los insumos.

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM  insumos`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setInsumos(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Insumos",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("PaginaPrincipal"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);
  //LISTA DE INSUMOS
  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="INSUMO: " textStyle={styles.textStyle} />
        <MyText textValue={item.insumoName} textStyle={styles.textStyle} />

        <MyText textValue="CANT. EN LITROS: " textStyle={styles.textStyle} />
        <MyText textValue={item.insumoCantidad} textStyle={styles.textStyle} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={users}
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
