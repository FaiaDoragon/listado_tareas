// Función para crear la base de datos si no existe
const createDatabase = () => {
    connection.query(`CREATE DATABASE ${databaseName}`, (err) => {
      if (err) {
        console.error('Error al crear la base de datos:', err);
      } else {
        console.log(`Base de datos "${databaseName}" creada con éxito.`);
      }
    });
}

// Funcion para crear la Tabla de datos
const createTable = () => {
  
    const tableName = 'TAREAS';
  
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${databaseName}.${tableName} (
      ID varchar(255) PRIMARY KEY,
      DESCRIPCION VARCHAR(255) NOT NULL,
      COMPLETADA VARCHAR(255),
      FECHACOMPLETADA DATE
    )
    `;
    connection.query( createTableQuery, (err) => {
      if (err) {
        console.error('Error al crear la TABLA:', err);
      } else {
        console.log(`TABLA "${tableName}" creada con éxito.`);
      }
    });
}
  
module.exports = {
    createDatabase,
    createTable
}