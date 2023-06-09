import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyText from "../../Componentes/MyText";
import MyInputText from "../../Componentes/MyInputText";
import MySingleButton from "../../Componentes/MySingleButton";
import { useNavigation } from "@react-navigation/native";

// Conexión a DB

import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

const ViewInsumo = () => {
  const [insumoName, setInsumoName] = useState("");
  const [insumo, setInsumo] = useState(null);
  const navigation = useNavigation();

  //console.log("VER INSUMO", insumo)

  const handleInsumoName = (insumoname) => {
    setInsumoName(insumoname);
  };

  const getInsumo = () => {
    if (!insumoName && !insumoName.length && insumoName === "") {
      Alert.alert("El nombre del Insumo es obligatorio");
      return false;
    }
    // console.log("### isumoName ###", insumoName);

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos  WHERE   insumoName=?",
        [insumoName],
        (tx, results) => {
          console.log("Results", results.rows);
          if (results.rows.length > 0) {
            console.log("seteo ins");
            setUser(results.rows._array[0]);
          } else {
            Alert.alert(
              "Error",
              "El usuario no existe",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              {
                cancelable: false,
              }
            );
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyText text="Filtrar Insumo" style={styles.text} />
              <MyInputText
                placeholder="Nombre del Insumo"
                onChangeText={handleInsumoName}
                style={styles.input}
                value={insumoName}
              />
              <MySingleButton title="Buscar" onPress={getInsumo} />

              <View style={styles.presenterView}>
                {insumo ? (
                  <>
                    <MyText
                      textValue="id"
                      textStyle={styles.presenterTextBold}
                    />
                    <MyText
                      textValue={insumo.id.toString()}
                      textStyle={styles.presenterText}
                    />
                    <MyText
                      textValue="Nombre del Insumo"
                      textStyle={styles.presenterTextBold}
                    />
                    <MyText
                      textValue={insumo.insumoName}
                      textStyle={styles.presenterText}
                    />
                    <MyText
                      textValue="Cantidad en Litros"
                      textStyle={styles.presenterTextBold}
                    />
                    <MyText
                      textValue={insumo.insumoCantidad}
                      textStyle={styles.presenterText}
                    />
                  </>
                ) : (
                  <Text style={styles.presenterText}>No hay Insumos</Text>
                )}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  input: {
    padding: 10,
    margin: 10,
    color: "black",
  },
  presenterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignContent: "center",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  presenterText: {
    fontSize: 18,
    color: "black",
  },
  presenterTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
