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

const TodasLasObservaciones = () => {
  // definir un estado local, para guardar los usuarios
  const [Observaciones, setObservaciones] = useState([]);
  const navigation = useNavigation();
  // useEffect para cargar las zonas
  useEffect(() => {
    DatabaseConnection.BuscarObservaciones(setObservaciones); // Llamada a BuscarZonas con setZonas como argumento
  }, []);
  const handleObservar = (item) => {
    navigation.navigate("VerObservaciones", {
      Titulo: item.Titulo,
      Foto: item.Foto,
      Latitud: item.Latitud,
      Longitud: item.Longitud,
    });
  };

  const handleBorrar = async (item) => {
    try {
      DatabaseConnection.DeleteObservaciones(item.id);
      Alert.alert(
        "Éxito",
        "Observación borrada correctamente",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Observaciones"),
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.message,
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
  };

  const listItemView = (item) => {
    return (
      <Background>
        <View key={item.id} style={styles.listItemView}>
          <MyText textValue="Titulo" textStyle={styles.text} />
          <MyText textValue={item.Titulo} textStyle={styles.textStyle} />

          <MyText textValue="Latitud" textStyle={styles.text} />
          <MyText textValue={item.Latitud} textStyle={styles.textStyle} />

          <MyText textValue="Longitud" textStyle={styles.text} />
          <MyText textValue={item.Longitud} textStyle={styles.textStyle} />

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
      {Observaciones.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                data={Observaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noObservacionContainer}>
          <View style={styles.noObservacionContent}>
            <Text style={styles.noObservacionText}>No hay Observaciones</Text>
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

export default TodasLasObservaciones;

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
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  noObservacionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noObservacionContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noObservacionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 20,
  },
});
