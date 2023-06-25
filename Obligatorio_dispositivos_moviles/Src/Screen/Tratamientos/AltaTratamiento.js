import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";



const AltaTratamientoForm = () => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [ordenTrabajo, setOrdenTrabajo] = useState("");
  const [insumos, setInsumos] = useState([]); 
  const [observacion, setObservacion] = useState([]);
  const [zona, setZona] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
   const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedZona , setSelectedZona] = useState(null);
  const [selectedObservacion, setSelectedObservacion] = useState([]);
  const [selectedInsumosList, setSelectedInsumosList] = useState([]);
  const [TextObs , setTextObs] = useState("");
  const [TextIns , setTextIns] = useState("");

  const [selectedObservacionList, setSelectedObservacionList] = useState([]);
  
const db = DatabaseConnection.getConnection();
const navigation = useNavigation();
  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarObservaciones(setObservacion);
    console.log("Aca arrancamos",observacion[1]?.id)
  }, []);

  
  const handleGuardar = () => {
    if (!validarCampos()) {
      return;
    }

    let TextZona = selectedZona.id + "," + zona.Lugar + ","+zona.Departamento + "," + zona.Cantidad+ ","+ zona.Latitud + ","+ zona.Longitud
    let TextUsuario = selectedUsuario.id + "," + zona.Nombre + ","+zona.Password + "," + zona.Email

    DatabaseConnection.inserTratamientos( nombreTratamiento, TextZona,TextUsuario,fechaInicio,fechaFin,tiempo,ordenTrabajo,TextIns,TextObs)
    .then((result) => {
      Alert.alert(
        "Exito",
        "Tratamiento registrado correctamente",
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
    })
    .catch((error) => {
      console.log('Error al insertar Tratamento:', error);
    });
  

    // Resto del código para guardar el tratamiento
    // ...

    // Ejemplo de cómo acceder a los valores seleccionados en los pickers
    console.log("Usuario seleccionado:", selectedUsuario);
    console.log("Insumo seleccionado:", selectedInsumo);
  }

  const validarCampos = () => {
    if (
      nombreTratamiento === "" ||
      zona === "" ||
      selectedUsuario === null ||
      fechaInicio === "" ||
      fechaFin === "" ||
      tiempo === "" ||
      ordenTrabajo === "" ||
      selectedInsumo === null ||
      observacion === ""
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return false;
    }

    return true;
  };

  const handleObservacion = (item) => {

    const observacionExistente = selectedObservacionList.find(obs => obs.id === item.id);
  
    if (observacionExistente) {

      Alert.alert("Esta observacion ya existe");
      return;
    }
  
    setSelectedObservacion(item);
    setTextObs(TextObs + item.id + "," + item.Titulo + "," + item.Foto + "," + item.Latitud + "," + item.Longitud + "**");
    console.log("ESTO ES CHE b)", TextObs);
    setSelectedObservacionList([...selectedObservacionList, item]);
  };
  

const handleBorrarObs = (itemValue) => {
  const nuevaLista = selectedObservacionList.filter((obs) => obs.id !== itemValue);
  setSelectedObservacionList(nuevaLista);
};
const handleBorrarIns = (itemValue) => {
  const nuevaLista = selectedInsumosList.filter((Ins) => Ins.id !== itemValue);
  setSelectedInsumosList(nuevaLista);
};

const handleInsumo = (item) => {

  const InsumoExistente = selectedInsumosList.find(Ins => Ins.id === item.id);

  if (InsumoExistente) {

    Alert.alert("Este insumo ya existe");
    return;
  }

  setSelectedInsumo(item);
  setTextIns(TextIns + item.id + "," + item.Nombre + ","+item.Cantidad +  "**");
  console.log("ESTO ES CHE b)", TextIns);
  setSelectedInsumosList([...selectedInsumosList, item]);
};

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Nombre de tratamiento"
          value={nombreTratamiento}
          onChangeText={setNombreTratamiento}
        />
          
          <TextInput
          style={styles.input}
          placeholder="Fecha de inicio"
          value={fechaInicio}
  
          onChangeText={setFechaInicio}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha de fin"
          value={fechaFin}
          onChangeText={setFechaFin}
        />
        <TextInput
          style={styles.input}
          placeholder="Tiempo"
          value={tiempo}
          onChangeText={setTiempo}
        />
        <TextInput
          style={styles.input}
          placeholder="Orden de trabajo"
          value={ordenTrabajo}
          onChangeText={setOrdenTrabajo}
        />
         <Picker
          style={styles.picker}
          selectedValue={selectedZona}
          onValueChange={(itemValue) => setSelectedZona(itemValue)}
        >
          <Picker.Item label="Seleccionar Zona" value={null} />
          {zona.map((zona) => (
            <Picker.Item
              key={zona.id}
              label={zona.Lugar}
              value={zona.id}
            />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedInsumo}
          onValueChange={(itemValue) => {
            setSelectedInsumo(null);
            console.log(itemValue)
            handleInsumo(itemValue);
          }}
        >
          <Picker.Item label="Seleccionar insumo" value={null} />
          {insumos.map((insumo) => (
            <Picker.Item
              key={insumo.id}
              label={insumo.Nombre}
              value={insumo}
            />
          ))}
        </Picker>
        <Picker
  style={styles.picker}
  selectedValue={selectedObservacion}
  onValueChange={(itemValue) => {
    setSelectedObservacion(null);
    console.log(itemValue)
    handleObservacion(itemValue);
  }}
>
<Picker.Item label="Seleccionar Observacion" value={null} />
          {observacion.map((obs) => (
            <Picker.Item
              key={obs.id}
              label={obs.Titulo}
              value={obs}
            />
          ))}
        </Picker>
         <Picker
          style={styles.picker}
          selectedValue={selectedUsuario}
          onValueChange={(itemValue) => {
            setSelectedUsuario(itemValue)
        
          }
          }
        >
          <Picker.Item label="Seleccionar usuario" value={null} />
          {usuarios.map((usuario) => (
            <Picker.Item
              key={usuario.id}
              label={usuario.Nombre}
              value={usuario.id}
            />
          ))}
        </Picker>


         <Picker
          style={styles.picker}
          selectedValue={selectedObservacionList}
          onValueChange={(itemValue) => {
            handleBorrarObs(itemValue)       
          }
          }
        >
          <Picker.Item label="Observaciones Seleccionadas" value={null} />
          {selectedObservacionList.map((obs) => (
            <Picker.Item
              key={obs.id}
              label={obs.Titulo}
              value={obs.id}
            />
          ))}
        </Picker>

         
         
       <Picker
          style={styles.picker}
          selectedValue={selectedInsumosList}
          onValueChange={(itemValue) => {
            handleBorrarIns(itemValue)       
          }
          }
        >
          <Picker.Item label="Insumos Seleccionados" value={null} />
          {selectedInsumosList.map((ins) => (
            <Picker.Item
              key={ins.id}
              label={ins.Nombre}
              value={ins.id}
            />
          ))}
        </Picker>
         


              <BotonPrincipal title="Guardar" onPress={handleGuardar} />
       </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  picker: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});


export default AltaTratamientoForm;
