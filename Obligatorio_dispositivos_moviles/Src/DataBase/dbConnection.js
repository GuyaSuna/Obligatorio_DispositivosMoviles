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

  DeleteZona: (Id) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Zonas WHERE Id = ?", [Id], (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          return true;
        } else {
          return false;
        }
      });
    });
  },

  ModificarZona: (
    Lugar,
    Departamento,
    Cantidad,
    Latitud,
    Longitud,
    Id
  ) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Zonas SET Lugar=?, Departamento=?, Cantidad=?, Latitud=?, Longitud=? WHERE Id=?",
          [
            Lugar,
            Departamento,
            Cantidad,
            Latitud,
            Longitud,
            Id,
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
            setZonas(results.rows._array);
            resolve(results.rows._array);
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
            reject(new Error("No hay zonas"));
          }
        });
      });
    });
  },
  // deleteTablaUsuario: () => {
  //   const db = DatabaseConnection.getConnection();
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         "DROP TABLE Usuarios",
  //         [],
  //         () => {
  //           console.log("Tabla Usuarios eliminada correctamente");
  //         },
  //         (tx, error) => {
  //           console.log("Error al eliminar la tabla Usuarios:", error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log("Error en la transacción:", error);
  //     }
  //   );
  // },

 deleteTablaUsuario: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DROP TABLE Usuarios",
          [],
          () => {
            console.log("Tabla Usuarios eliminada correctamente");
          },
          (tx, error) => {
            console.log("Error al eliminar la tabla Usuarios:", error);
          }
        );
      },
      (error) => {
        console.log("Error en la transacción:", error);
      }
    );
  },
  

  createUsuariosTable: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Usuarios"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            tx.executeSql(
              "CREATE TABLE Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT,Apellido TEXT, Email TEXT )",
              [],
              () => console.log("Tabla Usuarios creada correctamente"),
              (tx, error) =>
                console.log("Error al crear la tabla Usuarios:", error)
            );
          } else {
            console.log("La tabla Usuarios ya existe");
          }
        },
        (tx, error) =>
          console.log(
            "Error al verificar la existencia de la tabla Usuarios:",
            error
          )
      );
    });
  },

  insertUsuario: (Nombre, Apellido, Email) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Usuarios (Nombre, Apellido, Email) VALUES (?, ?, ?)",
          [Nombre, Apellido, Email],
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

  DeleteUsuario: (Id) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Usuarios WHERE Id = ?",
        [Id],
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

  ModificarUsuario: (Nombre, Apellido, Email, Id) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Usuarios SET Nombre=?, Apellido=?, Email=? WHERE Id=?",
          [Nombre, Apellido, Email, Id],
          (_, results) => {
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

  BuscarUsuarios: (setUsuario) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM  Usuarios", [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setUsuario(results.rows._array); // Actualizar el estado Zonas con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
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

  DeleteInsumo: (Id) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Insumos WHERE id = ?", [Id], (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          return true;
        } else {
          return false;
        }
      });
    });
  },

  BuscarInsumo: (setInsumos) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM  Insumos", [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setInsumos(results.rows._array); // Actualizar el estado Zonas con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
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
          "INSERT INTO Observaciones (Titulo, Foto, Latitud, Longitud) VALUES (?, ?, ?, ?)",
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

  DeleteObservaciones: (Id) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Observaciones WHERE Id= ?",
        [Id],
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
    Titulo,
    Foto,
    Latitud,
    Longitud,
    Titulo2,
    Foto2,
    Latitud2,
    Longitud2
  ) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Observaciones SET Titulo=?, Foto=?, Latitud=?, Longitud=? WHERE Titulo=? AND Foto = ? AND Latitud=? AND Longitud=?",
          [
            Titulo,
            Foto,
            Latitud,
            Longitud,
            Titulo2,
            Foto2,
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
  BuscarObservaciones: (setObservaciones) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM  Observaciones", [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setObservaciones(results.rows._array); // Actualizar el estado Zonas con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
          }
        });
      });
    });
  },
  createTratamientosTable: () => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Tratamientos"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            // La tabla no existe, se crea
            tx.executeSql(
              "CREATE TABLE Tratamientos (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT,Zona TEXT,Usuario TEXT,FechaInicio DATE, FechaFinalizacion DATE, Tiempo INT,OrdenTrabajo TEXT,Insumos TEXT,Observaciones TEXT )",
              [],
              () => console.log("Tabla Tratamientos creada correctamente"),
              (tx, error) =>
                console.log("Error al crear la tabla Tratamiento:", error)
            );
          } else {
            // La tabla ya existe, no es necesario crearla nuevamente
            console.log("La tabla Tratamientos ya existe");
          }
        },
        (tx, error) =>
          console.log(
            "Error al verificar la existencia de la tabla Tratamientos:",
            error
          )
      );
    });
  },

  inserTratamientos: async (
    Nombre,
    Zona,
    Usuario,
    selectedDate,
    selectedEndDate,
    Tiempo,
    OrdenTrabajo,
    Insumos,
    Observaciones
  ) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Tratamientos ( Nombre,Zona,Usuario,FechaInicio , FechaFinalizacion , Tiempo ,OrdenTrabajo,Insumos,Observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            Nombre,
            Zona,
            Usuario,
            selectedDate,
            selectedEndDate,
            Tiempo,
            OrdenTrabajo,
            Insumos,
            Observaciones,
          ],
          (tx, results) => {
            console.log("Sip");
            resolve(results.rowsAffected);
          },
          (tx, error) => {
            console.log("Nope");
            reject(error);
          }
        );
      });
    });
  },
  BuscarTratamientos: (setTratamientos) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM  Tratamientos", [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setTratamientos(results.rows._array); // Actualizar el estado Zonas con los resultados
            resolve(results.rows._array); // Resolver la promesa con los resultados
          }
        });
      });
    });
  },
  DeleteTratamientos: (id) => {
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Tratamientos WHERE id=?",
          [id],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.log("Error Al borrar un tratamiento", error);
            reject(error);
          }
        );
      });
    });
  },
  ModificarTratamientos: (
    id,
    Nombre,
    Zona,
    Usuario,
    FechaInicio,
    FechaFinalizacion,
    Tiempo,
    OrdenTrabajo,
    Insumos,
    Observaciones
  ) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Tratamientos SET Nombre=?, Zona=?, Usuario=?, FechaInicio=?, FechaFinalizacion=?, Tiempo =?, OrdenTrabajo = ?, Insumos=?, Observaciones=? WHERE Id=?",
          [
            Nombre,
            Zona,
            Usuario,
            FechaInicio,
            FechaFinalizacion,
            Tiempo,
            OrdenTrabajo,
            Insumos,
            Observaciones,
            id,
          ],
          (_, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  SeleccionarUsuarioUnico: (userId, setSelectedUser) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Usuarios WHERE id=?",
        [userId],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            const usuario = results.rows.item(0);
            console.log("Usuario encontrado:", usuario);
            setSelectedUser(results.rows.item(0));
          } else {
            console.log("No se encontró ningún usuario con el ID:", userId);
          }
        }
      );
    });
  },
  SeleccionarZonaUnica: (zonaId, setSelectedZona) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Zonas WHERE id=?",
        [zonaId],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            const Zona = results.rows.item(0);
            console.log("Zona encontrada:", Zona);
            setSelectedZona(results.rows.item(0));
          } else {
            console.log("No se encontró ninguna Zona con el ID:", zonaId);
          }
        }
      );
    });
  },
};

export default DatabaseConnection;
