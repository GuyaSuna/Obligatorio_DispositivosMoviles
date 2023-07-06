import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import Background from "../../Componentes/Background";

const db = DatabaseConnection.getConnection();

const ModificarInsumos = ({ route }) => {
  const item = route.params;
  const [insumoName, setInsumoName] = useState(item.Nombre || "");
  const [insumoCantidad, setInsumoCantidad] = useState(
    item.Cantidad ? String(item.Cantidad) : ""
  );
  const navigation = useNavigation();

  const handleInsumoName = (insumoName) => {
    setInsumoName(insumoName);
  };

  const handleInsumoCantidad = (insumoCantidad) => {
    setInsumoCantidad(insumoCantidad);
  };

  const validateData = () => {
    if (insumoName === "" || !insumoName.trim()) {
      Alert.alert("Error", "El nombre del Insumo es obligatorio");
      return false;
    }
    if (insumoCantidad === "" || !insumoCantidad.trim() || insumoCantidad < 1) {
      Alert.alert(
        "Error",
        "La cantidad del Insumo es obligatoria y debe ser una suma valida"
      );
      return false;
    }
    return true;
  };

  const modificar = () => {
    console.log(" Modificar ", insumoName, insumoCantidad, item.Nombre);
    if (validateData()) {
      DatabaseConnection.ModificarInsumo(
        insumoName,
        insumoCantidad,
        item.Nombre
      ).then((comprobante) => {
        if (comprobante) {
          Alert.alert(
            "Exito",
            "Insumo modificado correctamente",
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
            "Insumo no se modificó correctamente",
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
      });
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <View>
          <View style={styles.listItemView}>
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
                  keyboardType="numeric"
                  onChangeText={handleInsumoCantidad}
                  value={insumoCantidad}
                />

                <BotonPrincipal title="Editar Insumo" onPress={modificar} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Background>
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
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});
