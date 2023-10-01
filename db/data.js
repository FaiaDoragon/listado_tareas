const mysql = require('mysql2');

const { createDatabase, createTable } = require('./DDL.js')
const { insertTarea } = require('./DML.js')

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'mysql', // Puedes usar la base de datos 'mysql' para las consultas de administración
});

// Nombre de la base de datos que deseas verificar
const databaseName = 'TAREAS';

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error en la conexión a MySQL:', err);
    return;
  }

  console.log('Conexión exitosa a MySQL');

  // Query para verificar si la base de datos existe
  connection.query(
    `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${databaseName}'`,
    (err, results) => {
      if (err) {
        console.error('Error al verificar la base de datos:', err);
      } else {
        if (results.length === 0) {
          console.log(`La base de datos "${databaseName}" no existe.`);
          // Ahora puedes crear la base de datos si no existe
          createDatabase();
          createTable();
        } else {
          console.log(`La base de datos "${databaseName}" ya existe.`);
          // Puedes manejar esto de acuerdo a tus necesidades
          // Por ejemplo, puedes realizar alguna acción diferente si la base de datos ya existe.
        }
      }

      // Cerrar la conexión a MySQL
      connection.end();
    }
  );
});
