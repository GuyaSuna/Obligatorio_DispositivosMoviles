import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  Button,
  Text,
} from "react-native";
import MyText from "../../Componentes/MyText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import Background from "../../Componentes/Background";
import BotonBorrar from "../../Componentes/BotonBorrar";
import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

import { useNavigation } from "@react-navigation/native";

const TodosLosInusmos = () => {
  //Definimos un estado local para guardar los datos de Insumos

  const [Insumos, setInsumos] = useState([]);
  const [Tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  //Con el useEffect cargamos los insumos.

  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarTratamientos(setTratamientos);
  }, []);
  const handleObservar = (item) => {
    navigation.navigate("UnInsumo", {
      Nombre: item.Nombre,
      Cantidad: item.Cantidad,
    });
  };
  const handleBorrar = (item) => {
    let id = 0;
    for (let j = 0; j < Tratamientos.length; j++) {
      let partesIns = Tratamientos[j].Insumos.split("**");
      for (let i = 0; i < partesIns.length; i++) {
        let AtributosIns = partesIns[i].split(",");
        if (AtributosIns.length === 3) {
          id = parseInt(AtributosIns[0]);
          if (item.id === id) {
            Alert.alert(
              "No se puede eliminar un insumo que es parte de un Tratamiento"
            );
            return;
          }
        }
      }
    }
    let comprobante = DatabaseConnection.DeleteInsumo(item.id);
    if ((comprobante = true)) {
      Alert.alert(
        "Exito",
        "Insumo borrado correctamente",
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
  //LISTA DE INSUMOS
  const listItemView = (item) => {
    return (
      <Background>
        <View key={item.id} style={styles.listItemView}>
          <MyText textValue="INSUMO " textStyle={styles.text} />
          <MyText textValue={item.Nombre} textStyle={styles.textStyle} />

          <MyText textValue="CANT. EN LITROS " textStyle={styles.text} />
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
      {Insumos.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                data={Insumos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noInsumosContainer}>
          <View style={styles.noInsumosContent}>
            <Text style={styles.noInsumosText}>No hay Insumos</Text>
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
export default TodosLosInusmos;

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
  noInsumosContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noInsumosContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  noInsumosText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 20,
  },
});
