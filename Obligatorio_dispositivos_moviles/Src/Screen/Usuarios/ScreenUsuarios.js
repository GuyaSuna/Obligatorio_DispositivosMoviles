import React from "react";
import {View, Text, SafeAreaView,ScrollView, StyleSheet, ImageBackground} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useEffect } from "react";
import DatabaseConnection from "../../DataBase/dbConnection";
import GaButton from "../../Componentes/BotonNuevo";

const ScreenUsuarios = ({navigation}) => {
  let backgroundImageSource =
  "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";

  useEffect(() =>{
    DatabaseConnection.createUsuariosTable();
 },[]);
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
                    <View style={styles.viewContainerFirstColumn}>
                        <GaButton
                        title="Alta Usuarios"
                        btnIcon="user-plus"
                        onPress={() => navigation.navigate("AltaUsuarios")}
                        />
                        
                        <View style={styles.viewContainerSecondColumn}>
                            <GaButton
                            title="Ver Usuarios"
                            btnIcon="user-circle-o"
                            onPress={() => navigation.navigate("TodosLosUsuarios")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
     </ImageBackground>
     );
}
 
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
export default ScreenUsuarios;
    

    