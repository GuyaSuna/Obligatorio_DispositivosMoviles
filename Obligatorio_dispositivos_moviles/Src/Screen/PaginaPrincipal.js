import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MyBotonPrincipal from "../Componentes/BotonPrincipal";

const MainScreen = ({ navigation }) => {
  let backgroundImageSource =
    "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";



  

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
                <MyBotonPrincipal
                  title="Usuarios"
                  btnIcon="user-circle"
                  onPress={() => navigation.navigate("ScreenUsuarios")}
                />

                <MyBotonPrincipal
                  title="Zonas"
                  btnIcon="map"
                  onPress={() => navigation.navigate("Zonas")}
                />
              </View>

              <View style={styles.viewContainerSecondColumn}>
                <MyBotonPrincipal
                  title="Insumos"
                  btnIcon="flask"
                  onPress={() => navigation.navigate("Insumos")}
                />

                <MyBotonPrincipal
                  title=" Observaciones"
                  btnIcon="eye"
                  onPress={() => navigation.navigate("Observaciones")}
                />
              </View>
            </View>

            <View style={styles.generalContainer}>
              <View style={styles.viewContainerFirstColumn}>
                <MyBotonPrincipal
                  title="Tratamientos"
                  btnIcon="heart"
                  onPress={() => navigation.navigate("Tratamientos")}
                />           
              </View>
              <View style={styles.viewContainerSecondColumn}>
                <MyBotonPrincipal
                  title="Informece"
                  btnIcon="bookmark"
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


