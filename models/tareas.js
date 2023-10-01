const Tarea = require('./tarea.js')
const { insertTarea, deleteTarea, estadoTarea, selectQuery } = require('../db/DML.js')

class Tareas {

    _listado = { }

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }
    //metodo para borrar tareas | TODO: retirar el codigo para borrar tarea del json
    borrarTarea(id = '') {
        if ( this._listado[id] ) {
            deleteTarea(this._listado[id])
            delete this._listado[id];
        }
    }
    
    cargarTareasFromArr(tareas = []){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }
    //metodo para crear tareas | TODO: retirar el codigo para crear tarea en el json
    crearTarea( desc = '') {

        const tarea = new Tarea(desc)
        insertTarea(tarea)
        this._listado[tarea.id] = tarea;

    }

    //metodo para listar todas las tareas | TODO: mostrar las tareas desde la base de datos.
    listadoCompleto() {
        selectQuery();
        console.log('hola mundo');
        
        this.listadoArr.forEach( ({desc, completadoEn},i) => {
            const idx = `${ i + 1}.`.green
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`);
        });
        
    }

    //metodo para listar solo las tareas completadas | TODO: mostrar las tareas desde la base de datos.
    listadoTareasCompletadasPendientes( completadas) {
        console.log();
        let contador = 0;

        this.listadoArr.forEach( ({desc, completadoEn},i) => {
            const idx = `${ i + 1}.`.green
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`); 
                }
               
            } else {
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`); 
                }
            }
            
        });
    }

    //metodo para listar solo las tareas pendientes | TODO: mostrar las tareas desde la base de datos.
    listadoTareasPendientes() {
        console.log();
        this.listadoArr.forEach( ({desc, completadoEn},i) => {
            const idx = `${ i + 1}.`.green
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red
            if (completadoEn == null) {
                console.log(`${idx} ${desc} :: ${estado}`); 
            }
            
        });
    }
    //metodo para cambiar las tareas de pendiente a completadas y viseversa | TODO: desde la base de datos
    toogleCompleatadas(ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
                estadoTarea(tarea)
            }
        })

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
                estadoTarea(tarea)
            }
        })
    }
}



module.exports = Tareas;