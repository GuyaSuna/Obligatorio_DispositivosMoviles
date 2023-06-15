import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const UnUsuario = ({ route }) => {
  const item = route.params;
const navigation = useNavigation();

const HandleModificar = () => {
  navigation.navigate("EditUsuario",  { 
    Nombre: item.Nombre,
        Passwords: item.Passwords,
        Email : item.Email       
 });
}

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre: {item?.Nombre}</Text>


      <Text style={styles.label}>Contraseña: {item?.Passwords}</Text>
    

      <Text style={styles.label}>Email: {item?.Email}</Text>


      <BotonPrincipal
      title="Modificar"
      onPress={() =>HandleModificar()}
      />
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

export default UnUsuario;
