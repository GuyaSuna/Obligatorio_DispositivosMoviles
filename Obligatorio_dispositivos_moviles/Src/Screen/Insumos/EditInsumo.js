import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import MyText from "../../Componentes/MyText"; Lo vamos a usar para el buscador.
import MyInputText from "../../Componentes/MyInputText";
import MySingleButton from "../../Componentes/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";

const db = DatabaseConnection.getConnection();

const EditInsumo = () => {
  // Estados

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

  // Metodo con el que validamos datos.

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

  const editUser = () => {
    if (validateData) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE insumos set insumoName=?, insumoCantidad=? WHERE insumoName=?",
          [insumoName, insumoCantidad],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Insumo actualizado satisfactoriamente.", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("PaginaPrincipal"),
                },
                {
                  cancelable: false,
                },
              ]);
            } else {
              Alert.alert("Error al actualizar el Insumo.");
            }
          }
        );
      });
    }
  };
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

export default EditInsumo;
