import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaViewBase,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import {Picker} from '@react-native-picker/picker';
import { Marker,MapView } from "react-native-maps";

const AltaZona = () => {

  const [Lugar, setLugar] = useState("");
  const [Departamento, setDepartamento] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Latitud, setLatitud] = useState(null);
  const [Longitud, setLongitud] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigation = useNavigation();
  const db = DatabaseConnection.getConnection();

  useEffect (() => {
checkLocationPermission();
  }, []);


  const handleLugar = (lugar) => {
    setLugar(lugar);
  };

  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  };

  const handleCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  };

  const validateData = () => {
    if (Lugar === "" && !Lugar.trim()) {
      Alert.alert("Error", "El Lugar de usuario es obligatorio");
      return false;
    }

    if (Departamento === "" && !Departamento.trim()) {
      Alert.alert("Error", "El Departamento es obligatoria");
      return false;
    }

    if (isNaN(Cantidad) || Cantidad <= 0) {
      Alert.alert("Error", "La cantidad debe ser un número válido");
      return false;
    }

    if (isNaN(Latitud)) {
      Alert.alert("Error", "La latitud debe ser un número válido");
      return false;
    }

    if (isNaN(Longitud)) {
      Alert.alert("Error", "La longitud debe ser un número válido");
      return false;
    }

    return true;
  };

  const addZone = async () => {
    console.log("### add Zona ###");

    if (validateData()) {
      console.log("### save zona ###");

      // llamar a la db y guardar los datos
      try {
        const rowsAffected = await DatabaseConnection.inserZona(
          Lugar,
          Departamento,
          Cantidad,
          Latitud,
          Longitud
        );
        if (rowsAffected > 0) {
          Alert.alert(
            "Exito",
            "Zona registrada correctamente",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("PaginaPrincipal"),
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          Alert.alert(
            "Error",
            "Zona no se registró correctamente",
            [
              {
                text: "Ok",
              },
            ],
            {
              cancelable: false,
            }
          );
        }
      } catch (error) {
        console.log("No se pudo recibir el dato");
      }
    }
  };


  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
  };

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    setLatitud(event.nativeEvent.coordinate.latitude);
    setLongitud(event.nativeEvent.coordinate.longitude);
  };
    
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
             
              <Picker 
                selectedValue={Lugar}
                onValueChange={handleLugar}
                style={styles.inputEmail}
              >
                <Picker.Item label="Lugar" value="" />
                <Picker.Item label="Estancia" value="Estancia" />
                <Picker.Item label="Quinta" value="Quinta" />
                <Picker.Item label="Plantacion" value="Plantacion" />
              </Picker>
              <MyInputText
                styles={styles.inputEmail}
                placeholder="Departamento"
                onChangeText={handleDepartamento}
                value={Departamento}
              />

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Latitud || 0,
              longitude: Longitud || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
              <MyInputText
                styles={styles.inputEmail}
                placeholder="Cantidad"
                onChangeText={handleCantidad}
                value={Cantidad}
              />

              <BotonPrincipal title="Alta Zona" onPress={addZone} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AltaZona;

const styles = StyleSheet.create({
  container: {},
  inputUser: {},
  inputPassword: {},
  
});
