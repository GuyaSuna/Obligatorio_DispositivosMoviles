import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";

const VerObservacion = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();

  const HandleModificar = () => {
    navigation.navigate("ModificarObservacion", {
      Titulo: item.Titulo,
      Foto: item.Foto,
      Latitud: item.Latitud,
      Longitud: item.Longitud,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo: {item?.Titulo}</Text>

      {item?.Foto && (
        <Image source={{ uri: item.Foto }} style={styles.image} />
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item?.Latitud || 0,
          longitude: item?.Longitud || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: item?.Latitud || 0,
            longitude: item?.Longitud || 0,
          }}
        />
      </MapView>

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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
});

export default VerObservacion;
