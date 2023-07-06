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
import BotonBorrar from "../../Componentes/BotonBorrar";

const TodasLasZonas = () => {
  // definir un estado local, para guardar los usuarios
  const [Zonas, setZonas] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar las zonas
  useEffect(() => {
    DatabaseConnection.BuscarZonas(setZonas); // Llamada a BuscarZonas con setZonas como argumento
  }, []);
  const handleObservar = (item) => {
    navigation.navigate("UnaZona", {
      Lugar: item.Lugar,
      Departamento: item.Departamento,
      Cantidad: item.Cantidad,
      Latitud: item.Latitud,
      Longitud: item.Longitud,
    });
  };
  const handleBorrar = (item) => {
    let comprobante = DatabaseConnection.DeleteZona(item.id);
    if ((comprobante = true)) {
      Alert.alert(
        "Exito",
        "Zona borrada correctamente",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Zonas"),
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
          <MyText textValue="Lugar" textStyle={styles.text} />
          <MyText textValue={item.Lugar} textStyle={styles.textStyle} />

          <MyText textValue="Cantidad" textStyle={styles.text} />
          <MyText textValue={item.Cantidad} textStyle={styles.textStyle} />

          <BotonPrincipal
            title="Observar"
            onPress={() => handleObservar(item)}
          />
          <BotonBorrar title="Borrar" onPress={() => handleBorrar(item)} />
        </View>
      </Background>
    );
  };

  return (
    <Background>
      {Zonas.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                data={Zonas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noZonaContainer}>
          <View style={styles.noZonaContent}>
            <Text style={styles.noZonaText}>No hay Zonas</Text>
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

export default TodasLasZonas;

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
  },
  text: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  noZonaContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noZonaContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noZonaText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 20,
  },
});
