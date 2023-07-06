import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  Text,
  Button,
} from "react-native";
import MyText from "../../Componentes/MyText";
import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import Background from "../../Componentes/Background";

const VerTodosLosTratamientos = () => {
  const [Tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    DatabaseConnection.BuscarTratamientos(setTratamientos);
  }, []);
  const handleObservar = (item) => {
    navigation.navigate("UnTratamiento", {
      Id: item.id,
      Nombre: item.Nombre,
      Zona: item.Zona,
      Usuario: item.Usuario,
      FechaInicio: item.FechaInicio,
      FechaFinalizacion: item.FechaFinalizacion,
      Tiempo: item.Tiempo,
      OrdenTrabajo: item.OrdenTrabajo,
      Insumos: item.Insumos,
      Observaciones: item.Observaciones,
    });
  };
  const handleBorrar = (item) => {
    console.log(item.id);
    let comprobante = DatabaseConnection.DeleteTratamientos(item.id);
    if ((comprobante = true)) {
      Alert.alert(
        "Exito",
        "Tratamiento borrado correctamente",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Tratamientos"),
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
  const listItemView = (item) => {
    return (
      <Background>
        <View key={item.id} style={styles.listItemView}>
          <MyText textValue="Nombre" textStyle={styles.textStyle} />
          <MyText textValue={item.Nombre} textStyle={styles.textStyle} />

          <MyText textValue={item.id} textStyle={styles.textStyle} />

          <MyText textValue="Fecha Inicio" textStyle={styles.textStyle} />
          <MyText textValue={item.FechaInicio} textStyle={styles.textStyle} />

          <MyText textValue="Fecha Finalizacion" textStyle={styles.textStyle} />
          <MyText
            textValue={item.FechaFinalizacion}
            textStyle={styles.textStyle}
          />

          <BotonPrincipal
            title="Observar"
            onPress={() => handleObservar(item)}
          />
          <BotonPrincipal title="Borrar" onPress={() => handleBorrar(item)} />
        </View>
      </Background>
    );
  };

  return (
    <Background>
      {Tratamientos.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                data={Tratamientos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noTratamientoContainer}>
          <View style={styles.noTratamientoContent}>
            <Text style={styles.noTratamientoText}>No hay Tratamientos</Text>
            <Button
              title="Ir al MainScreen"
              onPress={() => navigation.navigate("PaginaPrincipal")}
            />
          </View>
        </View>
      )}
    </Background>
  );
};
export default VerTodosLosTratamientos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemView: {
    backgroundColor: "white",
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  noTratamientoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noTratamientoContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noTratamientoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 20,
  },
});
