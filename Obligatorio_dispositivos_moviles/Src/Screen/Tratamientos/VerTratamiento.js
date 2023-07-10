import { React, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import MapView, { Marker } from "react-native-maps";
import Background from "../../Componentes/Background";

const UnTratamiento = ({ route }) => {
  const [selectedZona, setSelectedZona] = useState(null);
  const [Insumos, setInsumos] = useState([]);
  const [Observaciones, setObservaciones] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState([]);
  const item = route.params;
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const Fecha = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const FechaFormateada = Fecha.toLocaleDateString("es-UY", options);

  useEffect(() => {
    DatabaseConnection.SeleccionarZonaUnica(
      parseInt(item.Zona),
      setSelectedZona
    );
    console.log("ZONAAAAA", selectedZona);
  }, []);

  useEffect(() => {
    let Insu = item.Insumos.split("**");
    let Guardados = [];
    for (let i = 0; i < Insu.length; i++) {
      let ParteInsu = Insu[i];
      if ((ParteInsu.split(",").length = 3)) {
        Guardados.push(ParteInsu);
      }
    }
    setInsumos(Guardados);

    let Obs = item.Observaciones.split("**");
    let GuardadosObs = [];
    for (let j = 0; j < Obs.length; j++) {
      let ParteObs = Obs[j];
      if ((ParteObs.split(",").length = 5)) {
        GuardadosObs.push(ParteObs);
      }
    }
    setObservaciones(GuardadosObs);
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
          {item.FechaFinalizacion < FechaFormateada && (
            <Text style={styles.label}>Tratamiento Finalizado</Text>
          )}
          {item.FechaFinalizacion >= FechaFormateada && (
            <Text style={styles.label}>Tratamiento En Progreso </Text>
          )}
          <Text style={styles.label}>Nombre: {item?.Nombre}</Text>
          <Text style={styles.label}>Tiempo: {item?.Tiempo}</Text>
          <Text style={styles.label}>FechaInicio: {item?.FechaInicio}</Text>
          <Text style={styles.label}>
            FechaFinalizacion: {item?.FechaFinalizacion}{" "}
          </Text>
          <Text style={styles.label}>Usuario: {item?.Usuario}</Text>
          {item.OrdenTrabajo && (
            <Image source={{ uri: item.OrdenTrabajo }} style={styles.image} />
          )}
          {Insumos.map((Insumo, index) => (
            <View key={index}>
              <Text style={styles.itemName}>
                Nombre del insumo: {Insumo.split(",")[1]}
              </Text>
              <Text style={styles.itemQuantity}>
                Cantidad: {Insumo.split(",")[2]}
              </Text>
            </View>
          ))}
          {Observaciones.map((Observacion, index) => (
            <View key={index}>
              <Text style={styles.itemName}>
                Titulo de la Observacion: {Observacion.split(",")[1]}
              </Text>
            </View>
          ))}
          <Text style={styles.label}>
            {" "}
            Zona:{" "}
            {selectedZona
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
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderColor: "grey",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default UnTratamiento;
