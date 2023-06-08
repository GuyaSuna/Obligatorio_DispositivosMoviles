import React from "react";
import {View, Text, SafeAreaView,ScrollView, StyleShett} from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const ScreenUsuarios = ({navigation}) => {
    return ( 
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.viewContainer}>
                    <View style={styles.viewContainerFirstColumn}>
                        <BotonPrincipal
                        title="Alta Usuarios"
                        btnIcon="user-plus"
                        onPress={() => navigation.navigate("AddUsuarios")}
                        />
                        <BotonPrincipal
                        title="Borrar Usuarios"
                        btnIcon="user-minus"
                        onPress={() => navigation.navigate("DeleteUsuarios")}
                        />
                        <View style={styles.viewContainerSecondColumn}>
                            <BotonPrincipal
                            title="Editar Usuarios"
                            btnIcon="user-circle-o"
                            onPress={() => navigation.navigate("EditUsuarios")}
                            />

                            <BotonPrincipal
                            title="Consultar Usuarios"
                            btnIcon="user-circle-o"
                            onPress={() => navigation.navigate("ConsultUsuarios")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
     );
}
 
export default ScreenUsuarios;
    
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
    