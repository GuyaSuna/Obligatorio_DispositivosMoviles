import { React, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import MapView, { Marker } from "react-native-maps";
import Background from "../../Componentes/Background";

const UnTratamiento = ({ route }) => {
  const [selectedZona, setSelectedZona] = useState(null);
    const [Insumos, setInsumos] = useState([]);
    const [Observaciones, setObservaciones] = useState([]);
  const item = route.params;
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    DatabaseConnection.SeleccionarZonaUnica(parseInt(item.Zona), setSelectedZona);
    console.log("ZONAAAAA",selectedZona)
  }, []);

  useEffect(() => {
    let Insu = item.Insumos.split("**");
let Guardados = [];
    for(let i = 0 ; i <Insu.length ; i++ ){
      let ParteInsu = Insu[i] 
        Guardados.push(ParteInsu); 
    }
    Guardados.pop()
 setInsumos(Guardados)

 let Obs = item.Observaciones.split("**");
 let GuardadosObs = [];
     for(let j = 0 ; j <Obs.length ; j++ ){
       let ParteObs = Obs[j] 
         GuardadosObs.push(ParteObs); 
     }
     GuardadosObs.pop()
  setObservaciones(Guardados)
  },[item])

  const HandleModificar = () => {
    navigation.navigate("ModificarTratamiento", {
      Id: item.Id,
      Nombre: item.Nombre,
      Zona: item.Zona,
      Usuario: item.Usuario,
      FechaInicio: item.FechaInicio,
      FechaFinalizacion: item.FechaFinalizacion,
      Tiempo: item.Tiempo,
      OrdenTrabajo: item.OrdenTrabajo,
      Insumos: item.Insumos,
      Observaciones: item.Observaciones,
    });
  };

  useEffect(() => {
    if (selectedZona && selectedZona.Latitud && selectedZona.Longitud && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: selectedZona.Latitud,
        longitude: selectedZona.Longitud,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedZona]);

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Id: {item?.Id}</Text>
          <Text style={styles.label}>Nombre: {item?.Nombre}</Text>
          <Text style={styles.label}>Tiempo: {item?.Tiempo}</Text>
          <Text style={styles.label}>FechaInicio: {item?.FechaInicio}</Text>
          <Text style={styles.label}>FechaFinalizacion: {item?.FechaFinalizacion}  </Text>
          <Text style={styles.label}>Usuario: {item?.Usuario}</Text>
          {Insumos.map((Insumo, index) => (
          <View key={index}>
            <Text  style={styles.itemName}>Nombre del insumo: {Insumo.split(",")[1]}</Text>
            <Text style={styles.itemQuantity}>Cantidad: {Insumo.split(",")[2]}</Text>
          </View>
        ))}
          {Observaciones.map((Observacion, index) => (
          <View key={index}>
            <Text  style={styles.itemName}>Titulo de la Observacion: {Observacion.split(",")[1]}</Text>
            <Text style={styles.itemQuantity}>Anda a saber: {Observacion.split(",")[2]}</Text>
          </View>
        ))}
          <Text style={styles.label}> Zona:{" "} {selectedZona
              ? `Latitud: ${selectedZona.Latitud}, Longitud: ${selectedZona.Longitud}`
              : ""}
          </Text>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: selectedZona?.Latitud || 0,
              longitude: selectedZona?.Longitud || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedZona?.Latitud || 0,
                longitude: selectedZona?.Longitud || 0,
              }}
            />
          </MapView>
          <BotonPrincipal title="Modificar" onPress={() => HandleModificar()} />
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
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
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderColor: 'grey',
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 12,
  },
});

export default UnTratamiento;
