import React {useState}from 'react'
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import MyText from '../../Componentes/MyText'
import DatabaseConnection from '../../DataBase/dbConnection'
import { useNavigation } from '@react-navigation/native'
import BotonPrincipal from '../../Componentes/BotonPrincipal'

const TodasLasObservaciones = () => {
    const {Observaciones, setObservaciones}= useState([]);
    const navigate = useNavigation();

    useEffect(() =>{
        DatabaseConnection.BuscarObservaciones(setObservaciones);
    },[]);

    const handleObservar = (item) => {

        NavigationPreloadManager.navigate('UnaObservacion',{
            Titulo : item.Titulo,
            Foto : item.Foto,
            Latitud : item.Latitud,
            Longitud : item.Longitud
        });
    };

    const handleBorrar = (item) => {

        let comprobante = DatabaseConnection.DeleteObservaciones(item.Titulo, item.Foto, item.Latitud,item.Longitud);
        if(comprobante = true) {
            Alert.alert("Exito", "Observacion borrada con exito",[
                {
                    text: "Ok",
                    onPress: () => NavigationPreloadManager.navigate("PaginaPricipal"),
                }
            ],
            {
                cancelable: false
            }
            );
            }else{
                Alert.alert("Error","Fallo en el delete",[
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("PaginaPricipal"),
                    }
                ],
                {
                    cancelable: false
                }
                )
            }
    };

    const listItemView =(item) => {
        return(
             <View key={item.id} style={StyleSheet.listItemView}>
                <MyText textValue="Observaciones" textStyle={StyleSheet.textStyle}/>
                <MyText textValue={item.Observaciones} textStyle={StyleSheet.textStyle}/>

                <BotonPrincipal title='Observar' onPress={() => handleObservar(item)}/>
                <BotonPrincipal title='Borrar' onPress={() => handleBorrar(item)}/>
             </View>
        );
    };

    return (
    <SafeAreaView style={style.container}>
        <View>
            <View>
                <FlatList
                data={Observaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => listItemView(item)} 
                contentContainerStyle={{ paddingHorizontal: 15}}
                />
            </View>
        </View>
    </SafeAreaView> 
    )
}

export default TodasLasObservaciones

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
  });