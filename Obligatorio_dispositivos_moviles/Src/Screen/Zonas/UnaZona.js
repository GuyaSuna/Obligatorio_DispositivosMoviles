import {React,useRef , useEffect}from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Background from "../../Componentes/Background";
const UnaZona = ({ route }) => {
  const item = route.params;
const navigation = useNavigation();
const mapRef = useRef(null);

useEffect(() => {
  if (item && item.Latitud && item.Longitud && mapRef.current) {
    mapRef.current.animateToRegion({
      latitude: item.Latitud,
      longitude: item.Longitud,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }
}, [item]);


const HandleModificar = () => {
  navigation.navigate("ModificarZona",  { 
    Lugar : item.Lugar,
    Departamento: item.Departamento,
    Cantidad: item.Cantidad,
    Latitud: item.Latitud,
    Longitud: item.Longitud        
 });
}

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.listItemView}>
        <Text style={styles.label}>Lugar: {item?.Lugar}</Text>
        <Text style={styles.label}>Departamento: {item?.Departamento}</Text>
        <Text style={styles.label}>Cantidad: {item?.Cantidad}</Text>
        <MapView
          ref={mapRef}
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
  map: {
    height: 200,
    margin: 20,
    
  },
  listItemView: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 400,
  },
});

export default UnaZona;
