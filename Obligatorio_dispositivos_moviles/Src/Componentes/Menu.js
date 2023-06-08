import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BotonPrincipal from "../Componentes/BotonPrincipal";

const Menu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.generalContainer}>
            <View style={styles.viewContainerFirstColumn}>
              <BotonPrincipal
                title="Usuarios"
                btnIcon="user-plus"
                onPress={() => navigation.navigate("Usuarios")}
              />

              <BotonPrincipal
                title="Zonas"
                btnIcon="user-circle"
                onPress={() => navigation.navigate("Zonas")}
              />
            </View>

            <View style={styles.viewContainerSecondColumn}>
              <BotonPrincipal
                title="Insumos"
                btnIcon="user-circle-o"
                onPress={() => navigation.navigate("Insumos")}
              />

              <BotonPrincipal
                title=" Observaciones"
                btnIcon="users"
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

export default Menu;
