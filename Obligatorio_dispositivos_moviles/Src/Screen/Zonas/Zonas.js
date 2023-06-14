import React,{useEffect} from 'react'
import { View , Text, scrollViewContainer, SafeAreaView , StyleSheet, ScrollView} from 'react-native'
import BotonPrincipal from '../../Componentes/BotonPrincipal'
import DatabaseConnection from '../../DataBase/dbConnection'
const Zonas = ({navigation}) => {

  useEffect(() => {
    DatabaseConnection.createZonasTable();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.viewContainer}>
        <View style={styles.generalContainer}>
          <View style={styles.viewContainerFirstColumn}>
     <BotonPrincipal   onPress={() => navigation.navigate("AltaZona")}
     btnIcon="plus"
     title='Alta Zona'
     />



    <BotonPrincipal   onPress={() => navigation.navigate("TodasLasZonas")}
        btnIcon="money"
        title='Todas Las Zonas'
        /> 

    </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
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

})



export default Zonas

