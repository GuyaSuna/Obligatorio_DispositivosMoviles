import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const UnInsumo = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();

  const HandleModificar = () => {
    navigation.navigate("ModificarInsumo", {
      Nombre: item.Nombre,
      Cantidad: item.Cantidad,
    });
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.listItemView}>
          <Text style={styles.label}>Nombre: {item?.Nombre}</Text>
          <Text style={styles.label}>Cantidad: {item?.Cantidad}</Text>
          <BotonPrincipal title="Modificar" onPress={() => HandleModificar()} />
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
    height: 180,
  },
});

export default UnInsumo;
