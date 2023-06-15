import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const UnInsumo = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();

  const HandleModificar = () => {
    navigation.navigate("ModificarZona", {
      Nombre: item.Nombre,
      Cantidad: item.Cantidad,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre: {item?.Nombre}</Text>
      <Text style={styles.label}>Cantidad: {item?.Cantidad}</Text>

      <BotonPrincipal title="Modificar" onPress={() => HandleModificar()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
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
});

export default UnInsumo;
