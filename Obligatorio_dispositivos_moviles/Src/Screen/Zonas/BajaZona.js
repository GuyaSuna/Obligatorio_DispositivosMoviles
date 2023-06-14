import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";

// Coneccion a DB
import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

const DeleteZona = () => {
  return <View>Por las dudas</View>;
};
export default DeleteZona;
