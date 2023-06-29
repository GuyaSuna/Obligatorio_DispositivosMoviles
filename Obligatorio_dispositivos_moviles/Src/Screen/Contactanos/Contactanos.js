import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const Contactanos = () => {
  let backgroundImageSource = "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";
  const [titleColor, setTitleColor] = useState('#fff');

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const color = `rgb(${r}, ${g}, ${b})`;

      setTitleColor(color);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: titleColor }]}>Somos, Error en la 69</Text>
        <View style={styles.form}>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Nahuel</Text>
            <Text style={styles.info}>Correo electrónico: Nahuel01Pages@gmail.com</Text>
            <Text style={styles.info}>Teléfono: 095196532</Text>
          </View>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Alejo</Text>
            <Text style={styles.info}>Correo electrónico: persona2@gmail.com</Text>
            <Text style={styles.info}>Teléfono: +1 234-567-8901</Text>
          </View>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Alexis</Text>
            <Text style={styles.info}>Correo electrónico: persona3@gmail.com</Text>
            <Text style={styles.info}>Teléfono: +1 345-678-9012</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    width: '80%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    elevation: 4,
  },
  personContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    opacity: 0.5,
  },
});

export default Contactanos;

  