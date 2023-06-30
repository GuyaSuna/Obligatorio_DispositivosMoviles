import React,{useEffect} from 'react'
import { View , Text, scrollViewContainer,ImageBackground, SafeAreaView , StyleSheet, ScrollView} from 'react-native'
import BotonPrincipal from '../../Componentes/BotonPrincipal'
import DatabaseConnection from '../../DataBase/dbConnection'
const Observaciones = ({navigation}) => {
  let backgroundImageSource =
  "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";

   useEffect(() => {
     DatabaseConnection.createObservacionesTable();
  }, []);

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
     <BotonPrincipal   onPress={() => navigation.navigate("AltaObservaciones")}
     btnIcon="plus"
     title='Alta Observacion'
     />



    <BotonPrincipal   onPress={() => navigation.navigate("TodasLasObservaciones")}
        btnIcon="money"
        title='Todas Las Observaciones'
        /> 

    </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  )
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
})



export default Observaciones
