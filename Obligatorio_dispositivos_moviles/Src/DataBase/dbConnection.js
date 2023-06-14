import * as SQLite from "expo-sqlite";

const DBName = "database.db";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase(DBName),
  closeConnection: () => SQLite.closeConnection(DBName),

  //INSUMO
  InsertInsumo: (Nombre, Cantidad) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Insumos (Nombre, Cantidad) VALUES (?,?)",
        [Nombre, Cantidad],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        },
        (tx, error) => {
          return false;
        }
      );
    });
  },

  CreateInsumosTable: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Insumos"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            tx.executeSql(
              //Creamos la tabla
              "CREATE TABLE Insumos (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Cantidad INTEGER)",
              [],
              () => console.log("Tabla Insumos creada correctamente"),
              (tx, error) =>
                console.log("Error al crear la tabla Insumos", error)
            );
          } else {
            // La tabla ya existe, no es necesario crearla nuevamente
            console.log("La tabla Insumos ya existe");
          }
        },
        (tx, error) =>
          console.log(
            "Error al verificar la existencia de la tabla Zonas:",
            error
          )
      );
    });
  },

  DeleteInsumo: (Nombre, Cantidad) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Insumos WHERE Nombre = ? AND Cantidad = ?",
        [Nombre, Cantidad],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        }
      );
    });
  },
  //VER QUE NO ANDA
  ModificarInsumo: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Insumos set Nombre=?, Cantidad=?",
        [Nombre, Cantidad],
        (_, results) => {
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        }
      );
    });
  },

  BuscarInsumos: () => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM Insumos`, [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setInsumos(results.rows._array); // Actualizar el estado, con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
          } else {
            Alert.alert(
              "Mensaje",
              "No hay Insumos!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("PaginaPrincipal"),
                },
              ],
              { cancelable: false }
            );
            reject(new Error("No hay zonas")); // Rechazar la promesa con un error
          }
        });
      });
    });
  },
  //ZONA
  InsertZona: (Lugar, Departamento, Cantidad, Latitud, Longitud) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Zonas (Lugar, Departamento, Cantidad, Latitud, Longitud) VALUES (?, ?, ?, ?, ?)",
        [Lugar, Departamento, Cantidad, Latitud, Longitud],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        },
        (tx, error) => {
          return false;
        }
      );
    });
  },

  CreateZonasTable: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Zonas"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            // La tabla no existe, se crea
            tx.executeSql(
              "CREATE TABLE Zonas (id INTEGER PRIMARY KEY AUTOINCREMENT, Lugar TEXT, Departamento TEXT, Cantidad INTEGER, Latitud REAL, Longitud REAL)",
              [],
              () => console.log("Tabla Zonas creada correctamente"),
              (tx, error) =>
                console.log("Error al crear la tabla Zonas:", error)
            );
          } else {
            // La tabla ya existe, no es necesario crearla nuevamente
            console.log("La tabla Zonas ya existe");
          }
        },
        (tx, error) =>
          console.log(
            "Error al verificar la existencia de la tabla Zonas:",
            error
          )
      );
    });
  },

  DeleteZona: (Latitud, Longitud, Lugar) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Zonas WHERE Latitud = ? AND Longitud = ? AND Lugar = ?",
        [Latitud, Longitud, Lugar],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        }
      );
    });
  },

  ModificarZona: (Lugar, Departamento, Cantidad, Latitud, Longitud) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Zonas set Lugar=?, Departamento=?, Cantidad=?, Latitud=?, Longitus=? WHERE Latitud=? AND Logitud=?",
        [Lugar, Departamento, Cantidad, Latitud, Longitud, Latitud, Longitud],
        (_, results) => {
          if (results.rowsAffected > 0) {
            return true;
          } else {
            return false;
          }
        }
      );
    });
  },

  BuscarZonas: (setZonas) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM Zonas`, [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setZonas(results.rows._array); // Actualizar el estado Zonas con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
          } else {
            Alert.alert(
              "Mensaje",
              "No hay Zonas!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("PaginaPrincipal"),
                },
              ],
              { cancelable: false }
            );
            reject(new Error("No hay zonas")); // Rechazar la promesa con un error
          }
        });
      });
    });
  },
};

export default DatabaseConnection;
