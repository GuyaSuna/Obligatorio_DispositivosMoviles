import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";

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

  const validateData = () => {
    if (insumoName.trim() === "") {
      Alert.alert("Error", "El nombre del Insumo es obligatorio");
      return false;
    }
    if (insumoCantidad.trim() === "") {
      Alert.alert("Error", "La cantidad del Insumo es obligatoria");
      return false;
    }
    return true;
  };

  const addInsumo = async () => {
    if (validateData()) {
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
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                style={styles.inputInsumo}
                placeholder="Ingrese el nombre del Insumo"
                onChangeText={handleInsumoName}
                value={insumoName}
              />
              <MyInputText
                style={styles.inputCantidadInsumo}
                placeholder="Cantidad"
                keyboardType="numeric"
                onChangeText={handleInsumoCantidad}
                value={insumoCantidad}
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
  );
};

const styles = StyleSheet.create({
  inputInsumo: {
    // Estilos para el input de insumo
  },
  inputCantidadInsumo: {
    // Estilos para el input de cantidad de insumo
  },
});

export default AltaInsumo;
