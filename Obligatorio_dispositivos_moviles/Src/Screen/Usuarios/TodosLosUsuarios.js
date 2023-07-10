import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import MyText from "../../Componentes/MyText";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";
import BotonBorrar from "../../Componentes/BotonBorrar";

const db = DatabaseConnection.getConnection();

const TodosLosUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [Tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarTratamientos(setTratamientos);
  }, []);

  const handleObservar = (item) => {
    navigation.navigate("UnUsuario", {
      Id: item.Id,
      Nombre: item.Nombre,
      Apellido: item.Apellido,
      Email: item.Email,
    });
  };

  const handleBorrar = (item) => {
    for (let i = 0; i < Tratamientos.length; i++) {
      if (parseFloat(Tratamientos[i].Usuario) === item.id) {
        Alert.alert(
          "El usuario no puede borrarse ya que es parte de un Tratamiento"
        );
        return;
      }
    }
    let comprobante = DatabaseConnection.DeleteUsuario(item.id);
    if ((comprobante = true)) {
      Alert.alert(
        "Exito",
        "Usuario borrado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("ScreenUsuarios"),
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      Alert.alert(
        "Error",
        "Fallo en el delete",
        [
          {
            text: "OK",
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
          <MyText textValue="Nombre" textStyle={styles.text} />
          <MyText textValue={item.Nombre} textStyle={styles.textStyle} />
          <MyText textValue="Apellido" textStyle={styles.text} />
          <MyText textValue={item.Apellido} textStyle={styles.textStyle} />

          <MyText textValue="Email" textStyle={styles.text} />
          <MyText textValue={item.Email} textStyle={styles.textStyle} />

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
      {usuarios.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noUsuarioContainer}>
          <View style={styles.noUsuarioContent}>
            <Text style={styles.noUsuarioText}>No hay Usuarios</Text>
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
export default TodosLosUsuarios;
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
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },

  noUsuarioContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noUsuarioContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noUsuarioText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 20,
  },
});
