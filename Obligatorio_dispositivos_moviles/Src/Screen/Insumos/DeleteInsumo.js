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
import { useNavigation } from "@react-navigation/native";
import MyInputText from "../../Componentes/MyInputText";
import MySingleButton from "../../Componentes/MySingleButton";

// Coneccion a DB
import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

const DeleteInsumo = () => {
  const [insumoName, setInsumoName] = useState("");
  const navigation = useNavigation();

  const deleteInsumo = () => {
    if (!insumoName && !insumoName.length && insumoName === "") {
      Alert.alert("El nombre del usuario es obligatorio.");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM insumos WHERE insumoName = ?",
        [insumoName],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Usuario borrado correctamente",
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
              "El item no existe",
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
        }
      );
    });
  };

  const handleInsumoName = (insumoname) => {
    setInsumoName(insumoname);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Nombre de usuario"
                onChangeText={handleInsumoName}
                value={insumoName}
                styles={styles.inputStyle}
              />
              <MySingleButton title="Borrar" onPress={deleteInsumo} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteInsumo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  generalView: {
    flex: 1,
  },
  inputStyle: {
    padding: 10,
  },
  textStyle: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
});
