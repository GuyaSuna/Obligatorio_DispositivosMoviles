import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";

const Insumos = ({ navigation }) => {
  useEffect(() => {
    DatabaseConnection.CreateInsumosTable();
  }, []);
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
          
            </View>
            <View style={styles.viewContainerSecondColumn}>
              <BotonPrincipal
                title="Lista Insumos"
                btnIcon="bell"
                onPress={() => navigation.navigate("TodosLosInsumos")}
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
