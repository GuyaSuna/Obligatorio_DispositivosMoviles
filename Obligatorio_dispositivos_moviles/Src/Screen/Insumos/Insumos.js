import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

const Insumos = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.generalContainer}>
            <View style={styles.viewContainerFirstColumn}>
              <BotonPrincipal
                title="Alta Insumos"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("AltaInsumo")}
              />
              <BotonPrincipal
                title="Borrar Insumos"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("DeleteInsumo")}
              />
            </View>
            <View style={styles.viewContainerSecondColumn}>
              <BotonPrincipal
                title="Editar Insumos"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("ModificarInsumos")}
              />

              <BotonPrincipal
                title="Por las dudas"
                btnIcon="bell"
                onPress={() => navigation.navigate("")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default Insumos;
