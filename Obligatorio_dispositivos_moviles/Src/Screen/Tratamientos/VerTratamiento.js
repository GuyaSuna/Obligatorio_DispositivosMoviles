import { React, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import MapView, { Marker } from "react-native-maps";
import Background from "../../Componentes/Background";

const UnTratamiento = ({ route }) => {
  const [selectedZona, setSelectedZona] = useState(null);
  const item = route.params;
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [selectedInsumo, setSelectedInsumo] = useState();

  useEffect(() => {
    DatabaseConnection.SeleccionarZonaUnica(
      parseInt(item.Zona),
      setSelectedZona
    );
    console.log("ZONAAAAA", selectedZona);
  }, []);

  useEffect(() => {
    let partesInsumos = item.Insumos.split("**");
    for (let i = 0; i < partesInsumos.length; i++) {
      let AtributosInsumos = partesInsumos[i].split(",");
      if (AtributosInsumos.length === 3) {
        let id = parseInt(AtributosInsumos[0]);
        if (item.id === id) {
          setSelectedInsumo({
            nombre: AtributosInsumos[1],
            cantidad: AtributosInsumos[2],
          });
          break;
        }
      }
    }
  }, [item]);

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
    if (
      selectedZona &&
      selectedZona.Latitud &&
      selectedZona.Longitud &&
      mapRef.current
    ) {
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
          <Text style={styles.label}>
            FechaFinalizacion: {item?.FechaFinalizacion}
          </Text>
          <Text style={styles.label}>Usuario: {item?.Usuario}</Text>

          <Text style={styles.label}>
            Zona:{" "}
            {selectedZona
              ? `Latitud: ${selectedZona.Latitud}, Longitud: ${selectedZona.Longitud}`
              : ""}
          </Text>
          {selectedInsumo && (
            <View>
              <Text style={styles.label}>
                Insumo: {selectedInsumo.nombre} | Cantidad:{" "}
                {selectedInsumo.cantidad}
              </Text>
            </View>
          )}
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
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderColor: "grey",
  },
});

export default UnTratamiento;
