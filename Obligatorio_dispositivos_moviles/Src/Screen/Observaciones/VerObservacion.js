import React from "react";
import { StyleSheet, Text, View, Image , ScrollView, SafeAreaView} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";

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
    <Background>
      <SafeAreaView>
        <ScrollView>
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

            <BotonPrincipal
              title="Modificar"
              onPress={() => HandleModificar()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    margin: 15,
    borderRadius: 10,
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
   
    borderRadius: '5px',
    borderWidth: '2px',
    borderColor: 'grey',
  },
  
});

export default VerObservacion;
