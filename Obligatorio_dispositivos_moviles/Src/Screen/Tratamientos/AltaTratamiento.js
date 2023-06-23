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
import DatabaseConnection from "../../DataBase/dbConnection";

const db = DatabaseConnection.getConnection();

const AltaTratamientoForm = () => {
  const [identificacion, setIdentificacion] = useState("");
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

  const [selectedObservacionList, setSelectedObservacionList] = useState([]);

  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarObservaciones(setObservacion);
    console.log("Aca arrancamos",observacion[1]?.id)
  }, []);

  const handlePrueba = () => {
    let texto = "";
    selectedObservacionList.map((obs) => {
      texto += obs.id + "," + obs.Titulo + "," + obs.Foto + "," + obs.Latitud + "," + obs.Longitud + "**";
    });
    console.log(texto);
  };
  
  const handleGuardar = () => {
    if (!validarCampos()) {
      return;
    }

    DatabaseConnection.InserTratamiento(identificacion, nombreTratamiento, fechaInicio,fechaFin,tiempo,ordenTrabajo,selectedInsumosList,selectedObservacionList,zona,usuarios)
    .then((result) => {
      Alert.alert(
        "Exito",
        "Usuario registrado correctamente",
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
      console.log('Error al insertar usuario:', error);
    });
  

    // Resto del código para guardar el tratamiento
    // ...

    // Ejemplo de cómo acceder a los valores seleccionados en los pickers
    console.log("Usuario seleccionado:", selectedUsuario);
    console.log("Insumo seleccionado:", selectedInsumo);
  }

  const validarCampos = () => {
    if (
      identificacion === "" ||
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
  setSelectedObservacion(item);
  setTextObs((prevTextObs) => prevTextObs + item.id + "," + item.Titulo + "," + item.Foto + "," + item.Latitud + "," + item.Longitud + "/");
  console.log("ESTO ES CHE b)", TextObs);
  setSelectedObservacionList([...selectedObservacionList, item]);
};

  const handleInsumo = (item) => {
    setSelectedInsumo(item);
    console.log(item)
    setSelectedInsumosList([...selectedObservacionList, item]);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Identificación"
          value={identificacion}
          onChangeText={setIdentificacion}
        />
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
          keyboardType="numeric"
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
          selectedValue={selectedZona}
          onValueChange={(itemValue) => {
            setSelectedInsumo(null);
            console.log(itemValue)
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
                  <View style={styles.listaContainer}>
                  <Text style={styles.listaTitulo}>Observaciones seleccionadas:</Text>
          {selectedObservacionList.map((obs, index) => (
            <Text key={(obs.id ? obs.id : 'no-id') + index} style={styles.listaItem}>
              {obs.Titulo}
            </Text>
          ))}
          </View>

            <View style={styles.listaContainer}>
                    <Text style={styles.listaTitulo}>Insumos seleccionados:</Text>
            {selectedInsumosList.map((Ins, index) => (
              <Text key={(Ins.id ? Ins.id : 'no-id') + index} style={styles.listaItem}>
                {Ins.Nombre}
              </Text>
            ))}

  
      </View>



              <Button title="Guardar" onPress={handlePrueba} />
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
