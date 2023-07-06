import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Easing,
} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";
import Background from "../../Componentes/Background";

const AltaUsuario = () => {
  //Aca definimos los estados de los campos del form
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const navigation = useNavigation();
  const db = DatabaseConnection.getConnection();

  //Este es el metodo que setea los estados
  const handleUserName = (userName) => {
    setUserName(userName);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };

  const addUser = async () => {
    console.log("### add User ###");

    if (validateData()) {
      console.log("### save User ###", UserName, Password, Email);

      // llamar a la db y guardar los datos
      DatabaseConnection.insertUsuario(UserName, Password, Email)
        .then((result) => {
          Alert.alert(
            "Exito",
            "Usuario registrado correctamente",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ScreenUsuarios"),
              },
            ],
            {
              cancelable: false,
            }
          );
        })
        .catch((error) => {
          console.log("Error al insertar usuario:", error);
        });
    }
  };

  const validateData = () => {
    if (UserName === "" && !UserName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }
    if (Password === "" && !Password.trim()) {
      Alert.alert("Error", "La contraseña es obligatoria");
      return false;
    }
    if (!Email.trim()) {
      Alert.alert("Error", "El correo es obligatorio");
      return false;
    }
    if (!Email.trim("@")) {
      Alert.alert("Error", "El correo no es valido");
      return false;
    }

    return true;
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.listItemView}>
            <ScrollView>
              <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <MyInputText
                  styles={styles.inputUser}
                  placeholder="Nombre de usuario"
                  value={UserName}
                  onChangeText={handleUserName}
                />
                <MyInputText
                  styles={styles.inputPassword}
                  placeholder="Contraseña"
                  value={Password}
                  onChangeText={handlePassword}
                  minLength={8}
                  maxLength={16}
                />
                <MyInputText
                  styles={styles.inputEmail}
                  placeholder="Correo"
                  value={Email}
                  onChangeText={handleEmail}
                  keyboardType="email-address"
                />
                <BotonPrincipal
                  title="Registrar Usuario"
                  btnColor="green"
                  onPress={addUser}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default AltaUsuario;

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    flex: 1,
  },
  listItemView: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
