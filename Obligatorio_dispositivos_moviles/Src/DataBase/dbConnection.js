import * as SQLite from "expo-sqlite";

const DBName = "database.db";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase(DBName),
  closeConnection: () => SQLite.closeConnection(DBName),

  // a modo de ejemplo
  //   inserUser: (userName, password, email) => {
  //     const db = getConnection();
  //     db.transaction((tx) => {
  //         tx.executeSql(
  //             'INSERT INTO users (userName, password, email) VALUES (?, ?, ?)',
  //             [userName, password, email],
  //             (tx, results) => {
  //                 if(results.rowsAffected > 0){
  //                     return results.rowsAffected;
  //                 }
  //                 return 0;
  //             }
  //         )
  //     });
  // }
};

export default DatabaseConnection;
