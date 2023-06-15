import React, { useEffect, useState } from 'react';
import {View, Text,FlatList, scrollViewContainer, SafeAreaView, StyleSheet, ScrollView, Alert} from 'react-native'
import BotonPrincipal from '../../Componentes/BotonPrincipal';
import DatabaseConnection from '../../DataBase/dbConnection';
import MyText from '../../Componentes/MyText';
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const TodosLosUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigation = useNavigation();

    useEffect(() =>{
       DatabaseConnection.BuscarUsuarios(setUsuarios);
    },[]);

    const handleObservar = (item) => {
      navigation.navigate('UnUsuario', {
        Nombre: item.Nombre,
        Password: item.Password,
        Email : item.Email
      });
    };

    const handleBorrar = (item) => {

    let comprobante = DatabaseConnection.DeleteUsuario(item.Nombre,item.Password,item.Email);
    if(comprobante = true){
      Alert.alert("Exito", "Usuario borrado correctamente",[
    {
      text: "OK",
      onPress: () => navigation.navigate("PaginaPrincipal"),
    }
  ],
  {
    cancelable: false
  }
  );
}else{
  Alert.alert("Error", "Fallo en el delete", [
    {
      text: "OK",
      onPress: () => navigation.navigate("PaginaPrincipal"),
    }
  ],
  {
    cancelable: false
  }
  )
}
};
  const listItemView = (item) => {
    return ( 
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Nombre" textStyle={styles.textStyle}/>
        <MyText textValue={item.Nombre} textStyle={styles.textStyle}/>
        
        <MyText textValue="Email" textStyle={styles.textStyle}/>
        <MyText textValue={item.Email} textStyle={styles.textStyle}/>

        <BotonPrincipal title="Observar" onPress={() => handleObservar(item)}/>
        <BotonPrincipal title="Borrar" onPress={() => handleBorrar(item)}/>
      </View>
     );
  }
   
  

    return (
      <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
      );
}
export default TodosLosUsuarios;
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  textStyle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  
  })
 
