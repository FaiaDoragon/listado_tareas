require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

//const Tarea = require('./models/tarea.js')
const Tareas = require('./models/tareas.js')
//const { pausa } = require('./helpers/mensajes');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');


//console.clear();


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB()

    if (tareasDB) {
        //cargar tareas
        tareas.cargarTareasFromArr(tareasDB)
    }

    do {
        //impreime el menu y devuelve el valor que usaremos para determinar la opcion
        opt = await inquirerMenu();
        //usamos la opcion como argumento para asignar los case
        switch (opt) {

            case '1': // Crear Tareas
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea( desc );
            break; 

            case '2':// Listar todas las tareas
                tareas.listadoCompleto()
            break;

            case '3': //Listar completadas
                tareas.listadoTareasCompletadasPendientes(true)
            break;

            case '4': //Listar pendientes
                tareas.listadoTareasCompletadasPendientes(false)
            break;

            case '5': // Compleatadas | Pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompleatadas(ids);
            break;

            case '6': // Borrar Tareas
                const id = await listadoTareasBorrar( tareas.listadoArr)
                if ( id !== '0') {
                    const ok = await confirmar('Estas seguro que deseas borrarlo?')
                    if (ok) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente');
                    }    
                }
                
            break;
        }

        guardarDB( tareas.listadoArr )

        await pausa()

       //if ( opt !== '0') await pausa()

    } while (opt !== '0');

    //pausa();
}



main();