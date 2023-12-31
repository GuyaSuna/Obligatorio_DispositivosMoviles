import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MyBotonPrincipal from "../Componentes/BotonPrincipal";
import Background from "../Componentes/Background";

const MainScreen = ({ navigation }) => {
  let backgroundImageSource =
    "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";



  

  return (
    <Background>
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
                  title="Contactanos"
                  btnIcon="bookmark"
                  onPress={() => navigation.navigate("Contactanos")}
                />         
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      </Background>
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
 
});

export default MainScreen;


