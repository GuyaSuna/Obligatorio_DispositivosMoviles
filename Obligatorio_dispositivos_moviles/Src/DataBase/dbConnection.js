import * as SQLite from "expo-sqlite";

const DBName = "database.db";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase(DBName),
  closeConnection: () => SQLite.closeConnection(DBName),

  // a modo de ejemplo
     inserUser: (userName, password, email) => {
      const db = DatabaseConnection.getConnection();
       db.transaction((tx) => {
           tx.executeSql(
               'INSERT INTO users (userName, password, email) VALUES (?, ?, ?)',
               [userName, password, email],
               (tx, results) => {
                   if(results.rowsAffected > 0){
                       return results.rowsAffected;
                   }
                   return 0;
               }
           )
       });
   },

   inserZona: (Lugar, Departamento, Cantidad, Latitud, Longitud) => {
    return new Promise((resolve, reject) => {
      const db = DatabaseConnection.getConnection();
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Zonas (Lugar, Departamento, Cantidad, Latitud, Longitud) VALUES (?, ?, ?, ?, ?)',
          [Lugar, Departamento, Cantidad, Latitud, Longitud],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(results.rowsAffected);
            } else {
              reject(new Error("Error al insertar la zona"));
            }
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  createZonasTable: (type) => {
    const db = DatabaseConnection.getConnection();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="Zonas"',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            // La tabla no existe, se crea
            tx.executeSql(
              'CREATE TABLE Zonas (id INTEGER PRIMARY KEY AUTOINCREMENT, Lugar TEXT, Departamento TEXT, Cantidad INTEGER, Latitud REAL, Longitud REAL)',
              [],
              () => console.log('Tabla Zonas creada correctamente'),
              (tx, error) => console.log('Error al crear la tabla Zonas:', error)
            );
          } else {
            // La tabla ya existe, no es necesario crearla nuevamente
            console.log('La tabla Zonas ya existe');
          }
        },
        (tx, error) => console.log('Error al verificar la existencia de la tabla Zonas:', error)
      );
    });
  }
  
};

export default DatabaseConnection;
