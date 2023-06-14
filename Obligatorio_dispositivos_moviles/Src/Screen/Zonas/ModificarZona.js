import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import MyText from "../../Componentes/MyText"; Lo vamos a usar para el buscador.

import MyInputText from "../../Componentes/MyInputText";
import MyText from "../../Componentes/MyText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection"
import MyInputOpciones from "../../Componentes/MyInputOpcionMultiple";

const ModificarZona = () => {

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

  const Modificar =() => {
    console.log("### modificando Zona ###");
  
    if (validateData()) {
      console.log("### save zona ###");

      // llamar a la db y guardar los datos  
        let comprobante =  DatabaseConnection.ModificarZona(
          Lugar,
          Departamento,
          Cantidad,
          Latitud,
          Longitud
        );
      if (comprobante) {
        Alert.alert(
          "Exito",
          "Zona modificada correctamente",
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
      } else 
        Alert.alert(
          "Error",
          "Zona no se Modifico correctamente",
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


  return (
   
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
            <MyInputText

                placeholder="Lugar"
                minLength={8}
                maxLength={16}
            
                onChangeText={handleLugar}
                value={Lugar}
              />


              <MyInputText
       
                placeholder="Departamento"
                minLength={8}
                maxLength={16}
                onChangeText={handleDepartamento}
                value={Departamento}
              />

              <MyInputText

                placeholder="Cantidad"
             
                onChangeText={handleCantidad}
                value={Cantidad}
              />
                <MyInputText

                placeholder="Latutid"
               
                onChangeText={handleLatitud}
                value={Latitud}
              />
                <MyInputText

                placeholder="Longitud"
               
                onChangeText={handleLongitud}
                value={Longitud}
              />

              <BotonPrincipal title="Modificar Zona" onPress={Modificar} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
 
  );

};


export default ModificarZona;


