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
    }
    


    use
    return (
        
    )
}

export default TodasLasObservaciones

