import React, { useState } from 'react';
import { View, Button, Image, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';

const MyComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          handleGetLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const handleGetLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        console.log('Geolocation is not available');
      }
    };
    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   

    if (!result.canceled && result.assets.length > 0) {
      console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
   
    <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar imagen" onPress={pickImage} />

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar imagen" onPress={pickImage} />

      <MapView style={{ flex: 1 }} />

      <Button title="Obtener ubicación" onPress={() =>requestLocationPermission()} />
    </View>

  );
};

export default MyComponent;

