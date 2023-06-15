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


 const db = DatabaseConnection.getConnection();
const EditUsuarios = ({route}) => {
  const item = route.params;

    const [userName, setUser] = useState(item?.Nombre ? String(item.Nombre) : "");
    const [password, setPassword] = useState(item?.Password ? String(item.Password) : "");
    const [email, setEmail] = useState(item?.Email ? String(item.Email) : "");
    const navigation = useNavigation();

   
    const handleUserName = (username) => {
        setUser(username);
    };
    const handlePassword = (password) => {
        setPassword(password);
    };
    const handleEmail = (email) => {
        setEmail(email);
    };

    const validateDate = () => {
        if(userName === "" && !userName.trim()){
            Alert.alert("Error", "El nombre es obligatorio");
            return false;
        }
        if(password === "" &&!password.trim()){
            Alert.alert("Error", "La contraseña es obligatoria");
            return false;
        }
        if(!email.trim()){
            Alert.alert("Error", "El email es obligatorio");
            return false;
        }
        if(!email.includes("@")){
            Alert.alert("Error", "El email no es valido");
            return false;
        }
        return true;
    };

    const editUsuario = () => {
      console.log("Dejo de andar jeje")
        if(validateDate()){
            db.transaction((tx) => {
                tx.executeSql(
                 "UPDATE users SET name =?, password =?, email =? WHERE name =?",
                 [userName, password, email],
                 (_, results) => {
                    if(results.rowsAffected > 0){
                        clearData();
                        Alert.alert("Success", "Usuario editado correctamente",[
                            {
                                text: "OK",
                                onPress: () => navigation.navigate("PaginaPrincipal"),                                                              
                            },
                            {
                                cancelable: false,
                            }
                        ]);
                    }else{
                        Alert.alert("Error", "No se pudo editar el usuario");
                    }
                 }    
                )
            })
        }else{
          Alert.alert("Error", "No se pudo Recibir el usuario");
        }
    };
    
    
  

    return ( 
        <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar usuario" textStyle={styles.textStyle} />
             
            

            <MyInputText 
              placeholder="Nombre de usuario"
              value={userName}
              onChangeText={handleUserName}
              />

            <MyInputText 
              placeholder="Contraseña"
              value={password}
              onChangeText={handlePassword}
            />

            <MyInputText 
              placeholder="Correo electronico"
              value={email}
              onChangeText={handleEmail}
            />

            <BotonPrincipal 
              title="Editar" onPress={() => editUsuario()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    
     );
}
 


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewContainer: {
      flex: 1,
      backgroundColor: "white",
    },
    generalView: {
      flex: 1,
    }, 
    textStyle: {
      padding: 10,
      marginLeft: 20,
      color: "black",
    },
    input: {
      padding: 15
    },
    keyboardView: {
      flex: 1,
      justifyContent: "space-between",
    }
  });
  export default EditUsuarios;