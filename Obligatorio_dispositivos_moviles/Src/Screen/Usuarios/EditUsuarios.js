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
import DatabaseConnection from "../../DataBase/dbConnection";
import Background from "../../Componentes/Background";

const db = DatabaseConnection.getConnection();
const EditUsuarios = ({ route }) => {
  const item = route.params;

  const [userName, setUser] = useState(item?.Nombre ? String(item.Nombre) : "");
  const [apellido, setApellido] = useState(
    item?.Apellido ? String(item.Apellido) : ""
  );
  const [email, setEmail] = useState(item?.Email ? String(item.Email) : "");
  const navigation = useNavigation();

  const handleUserName = (username) => {
    setUser(username);
  };
  const handleApellido = (apellido) => {
    setApellido(apellido);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };

  const validateDate = () => {
    console.log("Validacion");
    if (userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return false;
    }
    if (apellido === "" && !apellido.trim()) {
      Alert.alert("Error", "El apellido es obligatorio");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Error", "El email es obligatorio");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "El email no es valido");
      return false;
    }
    console.log("True");
    return true;
  };

  const editUsuario = () => {
    console.log(userName, apellido, email, item.Nombre, item.Apellido);
    if (validateDate()) {
      DatabaseConnection.ModificarUsuario(
        userName,
        apellido,
        email,
        item.Nombre,
        item.Apellido
      ).then((comprobante) => {
        if (comprobante) {
          Alert.alert(
            "Exito",
            "User modificada correctamente",
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
            "User no se modificó correctamente",
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
      });
    } else {
      Alert.alert("Error", "No se pudo Recibir el usuario");
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.listItemView}>
          <View style={styles.viewContainer}>
            <View style={styles.generalView}>
              <ScrollView>
                <KeyboardAvoidingView style={styles.keyboardView}>
                  <MyText
                    textValue="Buscar usuario"
                    textStyle={styles.textStyle}
                  />
                  <MyInputText
                    placeholder="Nombres "
                    value={userName}
                    onChangeText={handleUserName}
                  />

                  <MyInputText
                    placeholder="Apellidos"
                    value={apellido}
                    onChangeText={handleApellido}
                  />

                  <MyInputText
                    placeholder="Correo electronico"
                    value={email}
                    onChangeText={handleEmail}
                  />

                  <BotonPrincipal title="Modificar" onPress={editUsuario} />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

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
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 8,
    padding: 10,
    borderRadius: 10,
    height: 300,
  },
});
export default EditUsuarios;
