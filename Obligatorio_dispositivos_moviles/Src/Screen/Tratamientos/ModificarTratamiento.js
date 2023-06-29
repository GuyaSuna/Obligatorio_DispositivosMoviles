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



const ModificarTratamiento = ({route}) => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [fechaInicio, setFechaInicio] = useState(0);
  const [fechaFin, setFechaFin] = useState(0);
  const [tiempo, setTiempo] = useState("");
  const [ordenTrabajo, setOrdenTrabajo] = useState("");
  const [insumos, setInsumos] = useState([]); 
  const [observacion, setObservacion] = useState([]);
  const [zona, setZona] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedZona , setSelectedZona] = useState(null);
  const [selectedObservacion, setSelectedObservacion] = useState([]);

  const [TextObs , setTextObs] = useState("");
  const [TextIns , setTextIns] = useState("");
  const [selectedObservacionList, setSelectedObservacionList] = useState([]);
  const [selectedObservacionItem, setSelectedObservacionItem] = useState(null);

  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [selectedInsumosList, setSelectedInsumosList] = useState([]);


  const item = route.params;
  
  
const db = DatabaseConnection.getConnection();
const navigation = useNavigation();

useEffect(() => {
  DatabaseConnection.BuscarZonas(setZona);
  DatabaseConnection.BuscarUsuarios(setUsuarios);
  DatabaseConnection.BuscarInsumo(setInsumos);
  DatabaseConnection.BuscarObservaciones(setObservacion);

  setNombreTratamiento(item.Nombre);
  setFechaInicio(item.FechaInicio);
  setFechaFin(item.FechaFinalizacion);
  setTiempo(item.Tiempo.toString());
  setOrdenTrabajo(item.OrdenTrabajo);

  console.log(item.Tiempo)

  let user = parseInt(item.Usuario);
  let zona = parseInt(item.Zona);

  console.log("Usuario " + user + " Zona " + zona);
  DatabaseConnection.SeleccionarZonaUnica(zona, setSelectedZona);
  DatabaseConnection.SeleccionarUsuarioUnico(user, setSelectedUsuario);
  let partesObs = item.Observaciones.split("**");
  let partesIns = item.Insumos.split("**");

  if (selectedInsumosList.length === 0) {
    for (let i = 0; i < partesIns.length; i++) {
      let AtributosIns = partesIns[i].split(",");
      if (AtributosIns.length === 3) {
        let objIns = {
          id: parseInt(AtributosIns[0]),
          Nombre: AtributosIns[1],
          Cantidad: AtributosIns[2],
        };
        console.log("Pruebaaaaaa",AtributosIns[0])
        setSelectedInsumosList((prevList) => [...prevList, objIns]);
      }
    }
  }

  if (selectedObservacionList.length === 0) {
    for (let j = 0; j < partesObs.length; j++) {
      let AtributosObs = partesObs[j].split(",");
      if (AtributosObs.length === 5) {
        let objObser = {
          id: parseInt(AtributosObs[0]),
          Titulo: AtributosObs[1],
          Foto: AtributosObs[2],
          Latitud: AtributosObs[3],
          Longitud: AtributosObs[4],
        };
        setSelectedObservacionList((prevList) => [...prevList, objObser]);
      }
    }
  }
}, []);




  
const handleGuardar = () => {
  if (!validarCampos()) {
    return;
  }

  const observacionesTexto = selectedObservacionList.map(
    (obs) => `${obs.id},${obs.Titulo},${obs.Foto},${obs.Latitud},${obs.Longitud}`
  ).join("**");

  const insumosTexto = selectedInsumosList.map(
    (ins) => `${ins.id},${ins.Nombre},${ins.Cantidad}`
  ).join("**");

  DatabaseConnection.ModificarTratamientos(
    item.Id,
    nombreTratamiento,
    selectedZona,
    selectedUsuario,
    fechaInicio,
    fechaFin,
    tiempo,
    ordenTrabajo,
    insumosTexto,
    observacionesTexto
  )
    .then((result) => {
      if (result) {
        Alert.alert(
          "Éxito",
          "Tratamiento modificado correctamente",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("PaginaPrincipal"),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Error",
          "No se pudo modificar el tratamiento. Por favor, intenta nuevamente."
        );
      }
    })
    .catch((error) => {
      console.log("Error al Modificar Tratamento:", error);
    });
};

  const validarCampos = () => {
    if (
      nombreTratamiento === "" ||
      zona === "" ||
      selectedUsuario === null ||
      fechaInicio === "" ||
      fechaFin === "" ||
      tiempo === "" ||
      ordenTrabajo === "" 

    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return false;
    }

    return true;
  };


  

  const handleObservacion = (item) => {
    const observacionExistente = selectedObservacionList.find((obs) => obs.id === item.id);
  
    if (observacionExistente) {
      Alert.alert("Esta observacion ya existe");
      return;
    }
  
    setSelectedObservacion(item);
    setTextObs(TextObs + item.id + "," + item.Titulo + "," + item.Foto + "," + item.Latitud + "," + item.Longitud + "**");
    console.log("ESTO ES CHE b)", TextObs);
  
    if (item) {
      setSelectedObservacionList([...selectedObservacionList, item]);
    }
  };

  const handleInsumo = (item) => {
    const insumoExistente = selectedInsumosList.find((ins) => ins.id === item.id);

  if (insumoExistente) {
     Alert.alert("Este insumo ya existe");
      return;
    }

    setSelectedInsumo(item);
    setTextIns(TextIns + item.id + "," + item.Nombre + "," + item.Cantidad + "**");
    console.log("ESTO ES CHE b)", TextIns);
  
    setSelectedInsumosList([...selectedInsumosList, item]);
  };
  
  

  const handleBorrarObs = (itemValue) => {
    const nuevaLista = selectedObservacionList.filter((obs) => obs.id !== parseInt(itemValue));
    setSelectedObservacionList(nuevaLista);
  };
  
  const handleBorrarIns = (itemValue) => {
    const nuevaLista = selectedInsumosList.filter((ins) => ins.id !== parseInt(itemValue));
    setSelectedInsumosList(nuevaLista);
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
          value={fechaInicio.toString()} 
          onChangeText={setFechaInicio}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha de fin"
          value={fechaFin.toString()} 
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
    setSelectedInsumo(itemValue);
    handleInsumo(itemValue);
  }}
>
  <Picker.Item label="Seleccionar insumo" value={null} />
  {insumos.map((insumo) => (
    <Picker.Item
      key={insumo.Id}
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


export default ModificarTratamiento;
