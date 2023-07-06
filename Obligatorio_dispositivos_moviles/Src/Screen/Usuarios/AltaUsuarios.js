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
  const [Apellido, setApellido] = useState("");
  const [Email, setEmail] = useState("");

  const navigation = useNavigation();
  const db = DatabaseConnection.getConnection();

  //Este es el metodo que setea los estados
  const handleUserName = (userName) => {
    setUserName(userName);
  };
  const handleApellido = (apellido) => {
    setApellido(apellido);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };

  const addUser = async () => {
    console.log("### add User ###");

    if (validateData()) {
      console.log("### save User ###", UserName, Apellido, Email);

      // llamar a la db y guardar los datos
      DatabaseConnection.insertUsuario(UserName, Apellido, Email)
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
    if (Apellido === "" && !Apellido.trim()) {
      Alert.alert("Error", "El apellido es obligatorio");
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
                  placeholder="Nombres"
                  value={UserName}
                  onChangeText={handleUserName}
                />
                <MyInputText
                  styles={styles.inputApellido}
                  placeholder="Apellidos"
                  value={Apellido}
                  onChangeText={handleApellido}
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
