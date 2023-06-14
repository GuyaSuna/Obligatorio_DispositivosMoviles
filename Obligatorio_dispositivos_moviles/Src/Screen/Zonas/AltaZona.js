import { React, useState } from "react";
import {
  StyleSheet,
  SafeAreaViewBase,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import MyText from "../../Componentes/MyText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection"
import MyInputOpciones from "../../Componentes/MyInputOpcionMultiple";

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

  const addZone = async () => {
    console.log("### add Zona ###");
  
    if (validateData()) {
      console.log("### save zona ###");

      // llamar a la db y guardar los datos
      try {
        const rowsAffected = await DatabaseConnection.inserZona(
          Lugar,
          Departamento,
          Cantidad,
          Latitud,
          Longitud
        );
      if (rowsAffected > 0) {
        Alert.alert(
          "Exito",
          "Zona registrada correctamente",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("PaginaPrincipal"),
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert(
          "Error",
          "Zona no se registró correctamente",
          [
            {
              text: "Ok",
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    }catch(error){
      console.log("No se pudo recibir el dato");
    }
    }
    
  };
  

  // if(results.rowsAffected > 0){
  //   Alert.alert("Exito", "Zona registrado correctamente", [
  //     {
  //       text: "Ok",
  //       onPress: () => navigation.navigate("PaginaPrincipal"),
  //     }
  //   ],
  //   {
  //     cancelable: false
  //   }


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
                styles={styles.inputPassword}
                placeholder="Lugar"
                minLength={8}
                maxLength={16}
            
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
