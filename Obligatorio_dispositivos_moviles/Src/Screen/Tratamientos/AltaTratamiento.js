import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatabaseConnection from "../../DataBase/dbConnection";

const db = DatabaseConnection.getConnection();

const AltaTratamientoForm = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [zona, setZona] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [ordenTrabajo, setOrdenTrabajo] = useState("");
  const [insumos, setInsumos] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [observacion, setObservacion] = useState("");
  const [observacionesDisponibles, setObservacionesDisponibles] = useState([]);

  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarObservaciones(setObservacionesDisponibles);
  }, []);


  const handleGuardar = () => {
    if (!validarCampos()) {
      return;
    }

    // Resto del código para guardar el tratamiento
    // ...

    // Ejemplo de cómo acceder a los valores seleccionados en los pickers
    console.log("Usuario seleccionado:", selectedUsuario);
    console.log("Insumo seleccionado:", selectedInsumo);
  };

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
          selectedValue={zona}
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
          onValueChange={(itemValue) => setSelectedInsumo(itemValue)}
        >
          <Picker.Item label="Seleccionar insumo" value={null} />
          {insumos.map((insumo) => (
            <Picker.Item
              key={insumo.id}
              label={insumo.Nombre}
              value={insumo.id}
            />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={observacionesDisponibles}
          onValueChange={setObservacion}
        ><Picker.Item label="Seleccionar Observacion" value={null} />
          {observacionesDisponibles.map((observacion) => (
            <Picker.Item
              key={observacion.id}
              label={observacion.Titulo}
              value={observacion.id}
            />
          ))}
        </Picker>
         <Picker
          style={styles.picker}
          selectedValue={selectedUsuario}
          onValueChange={(itemValue) => setSelectedUsuario(itemValue)}
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
        <Button title="Guardar" onPress={handleGuardar} />
      </View>
    </ScrollView>
  );
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
