import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import MySingleButton from "../../Componentes/MySingleButton";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";

const db = DatabaseConnection.getConnection();

const AddInsumo = () => {
  // Estados para los campos del forumulario

  const [insumoName, setInsumoName] = useState("");
  const [insumoCantidad, setInsumoCantidad] = useState("");

  const navigation = useNavigation();

  // Metodo para setear los estados

  const handleInsumoName = (insumoName) => {
    setInsumoName(insumoName);
  };

  const handleInsumoCantidad = (insumoCantidad) => {
    setInsumoCantidad(insumoCantidad);
  };

  // Metodo para guardar el formulario

  const addInsumo = () => {
    // console.log("### ADD INSUMO ###");

    if (validateData()) {
      // console.log("### Guardar Insumo ###");

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO insumos (insumoName, insumoCantidad) VALUES (?,?)",
          [insumoName, insumoCantidad],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Insumo agregado correctamente",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("HomeScreen"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert("Error al agregar el Insumo.");
            }
          }
        );
      });
    }
  };
  // Metodo para validar los datos

  const validateData = () => {
    if (insumoName === "" && !insumoName.trim()) {
      Alert.alert("Error", "El nombre del Insumo es obligatorio");
      return false;
    }
    if (insumoCantidad === "" && !insumoCantidad.trim()) {
      Alert.alert("La cantidad del Insumo es obligatoria");
      return false;
    }
    return true;
  };

  //  Limpiar datos
  const clearData = () => {
    setInsumoName("");
    setInsumoCantidad("");
  };

  // Formulario de registro de insumos.

  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputInsumo}
                placeholder="Ingrese el nombre del Insumo"
                onChangeText={handleInsumoName}
                value={insumoName}
              />
              <MyInputText
                styles={styles.inputCantidadInsumo}
                placeholder="Cantidad"
                keyboardType="numberOfLines"
                onChangeText={handleInsumoCantidad}
                value={insumoCantidad}
              />

              <MySingleButton
                styles={styles.button}
                title="Ingresar"
                btnColor="green"
                onPress={addInsumo}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
});

export default AddInsumo;
