import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import Background from "../../Componentes/Background";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const MyComponent = () => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigation = useNavigation();
  const mapRef = useRef(null);
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const handleTitle = (title) => {
    setTitle(title);
  };

  const validateData = () => {
    if (title === "" && !title.trim()) {
      Alert.alert("Error", "El titulo  es obligatorio");
      return false;
    }

    if (imageUri === "" && !imageUri.trim()) {
      Alert.alert("Error", "La imagen es obligatoria");
      return false;
    }

    if (isNaN(longitude)) {
      Alert.alert("Error", "La longitud debe ser un número válido");
      return false;
    }

    if (isNaN(latitude)) {
      Alert.alert("Error", "La latitud debe ser un número válido");
      return false;
    }

    return true;
  };

  const addObs = async () => {
    console.log("### add Obs ###", title, imageUri, latitude, longitude);

    if (validateData()) {
      console.log("### save Observacion ###");

      // llamar a la db y guardar los datos
      try {
        const rowsAffected = await DatabaseConnection.insertObservaciones(
          title,
          imageUri,
          latitude,
          longitude
        );
        if (rowsAffected > 0) {
          Alert.alert(
            "Exito",
            "Observacion registrada correctamente",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("Observaciones"),
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          Alert.alert(
            "Error",
            "Observacion no se registró correctamente",
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
    setLocationPermission(status === "granted");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleGetLocation = async () => {
    if (locationPermission) {
      try {
        const location = await Location.getCurrentPositionAsync();
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        UbicarMapa(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Location permission denied");
    }
  };
  const UbicarMapa = (lati, longi) => {
    mapRef.current.animateToRegion({
      latitude: lati,
      longitude: longi,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    setLatitude(event.nativeEvent.coordinate.latitude);
    setLongitude(event.nativeEvent.coordinate.longitude);
  };

  return (
    <Background>
      <SafeAreaView>
        <View>
          <View style={styles.listItemView}>
            <ScrollView>
              <View style={styles.container}>
                <Picker
                  selectedValue={title}
                  onValueChange={handleTitle}
                  style={styles.picker}
                >
                  <Picker.Item label="Titulo" value="" />
                  <Picker.Item
                    label="Plaga Detectada"
                    value="Plaga Detectada"
                  />
                  <Picker.Item
                    label="Planta en mal estado"
                    value="Planta en mal estado"
                  />
                  <Picker.Item label="Falta de Riego" value="Falta de Riego" />
                </Picker>

                <MapView
                  ref={mapRef}
                  style={styles.map}
                  initialRegion={{
                    latitude: latitude || 0,
                    longitude: longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={handleMapPress}
                >
                  {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
                {imageUri && (
                  <Image source={{ uri: imageUri }} style={styles.image} />
                )}
                <View style={styles.buttonContainer}>
                  <BotonPrincipal
                    title="Seleccionar imagen"
                    onPress={pickImage}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <BotonPrincipal
                    title="Obtener ubicación"
                    onPress={handleGetLocation}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <BotonPrincipal title="Alta" onPress={addObs} />
                </View>
                {latitude && longitude && (
                  <Text style={styles.locationText}>
                    Latitude: {latitude}, Longitude: {longitude}
                  </Text>
                )}
              
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  picker: {
    height: 200,
    marginBottom: 5,

    borderColor: "grey",
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderColor: "grey",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    borderColor: "grey",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 10,
    marginBottom: 30,
    padding: 10,

    height: 580,
  },
});

export default MyComponent;
