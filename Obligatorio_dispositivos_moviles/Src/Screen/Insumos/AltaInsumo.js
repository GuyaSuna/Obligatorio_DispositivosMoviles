import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";

const db = DatabaseConnection.getConnection();

const AltaInsumo = () => {
  const [insumoName, setInsumoName] = useState("");
  const [insumoCantidad, setInsumoCantidad] = useState("");
  const navigation = useNavigation();

  const handleInsumoName = (insumoName) => {
    setInsumoName(insumoName);
  };

  const handleInsumoCantidad = (insumoCantidad) => {
    setInsumoCantidad(insumoCantidad);
  };
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  const validateData = () => {
    if (insumoName.trim() === "") {
      Alert.alert("Error", "El nombre del Insumo es obligatorio");
      return false;
    }
    if (insumoCantidad.trim() === "" || insumoCantidad < 1) {
      Alert.alert(
        "Error",
        "La cantidad del Insumo es obligatoria y debe ser un valor aceptado"
      );
      return false;
    }
    return true;
  };

  const addInsumo = async () => {
    if (validateData()) {
      console.log("*** DATOS ***", insumoName, insumoCantidad);
      try {
        const rowsAffected = await DatabaseConnection.InsertInsumo(
          insumoName,
          insumoCantidad
        );
        if (rowsAffected > 0) {
          Alert.alert(
            "Exito",
            "Insumo registrado correctamente",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("Insumos"),
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          Alert.alert(
            "Error",
            "Insumo no se registró correctamente",
            [
              {
                text: "Ok",
              },
            ],
            {
              cancelable: false,
            }
          );
        }
      } catch (error) {
        console.log("No se pudo recibir el dato");
      }
    }
  };

  const clearData = () => {
    setInsumoName("");
    setInsumoCantidad("");
  };

  return (
    <Background>
      <SafeAreaView>
        <View>
          <View style={styles.listItemView}>
            <ScrollView>
              <KeyboardAvoidingView>
                <MyInputText
                  placeholder="Ingrese el nombre del Insumo"
                  onChangeText={handleInsumoName}
                  value={insumoName}
                  onSubmitEditing={hideKeyboard}
                />
                <MyInputText
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  onChangeText={handleInsumoCantidad}
                  value={insumoCantidad}
                  onSubmitEditing={hideKeyboard}
                />
                <BotonPrincipal
                  title="Ingresar"
                  btnColor="green"
                  onPress={addInsumo}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});
export default AltaInsumo;
