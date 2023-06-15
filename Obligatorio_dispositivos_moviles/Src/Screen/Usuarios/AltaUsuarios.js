import React, {useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView,Alert} from "react-native";
import MyInputText from "../../Componentes/MyInputText";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import {useNavigation} from "@react-navigation/native";
import DatabaseConnection from "../../DataBase/dbConnection";



const AltaUsuario = () => {

//Aca definimos los estados de los campos del form
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const navigation = useNavigation();
const db = DatabaseConnection.getConnection();

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

// const addUser = ()=>{
//     console.log("Agregar Usuario");

//     if(validateDate()){
//         console.log("Usuario gurdado");
//         db.transaction((tx)=>{
//             tx.executeSql(
//                 'INSERT INTO Usuarios(userName, password, email) VALUES(?,?,?)',
//                 [userName, password, email],
//                 (tx, results) => {
//                     if(results.rowAffected > 0){
//                         Alert.alert("Exito" , "usuario registrado con exito",[
//                             {
//                                 text: "Ok",
//                                 onPress:()=> navigation.navigate("HomeScreen"),
//                             }
//                         ],
//                         {
//                             cancelable: false
//                         } );
//                         clearData();
//                     }else{
//                         Alert.alert("Error","Error al registrar usuario");
//                     }           
//                 }
//             )
//         } ); 
//     }
// }
const addUser = async () => {
    console.log("### add Usuario ###");
  
    if (validateData()) {
      console.log("### save Usuario ###", userName,password, email);

      // llamar a la db y guardar los datos
      try {
        const rowsAffected = await DatabaseConnection.insertUsuario(
          userName,
          password,
          email
        );
      if (rowsAffected > 0) {
        Alert.alert(
          "Exito",
          "Usuario registrada correctamente",
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
          "Usuario no se registró correctamente",
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

const validateData =()=>{
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
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                            <MyInputText
                            styles={styles.inputUser}
                            placeholder="Nombre de usuario"
                            value={userName}
                            onChangeText={handleUserName}
                            />
                            <MyInputText 
                            styles={styles.inputPassword}
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={handlePassword}
                            minLength={8}
                            maxLength={16}
                            />
                            <MyInputText
                            styles={styles.inputEmail}
                            placeholder="Correo"
                            value={email}
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
     );
}
 
export default AltaUsuario;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
});
