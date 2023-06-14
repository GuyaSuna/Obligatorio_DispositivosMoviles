import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MainScreen from "./Src/Screen/PaginaPrincipal";
import Navigation from "./Src/Routes/Navigation";
import DatabaseConnection from "./Src/DataBase/dbConnection";



const App = () => {
  return <Navigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
