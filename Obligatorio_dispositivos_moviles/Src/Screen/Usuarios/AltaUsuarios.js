import { AltRoute } from "@mui/icons-material";
import React, {useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView,Alert} from "react-native";

const AddUser = () => {

//Aca definimos los estados de los campos del form
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const navigation = useNavigation();

//Este es el metodo que setea los estados
const handleUserName= (userName) =>{
    setUserName(userName);
}
const handlePassword = (password) =>{
    setPassword(password);
}
const handleEmail = (email) =>{
    setEmail(email);
}

const addUser = ()=>{
    console.log("Agregar Usuario");

    if(validateDate()){
        console.log("Usuario gurdado");
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO users (userName, password, email) VALUES(?,?,?)',
                [userName, password, email],
                (tx, results) => {
                    if(results.rowAffected > 0){
                        Alert.alert("Exito" , "usuario registrado con exito",[
                            {
                                text: "Ok",
                                onPress:()=> navigation.navigate("HomeScreen"),
                            }
                        ],
                        {
                            cancelable: false
                        } );
                        clearData();
                    }else{
                        Alert.alert("Error","Error al registrar usuario");
                    }           
                }
            )
        } ); 
    }
}

const validateDate =()=>{
    if(userName === "" && !userName.trim()){
        Alert.alert("Error","El nombre de usuario es obligatorio");
        return false;
    }
    if(password ==="" && !password.trim()){
        Alert.alert("Error", "La contraseña es obligatoria");
        return false;
    }
    if(!email.trim()){
        Alert.alert("Error","El correo es ovbligatorio");
        return false;
    }
    if(!email.trim("@")){
        Alert.alert("Error", "El correo no es valido")
        return false;
    }

    return true;
}
const clearData = () =>{
    setUserName("");
    setPassword("");
    setEmail("");
}


    return ( 
        <View>Espera mostro, estamos en mantenimiento ;D</View>
     );
}
 
export default AddUser;
