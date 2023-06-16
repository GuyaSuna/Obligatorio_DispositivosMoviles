import React from 'react'
import { View  , SafeAreaView,KeyboardAvoidingView,ScrollView} from 'react-native'
import DatabaseConnection from '../../DataBase/dbConnection'
import MyInputText from '../../Componentes/MyInputText'
import { Picker } from '@react-native-picker/picker'
import BotonPrincipal from '../../Componentes/BotonPrincipal'



const AltaObservaciones = () => {

    const db = DatabaseConnection.getConnection();

    const [Titulo, setTitulo] = useState("");
    const [Foto, setFoto] = useState("");
    const [Latitud, setLatitud] = useState("");
    const [Longitud, setLongitud] = useState("");

    const handleTitulo = (titulo) => {
        setObservaciones(titulo);
    };

    const handleFoto = (foto) => {
        setFoto(foto);
    };

    const handleLatitud = (latitud) => {
        setLatitud(latitud);
    };

    const handleLongitud = (longitud) => {
        setLongitud(longitud);
    };

    const validateData = () => {

        if (Titulo === "" && !Titulo.trim()) {
            Alert.alert("Error", "El titulo es obligatorias");
            return false;
        }

        if (Foto === "" && !Foto.trim()) {
            Alert.alert("Error", "La Foto es obligatoria");
            return false;
        }

        if (Latitud === "" && !Latitud.trim()) {
            Alert.alert("Error", "La Latitud es obligatoria");
            return false;
        }

        if (Longitud === "" && !Longitud.trim()) {
            Alert.alert("Error", "La Longitud es obligatoria");
            return false;
        }

        return true;
    };

    const alta = () => {
        console.log(" Alta ", Titulo,Foto, Latitud, Longitud);

        if (validateData()) {
            DatabaseConnection.AltaObservaciones(Titulo, Foto, Latitud, Longitud).then(
                (comprobante) => {
                    if (comprobante) {
                        Alert.alert(
                            "Exito",
                            "Observacion agregada correctamente",
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
                            "Observacion no se agrego correctamente",
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
                }
            );
        }
    };





    
    return (
        <SafeAreaView>
          <View>
            <View>
              <ScrollView>
                <KeyboardAvoidingView>
                 
                  <Picker 
                    selectedValue={Titulo}
                    onValueChange={handleTitulo}
                    style={styles.inputEmail}
                  >
                    <Picker.Item label="Lugar" value="" />
                    <Picker.Item label="Plaga Detectada" value="Plaga Detectada" />
                    <Picker.Item label="Planta en mal estado" value="Planta en mal estado" />
                    <Picker.Item label="Falta de riego" value="Falta de riego" />
                  </Picker>
           
    
                  <MyInputText
                    styles={styles.inputEmail}
                    placeholder="foto"
                    onChangeText={handleFoto}
                    value={Foto}
                  />
                  <MyInputText
                    styles={styles.inputEmail}
                    placeholder="Latutid"
                    onChangeText={handleLatitud}
                    value={Latitud}
                  />
                  <MyInputText
                    styles={styles.inputEmail}
                    placeholder="Longitud"
                    onChangeText={handleLongitud}
                    value={Longitud}
                  />
    
                  <BotonPrincipal title="Alta Observacion" onPress={alta} />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    

}

export default AltaObservaciones

// crea los estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    inputEmail: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputPassword: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    boton: {
        margin: 12,
    },
    botonText: {
        color: "#fff",
        fontSize: 20,
    },
});