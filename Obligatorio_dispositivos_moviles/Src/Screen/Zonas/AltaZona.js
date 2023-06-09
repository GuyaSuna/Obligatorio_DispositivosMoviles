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

const AltaZona = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleUserName = (userName) => {
    setUserName(userName);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleEmail = (email) => {
    setEmail(email);
  };

  const validateData = () => {
    if (userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if (password === "" && !password.trim()) {
      Alert.alert("Error", "La contraseña es obligatoria");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Error", "El correo electronico es obligatorio");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "El correo electronico no es valido");
      return false;
    }

    return true;
  };

  const addUser = () => {
    // llamar a la validacion de datos
    // si la validacion es correcta
    // llamar al metodo de guardar
    console.log("### add user ###");

    if (validateData()) {
      console.log("### save user ###");
      // llamar a la db y guarar los datos
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     'INSERT INTO users (userName, password, email) VALUES (?, ?, ?)',
      //     [userName, password, email],
      //     (tx, results) => {
      //       if(results.rowsAffected > 0){
      //         Alert.alert("Exito", "Usuario registrado correctamente", [
      //           {
      //             text: "Ok",
      //             onPress: () => navigation.navigate("HomeScreen"),
      //           }
      //         ],
      //         {
      //           cancelable: false
      //         } );
      //         clearData();
      //       }else{
      //         Alert.alert("Error", "Error al registrar el usuario");
      //       }
      //     }
      // )
      // });
    }
  };

  const clearData = () => {
    setUserName("");
    setPassword("");
    setEmail("");
  };
  return (
    <SafeAreaView>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                styles={styles.inputUser}
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                value={userName}
              />

              <MyInputText
                styles={styles.inputPassword}
                placeholder="Contraseña"
                minLength={8}
                maxLength={16}
                secureTextEntry={true}
                onChangeText={handlePassword}
                value={password}
              />

              <MyInputText
                styles={styles.inputEmail}
                placeholder="Coreo electronico"
                keyboardType="email-address"
                onChangeText={handleEmail}
                value={email}
              />

              <BotonPrincipal title="Alta Zona" onPress={addUser} />
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
