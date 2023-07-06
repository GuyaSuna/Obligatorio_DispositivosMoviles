import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";
import BotonModificar from "../../Componentes/BotonModificar";

const UnUsuario = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();

  const HandleModificar = () => {
    navigation.navigate("EditUsuarios", {
      Nombre: item.Nombre,
      Apellido: item.Apellido,
      Email: item.Email,
    });
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.listItemView}>
          <Text style={styles.label}>Nombre: {item?.Nombre}</Text>

          <Text style={styles.label}>Apellido: {item?.Apellido}</Text>

          <Text style={styles.label}>Email: {item?.Email}</Text>

          <BotonModificar title="Modificar" onPress={() => HandleModificar()} />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    height: 200,
  },
});

export default UnUsuario;
