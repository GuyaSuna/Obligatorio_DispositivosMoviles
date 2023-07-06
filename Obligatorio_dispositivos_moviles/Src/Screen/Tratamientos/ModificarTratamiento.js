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
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import BotonPrincipal from "../../Componentes/BotonPrincipal";
import DatabaseConnection from "../../DataBase/dbConnection";
import { useNavigation } from "@react-navigation/native";
import Background from "../../Componentes/Background";

const ModificarTratamiento = ({ route }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [ordenTrabajo, setOrdenTrabajo] = useState("");
  const [insumos, setInsumos] = useState([]);
  const [observacion, setObservacion] = useState([]);
  const [zona, setZona] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedZona, setSelectedZona] = useState(null);
  const [selectedObservacion, setSelectedObservacion] = useState([]);
  const [selectedObservacionList, setSelectedObservacionList] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [selectedInsumosList, setSelectedInsumosList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const item = route.params;

  const db = DatabaseConnection.getConnection();
  const navigation = useNavigation();

  useEffect(() => {
    DatabaseConnection.BuscarZonas(setZona);
    DatabaseConnection.BuscarUsuarios(setUsuarios);
    DatabaseConnection.BuscarInsumo(setInsumos);
    DatabaseConnection.BuscarObservaciones(setObservacion);

    setNombreTratamiento(item.Nombre);
    setSelectedDate(item.FechaInicio);
    setSelectedEndDate(item.FechaFinalizacion);
    setTiempo(item.Tiempo.toString());
    setOrdenTrabajo(item.OrdenTrabajo);

    console.log(item.Tiempo);

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
          console.log("Pruebaaaaaa", AtributosIns[0]);
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

    const observacionesTexto = selectedObservacionList
      .map(
        (obs) =>
          `${obs.id},${obs.Titulo},${obs.Foto},${obs.Latitud},${obs.Longitud}`
      )
      .join("**");

    const insumosTexto = selectedInsumosList
      .map((ins) => `${ins.id},${ins.Nombre},${ins.Cantidad}`)
      .join("**");

    DatabaseConnection.ModificarTratamientos(
      item.Id,
      nombreTratamiento,
      selectedZona,
      selectedUsuario,
      selectedDate,
      selectedEndDate,
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
      selectedZona === null ||
      selectedUsuario === null ||
      selectedDate === "" ||
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
      Alert.alert(
        "Error",
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
      return false;
    }

    return true;
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

  const handleBorrarObs = (itemValue) => {
    const nuevaLista = selectedObservacionList.filter(
      (obs) => obs.id !== parseInt(itemValue)
    );
    setSelectedObservacionList(nuevaLista);
  };

  const handleBorrarIns = (itemValue) => {
    const nuevaLista = selectedInsumosList.filter(
      (ins) => ins.id !== parseInt(itemValue)
    );
    setSelectedInsumosList(nuevaLista);
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
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listItemView}>
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
                {selectedDate !== ""
                  ? selectedDate
                  : "Seleccionar fecha de inicio"}
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

            <TouchableOpacity
              style={styles.input}
              onPress={() => setEndDatePickerVisible(true)}
            >
              <Text>
                {selectedEndDate !== ""
                  ? selectedEndDate
                  : "Seleccionar fecha de fin"}
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
              selectedValue={selectedZona}
              onValueChange={(itemValue) => setSelectedZona(itemValue)}
            >
              <Picker.Item label="Seleccionar Zona" value={null} />
              {zona.map((zona) => (
                <Picker.Item key={zona.id} label={zona.Lugar} value={zona.id} />
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
                console.log(itemValue);
                handleObservacion(itemValue);
              }}
            >
              <Picker.Item label="Seleccionar Observacion" value={null} />
              {observacion.map((obs) => (
                <Picker.Item key={obs.id} label={obs.Titulo} value={obs} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectedUsuario}
              onValueChange={(itemValue) => {
                setSelectedUsuario(itemValue);
              }}
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

            <View>
              <Text style={styles.selectedSectionTitle}>
                Observaciones Seleccionadas:
              </Text>
              {renderSelectedObservaciones()}
            </View>

            <View>
              <Text style={styles.selectedSectionTitle}>
                Insumos Seleccionados:
              </Text>
              {renderSelectedInsumos()}
            </View>
            <BotonPrincipal title="Guardar" onPress={handleGuardar} />
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedItemText: {
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listItemView: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default ModificarTratamiento;
