// Importa la biblioteca dotenv
require('dotenv').config();

export default {
    ERROR: {
        //Mensaje ERROR
        ERROR: 'FALSE;Error en la ejecución;ERR-001',
        ERRORDATA: 'FALSE;Error, no se encontro información;ERR-002',
        ERRORBD: 'FALSE;Error con la base de datos;ERR-003',
        ERRORTOKENFALSE: 'FALSE;Error, Token no proporcionado;ERR-004',
        ERRORTOKEN: 'FALSE;Error, Token no válido;ERR-005',
        ERRORPARAMS: 'FALSE;Error, Faltan parametros;ERR-006',
        ERROARCHIVONOFOUND: 'FALSE;Error, el archivo no fue encontrado;ERR-007',
        ERRORSUBIRARCHIVO: 'FALSE;Error, al intentar subir archivo;ERR-008',
        ERRORARCCHIVOYAEXISTE: 'FALSE;Error, el archivo ya se encuentra almacenado;ERR-009',
        ERRORUSER: 'FALSE;Error, usuario no encontrado;ERR-010',
        ERRORPASSWORD: 'FALSE;Error, clave incorrecta;ERR-011',
        ERRORALELIMINAR: 'FALSE;Error al eliminar, intente nuevamente;ERR-012',
        ERRORCASILLA: 'FALSE;Error, la casilla ya existe para otro cliente;ERR-013',
        ERRORPAGENOTFOUND: 'FALSE;Error, página no encontrada;ERR-014',
        ERRORDESCARGAEXCEL: 'FALSE;Error, Hay ocs que se estan procesando, por favor espere un momento y vuelva a descargar;ERR-015',
    },
    SUCCESS: {
        //Mensaje CORRECTO
        NOTDATA: 'TRUE;No existe información;OK-001',
        INFOOK: 'TRUE;Información correcta;OK-002',    
    },
    ENCRYPT: {
        // Datos para encriptación de data
        METHOD: 'AES-256-CBC',
        SECRET_KEY: process.env.SECRET_KEY,
        SECRET_IV: process.env.SECRET_IV,
    },
    APP: {
        PORT: process.env.PORT,
        URL_BASE: process.env.URL_BASE
    },
    DATABASE: {
        DB_HOST: process.env.DB_HOST,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD
    }
};
