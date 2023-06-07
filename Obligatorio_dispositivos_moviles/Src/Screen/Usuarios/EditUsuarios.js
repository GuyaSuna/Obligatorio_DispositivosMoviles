import { useNavigation } from '@react-navigation/native';
import React, {useState,}  from 'react';
import { StyleSheet, View } from 'react-native';

 const db = DataBaseConnection.getConnection();
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
    
    <View>Aca va el formulario </View>
     );
}
 
export default EditUser;