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
  const [selectedObservacion, setSelectedObservacion] = useState(null);
  const [selectedInsumosList, setSelectedInsumosList] = useState([]);

  const [selectedObservacionList, setSelectedObservacionList] = useState([]);

  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarObservaciones(setObservacion);
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

  const handleObservacion = (item) => {
    setSelectedObservacion(item);
    console.log(item)
    setSelectedObservacionList([...selectedObservacionList, item]);
  };
  
  return (
    <View>
      
    </View>
  )
}

export default AltaTratamiento
