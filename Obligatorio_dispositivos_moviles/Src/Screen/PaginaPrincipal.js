import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BotonPrincipal from "../Componentes/BotonPrincipal";
import {Box, Menu, Divider, NativeBaseConfigProvider} from 'native-base';

const MainScreen = ({ navigation }) => {
  let backgroundImageSource =
    "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";

  return (
    <NativeBaseConfigProvider>
    <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      
      <Box w="90%" alignItems="center">
      <Menu closeOnSelect={false} w="190" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
      return <Pressable {...triggerProps}>
              <HamburgerIcon />
            </Pressable>
    }}>
        <Menu.OptionGroup defaultValue="Arial" title="free" type="radio">
          <Menu.ItemOption value="Arial">Arial</Menu.ItemOption>
          <Menu.ItemOption value="Nunito Sans">Nunito Sans</Menu.ItemOption>
          <Menu.ItemOption value="Roboto">Roboto</Menu.ItemOption>
        </Menu.OptionGroup>
        <Divider mt="3" w="100%" />
        <Menu.OptionGroup title="paid" type="checkbox">
          <Menu.ItemOption value="SF Pro">SF Pro</Menu.ItemOption>
          <Menu.ItemOption value="Helvetica">Helvetica</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Box>
    
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.generalContainer}>
              <View style={styles.viewContainerFirstColumn}>
                <BotonPrincipal
                  title="Usuarios"
                  btnIcon="user-circle"
                  onPress={() => navigation.navigate("ScreenUsuarios")}
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
    </NativeBaseConfigProvider>
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

{
  /* <ImageBackground
      source={{ uri: backgroundImageSource }}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
     <Menu navigation={navigation}/>
    </ImageBackground> */
}
