import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView
} from "react-native";
import BotonPrincipal from "../Componentes/BotonPrincipal";


const MainScreen = ({ navigation }) => {
 

  let backgroundImageSource = "https://image.winudf.com/v2/image/Y29tLkZydWl0V0xQUF9zY3JlZW5fMF8xNTEwOTUzNDYxXzAwMA/screen-0.webp?fakeurl=1&type=.webp";
  return (
    <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
       <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.generalContainer}>
            <View style={styles.viewContainerFirstColumn}>
              <BotonPrincipal
                title="Usuarios"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("Usuarios")}
              />

              <BotonPrincipal
                title="Zonas"
                btnIcon="map"
                onPress={() => navigation.navigate("Zonas")}
              />
            </View>

            <View style={styles.viewContainerSecondColumn}>
              <BotonPrincipal
                title="Insumos"
                btnIcon="flask"
                onPress={() => navigation.navigate("Insumos")}
              />

              <BotonPrincipal
                title=" Observaciones"
                btnIcon="eye"
                onPress={() => navigation.navigate("Observaciones")}
              />
            </View>
          </View>

          <View style={styles.generalContainer}>
            <View style={styles.viewContainerFirstColumn}>
              <BotonPrincipal
                title="Tratamientos"
                btnIcon="heart"
                onPress={() => navigation.navigate("Tratamientos")}
              />

              <BotonPrincipal
                title="Por las dudas"
                btnIcon="star"
                onPress={() => navigation.navigate("")}
              />
            </View>

            <View style={styles.viewContainerSecondColumn}>
              <BotonPrincipal
                title="Por las dudas"
                btnIcon="bookmark"
                onPress={() => navigation.navigate("")}
              />

              <BotonPrincipal
                title="Por las dudas"
                btnIcon="map"
                onPress={() => navigation.navigate("")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  generalContainer: {
    flexDirection: "row",
  },
  viewContainerFirstColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",

  },
  viewContainerSecondColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    opacity: 0.5,
  },
});

export default MainScreen;








{/* <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
     <Menu navigation={navigation}/>
    </ImageBackground> */}