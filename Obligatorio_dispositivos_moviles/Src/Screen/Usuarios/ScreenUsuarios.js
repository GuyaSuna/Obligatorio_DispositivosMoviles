import React from "react";
import {View, Text, SafeAreaView,ScrollView, StyleSheet, ImageBackground} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useEffect } from "react";
import DatabaseConnection from "../../DataBase/dbConnection";

const ScreenUsuarios = ({navigation}) => {
  
  useEffect(() =>{
    DatabaseConnection.createUsuariosTable();
 },[]);
    return ( 
     
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.viewContainer}>
                    <View style={styles.viewContainerFirstColumn}>
                        <BotonPrincipal
                        title="Alta Usuarios"
                        btnIcon="user-plus"
                        onPress={() => navigation.navigate("AltaUsuarios")}
                        />
                        
                        <View style={styles.viewContainerSecondColumn}>
                            

                            <BotonPrincipal
                            title="Ver Usuarios"
                            btnIcon="user-circle-o"
                            onPress={() => navigation.navigate("TodosLosUsuarios")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
     
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
  });
export default ScreenUsuarios;
    

    