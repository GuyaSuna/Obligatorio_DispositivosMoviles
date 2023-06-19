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

ModificarUsuario: (Nombre, Password, Email , NombreViejo , PaswordViejo) => {
  return new Promise((resolve,reject ) => {
  const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Usuarios SET Nombre=?, Password=?, Email=? WHERE Nombre=? AND Password=?",
        [Nombre , Password, Email , NombreViejo , PaswordViejo],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, (tx, error) => {
          reject(error);
        }
      )
    })
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
InsertInsumo: (insumoName, insumoCantidad) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Insumos (Nombre, Cantidad) VALUES (?, ?)",
        [insumoName, insumoCantidad],
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

DeleteInsumo: (Id, Nombre, Cantidad) => {
  const db = DatabaseConnection.getConnection();
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Insumos WHERE id = ? AND Nombre = ? AND Cantidad = ?",
      [Id, Nombre, Cantidad],
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
BuscarInsumo: (setInsumos) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM  insumos`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setInsumos(results.rows._array); // Actualizar el estado Zonas con los resultados
          resolve(results.rows._array); // Resolver la promesa con los resultados
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Insumos",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("PaginaPrincipal"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  });
},
ModificarInsumo: (Nombre, Cantidad, NombreViejo) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    console.log(Nombre, Cantidad, NombreViejo);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Insumos SET Nombre = ?, Cantidad = ? WHERE Nombre = ?",
        [Nombre, Cantidad, NombreViejo],
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



createObservacionesTable: () => {
  const db = DatabaseConnection.getConnection();
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table" AND name="Observaciones"',
      [],
      (tx, results) => {
        if (results.rows.length === 0) {
          // La tabla no existe, se crea
          tx.executeSql(
            "CREATE TABLE Observaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT, Foto TEXT, Latitud REAL, Longitud REAL)",
            [],
            () => console.log("Tabla Observaciones creada correctamente"),
            (tx, error) =>
              console.log("Error al crear la tabla Observaciones:", error)
          );
        } else {
          // La tabla ya existe, no es necesario crearla nuevamente
          console.log("La tabla Observaciones ya existe");
        }
      },
      (tx, error) =>
        console.log(
          "Error al verificar la existencia de la tabla Observaciones:",
          error
        )
    );
  });
},

insertObservaciones: async (title, imageUri, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Observaciones (Titulo, Foto, Latitud, Longitud) VALUES (?, ?, ?, ?)',
        [title, imageUri, latitude, longitude],
        (tx, results) => {
          resolve(results.rowsAffected);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
},



DeleteObservaciones: (Latitud, Longitud, Lugar) => {
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
ModificarObservaciones: (
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
BuscarObservaciones: (setZonas) => {
  return new Promise((resolve, reject) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Observaciones`, [], (tx, results) => {
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
