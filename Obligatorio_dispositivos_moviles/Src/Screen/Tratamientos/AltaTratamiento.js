import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";

const AltaTratamientoForm = () => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
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
  const [selectedObservacionList, setSelectedObservacionList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState("");


  const db = DatabaseConnection.getConnection();
  const navigation = useNavigation();
  useEffect(() => {
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarObservaciones(setObservacion);
    console.log("Aca arrancamos", observacion[1]?.id);
  }, []);

  const renderSelectedObservaciones = () => {
    return selectedObservacionList.map((obs) => (
      <View key={obs.id} style={styles.selectedItemContainer}>
        <Text style={styles.selectedItemText}>{obs.Titulo}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleBorrarObs(obs.id)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const renderSelectedInsumos = () => {
    return selectedInsumosList.map((ins) => (
      <View key={ins.id} style={styles.selectedItemContainer}>
        <Text style={styles.selectedItemText}>{ins.Nombre}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleBorrarIns(ins.id)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const handleGuardar = () => {
    if (!validarCampos()) {
      return;
    }


console.log(selectedDate)
console.log(selectedEndDate)
    const observacionesTexto = selectedObservacionList
      .map(
        (obs) =>
          `${obs.id},${obs.Titulo},${obs.Foto},${obs.Latitud},${obs.Longitud}`
      )
      .join("**");

    const insumosTexto = selectedInsumosList
      .map((ins) => `${ins.id},${ins.Nombre},${ins.Cantidad}`)
      .join("**");

    console.log("Texto de Ins:", insumosTexto);
    console.log("Texto de Obs:", observacionesTexto);
    console.log("Nombre", nombreTratamiento)
    console.log("Tiempo", tiempo)
    console.log("Orden", ordenTrabajo)
    console.log("Zona", selectedZona)
    console.log("Y ASI?", selectedZona?.Lugar)

    DatabaseConnection.inserTratamientos(
      nombreTratamiento,
      selectedZona,
      selectedUsuario,
      selectedDate,
      selectedEndDate,
      tiempo,
      ordenTrabajo,
      insumosTexto,
      observacionesTexto
    ).then((result) => {
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
        console.log("Error al insertar Tratamento:", error);
      });

    console.log("Usuario seleccionado:", selectedUsuario);

  };

  const validarCampos = () => {
    if (
      nombreTratamiento === "" ||
      selectedZona === null ||
      selectedUsuario === null ||
      selectedDate=== "" ||
      selectedEndDate === "" ||
      tiempo === "" ||
      ordenTrabajo === "" ||
      selectedInsumosList.length === 0 ||
      selectedObservacionList.length === 0
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return false;
    }
  
    // Validar que la fecha de fin no sea anterior a la fecha de inicio
    const fechaInicioObj = new Date(selectedDate);
    const fechaFinObj = new Date(selectedEndDate);
  
    if (fechaFinObj < fechaInicioObj) {
      Alert.alert("Error", "La fecha de fin no puede ser anterior a la fecha de inicio");
      return false;
    }
  
    return true;
  };

  const handleBorrarObs = (itemValue) => {
    const nuevaLista = selectedObservacionList.filter(
      (obs) => obs.id !== itemValue
    );
    setSelectedObservacionList(nuevaLista);
  };
  const handleBorrarIns = (itemValue) => {
    const nuevaLista = selectedInsumosList.filter((Ins) => Ins.id !== itemValue);
    setSelectedInsumosList(nuevaLista);
  };

  const handleObservacion = (item) => {
    if (item != null) {
      const observacionExistente = selectedObservacionList.find(
        (obs) => obs.id === item.id
      );

      if (observacionExistente) {
        Alert.alert("Esta observacion ya existe");
        return;
      }

      setSelectedObservacion(item);
      setSelectedObservacionList([...selectedObservacionList, item]);
    }
    console.log("Jiji");
  };

  const handleInsumo = (item) => {
    if (item != null) {
      const insumoExistente = selectedInsumosList.find(
        (ins) => ins.id === item.id
      );

      if (insumoExistente) {
        Alert.alert("Este insumo ya existe");
        return;
      }

      setSelectedInsumo(item);
      setSelectedInsumosList([...selectedInsumosList, item]);
    }
    console.log("Jiji");
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
    setDatePickerVisible(false);
  };
  const handleEndDateSelection = (date) => {
    setSelectedEndDate(date.dateString);
    setEndDatePickerVisible(false);
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

        <TouchableOpacity
          style={styles.input}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>
            {selectedDate !== "" ? selectedDate : "Seleccionar fecha de inicio"}
          </Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <Calendar
            onDayPress={handleDateSelection}
            markedDates={{ [selectedDate]: { selected: true } }}
            onMonthChange={() => {}}
            hideExtraDays
          />
        )}

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
          selectedValue={selectedUsuario}
          onValueChange={(itemValue) => setSelectedUsuario(itemValue)}
        >
          <Picker.Item label="Seleccionar usuario" value={null} />
          {usuarios.map((u) => (
            <Picker.Item key={u.id} label={u.Nombre} value={u.id} />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setEndDatePickerVisible(true)}
        >
          <Text>
            {selectedEndDate !== "" ? selectedEndDate : "Seleccionar fecha de fin"}
          </Text>
        </TouchableOpacity>


        {isEndDatePickerVisible && (
          <Calendar
            onDayPress={handleEndDateSelection}
            markedDates={{ [selectedEndDate]: { selected: true } }}
            onMonthChange={() => {}}
            hideExtraDays
          />
        )}

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
          selectedValue={selectedInsumo}
          onValueChange={handleInsumo}
        >
          <Picker.Item label="Seleccionar insumo" value={null} />
          {insumos.map((ins) => (
            <Picker.Item
              key={ins.id}
              label={`${ins.Nombre} - Cantidad: ${ins.Cantidad}`}
              value={ins}
            />
          ))}
        </Picker>

        <View style={styles.selectedItemsContainer}>
          <Text style={styles.selectedItemsTitle}>Insumos seleccionados:</Text>
          {renderSelectedInsumos()}
        </View>

        <Picker
          style={styles.picker}
          selectedValue={selectedObservacion}
          onValueChange={handleObservacion}
        >
          <Picker.Item label="Seleccionar observacion" value={null} />
          {observacion.map((obs) => (
            <Picker.Item
              key={obs.id}
              label={obs.Titulo}
              value={obs}
            />
          ))}
        </Picker>

        <View style={styles.selectedItemsContainer}>
          <Text style={styles.selectedItemsTitle}>
            Observaciones seleccionadas:
          </Text>
          {renderSelectedObservaciones()}
        </View>

        <BotonPrincipal onPress={handleGuardar} title="Guardar" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
  },
  picker: {
    marginBottom: 8,
  },
  selectedItemsContainer: {
    marginBottom: 16,
  },
  selectedItemsTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  selectedItemText: {
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AltaTratamientoForm;
