import { React, useState } from "react";
import {
  StyleSheet,
  SafeAreaViewBase,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import MyText from "../../Componentes/MyText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection"

const AltaZona = () => {
  const [Lugar, setLugar] = useState("");
  const [Departamento, setDepartamento] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Latitud, setLatitud] = useState("");
  const [Longitud, setLongitud] = useState("");

  const navigation = useNavigation();
  const db = DatabaseConnection.getConnection(); 

  const handleLugar = (lugar) => {
    setLugar(lugar);
  };

  const handleDepartamento= (departamento) => {
    setDepartamento(departamento);
  };

  const handleCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  };

  const validateData = () => {
    if (Lugar === "" && !Lugar.trim()) {
      Alert.alert("Error", "El Lugar de usuario es obligatorio");
      return false;
    }

    if (Departamento === "" && !Departamento.trim()) {
      Alert.alert("Error", "El Departamento es obligatoria");
      return false;
    }

    if (isNaN(Cantidad) || Cantidad <= 0) {
      Alert.alert("Error", "La cantidad debe ser un número válido");
      return false;
    }
  
    if (isNaN(Latitud)) {
      Alert.alert("Error", "La latitud debe ser un número válido");
      return false;
    }
  
    if (isNaN(Longitud)) {
      Alert.alert("Error", "La longitud debe ser un número válido");
      return false;
    }

    return true;
  };

  const addZone = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add user ###");

    if (validateData()) {
      console.log("### save zona ###");
      DatabaseConnection.createZonasTable();
      // llamar a la db y guarar los datos
       db.transaction((tx) => {
         tx.executeSql(
           'INSERT INTO Zonas (Lugar, Departamento, Cantidad , Latitud , Longitud) VALUES (?, ?, ?, ?, ?)',
           [Lugar, Departamento, Cantidad, Latitud, Longitud],
           (tx, results) => {
             if(results.rowsAffected > 0){
               Alert.alert("Exito", "Zona registrado correctamente", [
                 {
                   text: "Ok",
                   onPress: () => navigation.navigate("PaginaPrincipal"),
                 }
               ],
               {
                 cancelable: false
               } );
               clearData();
             }else{
               Alert.alert("Error", "Error al registrar la zona");
             }
           }
       )
       });
    }
  };

  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setCantidad("");
    setLatitud("");
    setLongitud("");
  };
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputUser}
                placeholder="Lugar"
                onChangeText={handleLugar}
                value={Lugar}
              />

              <MyInputText
                styles={styles.inputPassword}
                placeholder="Departamento"
                minLength={8}
                maxLength={16}
            
                onChangeText={handleDepartamento}
                value={Departamento}
              />

              <MyInputText
                styles={styles.inputEmail}
                placeholder="Cantidad"
             
                onChangeText={handleCantidad}
                value={Cantidad}
              />
                <MyInputText
                styles={styles.inputEmail}
                placeholder="Latutid"
               
                onChangeText={handleLatitud}
                value={Latitud}
              />
                <MyInputText
                styles={styles.inputEmail}
                placeholder="Longitud"
               
                onChangeText={handleLongitud}
                value={Longitud}
              />

              <BotonPrincipal title="Alta Zona" onPress={addZone} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AltaZona;

const styles = StyleSheet.create({
  container: {},
  inputUser: {},
  inputPassword: {},
});
