import * as SQLite from "expo-sqlite";



const DBName = "database.db";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase(DBName),
  closeConnection: () => SQLite.closeConnection(DBName),

  // a modo de ejemplo
  
   inserZona: (Lugar, Departamento, Cantidad, Latitud, Longitud) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Zonas (Lugar, Departamento, Cantidad, Latitud, Longitud) VALUES (?, ?, ?, ?, ?)",
          [Lugar, Departamento, Cantidad, Latitud, Longitud],
          (_, results) => {
            resolve(results.rowsAffected);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  createZonasTable: () => {
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
  ModificarZona: (
    Lugar,
    Departamento,
    Cantidad,
    Latitud,
    Longitud,
    Latitud2,
    Longitud2
  ) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Zonas SET Lugar=?, Departamento=?, Cantidad=?, Latitud=?, Longitud=? WHERE Latitud=? AND Longitud=?",
          [
            Lugar,
            Departamento,
            Cantidad,
            Latitud,
            Longitud,
            Latitud2,
            Longitud2,
          ],
          (_, results) => {
            if (results.rowsAffected > 0) {
              resolve(true); // Resuelve la promesa con true
            } else {
              resolve(false); // Resuelve la promesa con false
            }
          },
          (_, error) => {
            reject(error); // Rechaza la promesa con el error
          }
        );
      });
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

  
  createUsuariosTable: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Usuarios"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            // La tabla no existe, se crea
            tx.executeSql(
              'CREATE TABLE Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT,Password TEXT, Email TEXT )',
              [],
              () => console.log('Tabla Usuarios creada correctamente'),
              (tx, error) => console.log('Error al crear la tabla Usuarios:', error)
            );
          } else {
            // La tabla ya existe, no es necesario crearla nuevamente
            console.log('La tabla Usuarios ya existe');
          }
        },
        (tx, error) => console.log('Error al verificar la existencia de la tabla Usuarios:', error)
      );
    });
  },

  insertUsuario: (Nombre, Password, Email) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Usuarios (Nombre, Password, Email) VALUES (?, ?, ?)',
          [Nombre, Password, Email],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  },

DeleteUsuario:(Nombre , Password , Email )=>{
  const db = DatabaseConnection.getConnection();
db.transaction((tx) => {
  tx.executeSql(
    'DELETE FROM Usuarios WHERE Nombre = ? AND Password = ? AND Email = ?',
    [Nombre , Password, Email],
    (tx, results) => {
      console.log("Results", results.rowsAffected);
      if(results.rowsAffected > 0){
       return true;
      } else {
       return false;
      }
    }
  );
})
},

ModificarUsuario: (Nombre, Password, Email) => {
  const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Usuarios set Nombre=?,WHERE Password=? AND Email=?",
        [Nombre , Password, Email],
        (_, results) => {
          if (results.rowsAffected > 0) {
            
           return true
        
          } else {
           return false
          }
        }
      )
    })
},

BuscarUsuarios: (setUsuario) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Usuarios`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setUsuario(results.rows._array); // Actualizar el estado Usuarios con los resultados
          resolve(results.rows._array); // Resolver la promesa con los resultados
        } else {       
          reject(new Error("No hay Usuarios")); // Rechazar la promesa con un error
        }
      });
    });
  });
},


  
};

export default DatabaseConnection;
