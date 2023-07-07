import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import Background from '../../Componentes/Background';
import DatabaseConnection from '../../DataBase/dbConnection';
import { useNavigation } from "@react-navigation/native";
import BotonPrincipal from '../../Componentes/BotonPrincipal';


const ModificarObservacion = ({ route }) => {
  const item = route.params;

  const [title, setTitle] = useState(item.Titulo);
  const [imageUri, setImageUri] = useState(item.Foto);
  const [latitude, setLatitude] = useState(item.Latitud);
  const [longitude, setLongitude] = useState(item.Longitud);

  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

const navigation = useNavigation();

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

  const Modificar =() => {
   console.log("### add Obs ###" , title, imageUri,latitude,longitude,item.Titulo, item.Foto, item.Latitud,item.Longitud );
  
    if (validateData()) {
      console.log("### save Observacion ###");

      // llamar a la db y guardar los datos  
       DatabaseConnection.ModificarObservaciones(
          title,
          imageUri,
          latitude,
          longitude,
          item.Titulo,
          item.Foto,
          item.Latitud,
          item.Longitud
        ).then((comprobante) => {
       
          if (comprobante) {
            Alert.alert(
              "Exito",
              "Observacion modificada correctamente",
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
              "Observacion no se modificó correctamente",
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
        });
    }   
  };

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
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
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Location permission denied');
    }
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
                  <BotonPrincipal title="Seleccionar imagen" onPress={pickImage} />
                </View>
                <View style={styles.buttonContainer}>
                  <BotonPrincipal
                    title="Obtener ubicación"
                    onPress={handleGetLocation}
                  />
                </View>
                {latitude && longitude && (
                  <Text style={styles.locationText}>
                    Latitude: {latitude}, Longitude: {longitude}
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                  <BotonPrincipal title="Modificar" onPress={Modificar} />
                </View>
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
    borderColor: 'grey',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderColor: 'grey',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: 'grey',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  listItemView: {
    backgroundColor: "white",
    padding: 10,
    margin:10,
  },
});

export default ModificarObservacion;
