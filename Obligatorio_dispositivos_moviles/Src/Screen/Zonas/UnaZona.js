import {React,useRef , useEffect}from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

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
    <View style={styles.container}>
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
  map: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
});

export default UnaZona;
