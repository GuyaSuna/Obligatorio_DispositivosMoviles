import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const MyComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

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
    <View>
      <MapView
        style={{ width: '100%', height: 300 }}
        initialRegion={{
          latitude: latitude || 0,
          longitude: longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar imagen" onPress={pickImage} />
      <Button title="Obtener ubicación" onPress={handleGetLocation} />
      {latitude && longitude && (
        <Text>
          Latitude: {latitude}, Longitude: {longitude}
        </Text>
      )}
    </View>
  );
};

export default MyComponent;
