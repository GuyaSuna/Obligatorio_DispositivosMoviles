import { useNavigation } from '@react-navigation/native';
import React, {useState,}  from 'react';
import { StyleSheet, View } from 'react-native';
import DatabaseConnection from '../../DataBase/dbConnection';

 const db = DatabaseConnection.getConnection();
const EditUser = () => {
    const [userNameSearch, setUserNameSearch] = useState("");
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handleUserNameSearch = (username) => {
        setUserNameSearch(username);
    };
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

    const clearData = () => {
        setUserName("");
        setPassword("");
        setEmail("");
    };

    const editUser = () => {
        if(validateDate()){
            db.transaction((tx) => {
                tx.executeSql(
                 "UPDATE users SET name =?, password =?, email =? WHERE name =?",
                 [userName, password, email, userNameSearch],
                 (_, results) => {
                    if(results.RowAffected > 0){
                        clearData();
                        Alert.alert("Success", "Usuario editado correctamente",[
                            {
                                text: "OK",
                                onPress: () => navigation.navigate("HomeScreen"),                                                              
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
        }
    };
    
    
    const searchUser = () => {
        if(!userNameSearch.trim() && userNameSearch === ""){
            Alert.alert("Error", "El nombre de ususario es requerido");
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(
                            "SELECT * FROM users WHERE userName =?",
                            [userNameSearch],
                            (_, results) => {
                                if(results.rows.length > 0){
                                    const user = results.rows.item(0);
                                    setUserName(user.userName);
                                    setPassword(user.password);
                                    setEmail(user.email);
                                }else{
                                    Alert.alert("Error", "Usuario no encontrado");
                                    clearUsernameSearch();
                                }
                            }
                        )
                    });
        };                    

    return ( 
        <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText textValue="Buscar usuario" textStyle={styles.textStyle} />
              <MyInputText
                placeholder="Ingrese el nombre de usuario"
                onChangeText={handleUserNameSearch}
                styles={styles.input}
                value={userNameSearch}
              />
              <MySingleButton 
                title="Buscar" 
                onPress={searchUser} 
                btnColor='green'
              />

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

            <MySingleButton 
              title="Editar" onPress={() => editUser()} 
              btnColor='orange'
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    
     );
}
 
export default EditUser;

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
  