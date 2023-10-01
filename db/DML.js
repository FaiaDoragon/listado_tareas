const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'mysql', // Puedes usar la base de datos 'mysql' para las consultas de administración
});

const databaseName = 'TAREAS';
const tableName = 'TAREAS';

const insertTarea = ({id, desc, completadoEn}) => {

    const insertTableQuery = `
        INSERT INTO ${databaseName}.${tableName} (
        ID, DESCRIPCION, COMPLETADA, FECHACOMPLETADA
        ) VALUES (
        '${id}', '${desc}', 'PENDIENTE' ,${completadoEn})`;

    connection.connect((err) => {
        if (err) {
          console.error('Error en la conexión a MySQL:', err);
          return;
        }
        console.log('Conexión exitosa a MySQL');
    });

    connection.query( insertTableQuery, (err) => {
        if (err) {
          console.error('Error al insertar datos en la TABLA:', err);
        } else {
          console.log(`datos insertados en "${tableName}"con éxito.`);
        }
      });
}

const deleteTarea = ({id}) => {

  const deleteQuery = `
      DELETE FROM ${databaseName}.${tableName} WHERE
      ID = '${id}'`;

  connection.connect((err) => {
      if (err) {
        console.error('Error en la conexión a MySQL:', err);
        return;
      }

      console.log('Conexión exitosa a MySQL');
  });

  connection.query( deleteQuery, (err) => {
      if (err) {
        console.error('Error al borrar tarea en la TABLA:', err);
      } else {
        console.log(`datos borrados de "${tableName}"con éxito.`);
      }
    });
}

const estadoTarea = ( {id, completadoEn} ) => {

  const updateQuery =`UPDATE TAREAS.TAREAS
      SET COMPLETADA = '${(completadoEn)?'COMPLETADA':'PENDIENTE'}', 
      FECHACOMPLETADA = '${completadoEn}'
      WHERE ID = '${id}';
  `;
      
  connection.connect((err) => {
      if (err) {
        console.error('Error en la conexión a MySQL:', err);
        return;
      }

      console.log('Conexión exitosa a MySQL');
  });

  connection.query( updateQuery, (err) => {
      if (err) {
        console.error('Error al actualizar tarea en la TABLA:', err);
      } else {
        console.log(`datos actualizados de "${tableName}"con éxito.`);
      }
    });
}

const selectQuery = () => {
  const busqueda = `SELECT * FROM ${databaseName}.${tableName}`;
  connection.query(busqueda, (error, results) => {

    if (error) {
      throw error;
    }
    // Convierte los resultados en formato JSON
    const jsonData = results;
    // Imprime los datos en formato JSON
    jsonData.forEach(({ DESCRIPCION, FECHACOMPLETADA }, i) => {
      const idx = `${i + 1}.`.green
      const estado = (!FECHACOMPLETADA) ? 'COMPLETADA'.green:'PENDIENTE'.red
      console.log(`${idx} ${DESCRIPCION} :: ${estado}`);
    // Cierra la conexión a la base de datos
  });
  })
}



module.exports = {
    insertTarea,
    deleteTarea,
    estadoTarea,
    selectQuery
}