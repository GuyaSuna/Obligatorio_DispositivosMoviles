import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const MainScreen = ({ navigation }) => {
  //   const navigateToCRUDComponent = (componentName) => {
  //     navigation.navigate(componentName);
  //   };
  //ejemplo de que colocar en cada touchable opacity: onPress={() => navigateToCRUDComponent('Componente1')}

  let backgroundImageSource =
    "https://i.blogs.es/5f74ce/1366_2000/1366_2000.jpeg";
  return (
    <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Componente 6</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    width: 200,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default MainScreen;
