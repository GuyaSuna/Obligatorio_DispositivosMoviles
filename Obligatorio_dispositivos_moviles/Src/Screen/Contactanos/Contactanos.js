import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import AlexisTheme from "../../Sonidos/AlexisTheme.MP3.mp3";

const Contactanos = () => {
  const backgroundImageSource =
    "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";
  const [titleColor, setTitleColor] = useState("#fff");
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const color = `rgb(${r}, ${g}, ${b})`;

      setTitleColor(color);
    }, 1000);

    // Cargar el archivo de música
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(AlexisTheme);
      setSound(sound);
    };

    loadSound();

    return () => {
      clearInterval(interval);
      // Liberar los recursos del archivo de música al desmontar el componente
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };
  
  const playMusic = async () => {
    if (sound) {
      setIsPlaying(true);
      await sound.replayAsync();
    }
  };
  
  return (
    <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: titleColor }]}>
          Somos, Error en la 69
        </Text>
        <View style={styles.form}>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Nahuel Pages</Text>
            <Text style={styles.info}>
              Correo electrónico: Nahuel01Pages@gmail.com
            </Text>
            <Text style={styles.info}>Teléfono: (+598) 95 19 65 32</Text>
          </View>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Alejo Spinelli</Text>
            <Text style={styles.info}>
              Correo electrónico: alejospinelli2@gmail.com
            </Text>
            <Text style={styles.info}>Teléfono: (+598)98 71 75 63</Text>
          </View>
          <View style={styles.personContainer}>
            <Text style={styles.name}>Alexis</Text>
            <Text style={styles.info}>Correo electrónico: aguacatehamburguesas@gmail.com</Text>
            <Text style={styles.info}>Teléfono: +1 345-678-9012</Text>
          </View>
          <Text style={styles.info}>Musica solo disponible en Android jeje</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={isPlaying ? stopMusic : playMusic}>
  <Text style={styles.buttonText}>{isPlaying ? 'Detener música' : 'Reproducir música'}</Text>
</TouchableOpacity>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  form: {
    width: "80%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    elevation: 4,
  },
  personContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backgroundImage: {
    opacity: 0.7,
  },
  button: {
    backgroundColor: "#c0392b",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Contactanos;
