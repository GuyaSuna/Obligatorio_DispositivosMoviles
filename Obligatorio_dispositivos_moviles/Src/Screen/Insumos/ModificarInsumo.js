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
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";

const db = DatabaseConnection.getConnection();

const ModificarInsumos = ({ route }) => {
  //Definimos un estado local para guardar los datos de Insumos
  const item = route.params;

  const [insumoName, setInsumoName] = useState(item.Nombre || "");
  const [insumoCantidad, setInsumoCantidad] = useState(
    item.Cantidad ? String(item.Cantidad) : ""
  );

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

  const ModificarInsumos = () => {
    if (validateData()) {
      DatabaseConnection.ModificarInsumo(
        item.id,
        item.Nombre,
        item.Cantidad
      ).then((comprobante) => { if (comprobante) {
        Alert.alert(
          "Exito",
          "Zona modificada correctamente",
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
          "Zona no se modificó correctamente",
          [
            {
              text: "Ok",
            },
          ],
          {
            cancelable: false,
          }
        );
      }}
    )}
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

              <BotonPrincipal
                title="Editar Insumo"
                btnColor="green"
                onPress={ModificarInsumos}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModificarInsumos;
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
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "black",
  },
  input: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
