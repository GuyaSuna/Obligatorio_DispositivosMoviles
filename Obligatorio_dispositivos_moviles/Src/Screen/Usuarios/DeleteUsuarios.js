import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import MyText from "../../Componentes/MyText";
import MyInputText from '../../Componentes/MyInputText';
import MySingleButton from '../../Componentes/MySingleButton';

//Conexion con la basede datos
import DatabaseConnection from "../../DataBase/dbConnection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
    const {userName, setUserName} = useState("");
    const navigation = useNavigation();

    const deleteUser = () => {
        if(!userName && !userName.length && userName === "") {
            Alert.alert("Error", "El nombre de usuario es obligatorio");
            return false; 
    }

    db.transaction((tx)=>{
        tx.executeSql(
            'DELETE FROM usuarios WHERE nombre =?', 
            [userName], 
            (tx, results)=>{
            console.log("Results", results.rowsAffected);
            if(results.rowsAffected > 0) {
                Alert.alert("Exito", "Usuario eliminado correctamente",[
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("HomeScreen"),
                    }
                
                ],
                {
                    cancelable: false
                }
            );
             }else{
                Alert.alert("Error", "Usuario no encontrado",[
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("HomeScreen"),
                    }
                ],
                {
                    cancelable: false
                }
                )
             }
            }
        );
    });
}
    
    const handelUserName = (username) => {
        setUserName(username);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <Scrollview>
                        <MyText textValue={"Busqueda de usuario"} style={styles.textStyle}>
                            <KeyboardAvoidingView>
                                <MyInputText 
                                placeholder='Nombre de usuario'
                                onChangeText={handelUserName}
                                value={userName}
                                styles={styles.inputStyle}
                                />
                                <MySingleButton
                                title="Borrar"
                                onPress={deleteUser}
                                />
                            </KeyboardAvoidingView>
                        </MyText>
                    </Scrollview>
                </View>
            </View>
        </SafeAreaView>
      );
}
 
export default DeleteUser

const styles = StyleSheet.create({
    container: {
        flex: 1,          
    },
    viewContainer: {
        flex: 1,               
    },
    generalView: {
        flex: 1,               
    },
    inputStyle: {
        padding: 10,
    },
    textStyle: {
        padding: 10,
        marginLeft: 25,
        color: 'black'
    },
})

