import config from "../config";
import controller from "./controller";
const dbConnection = require('../database/database');

const login = async (req, res) => {

    try {
        let response = {}; 
        let tipo = config.SUCCESS.INFOOK;
        let query = '';
        let params = [];

        const { correo, clave } = req.body;

        if (correo === undefined || clave === undefined) {
            tipo = config.ERROR.ERRORPARAMS;
            response = controller.getResponse(tipo, data);
            res.status(400).json( response );
        }else {
            
            try {
                await dbConnection.initialize();
                
                query = `SELECT 
                                id
                            ,   correo 
                            ,	clave 
                            ,	nombre 
                            ,	tipo 
                            FROM usuario WHERE correo = ?`;

                // Ejecuta consulta
                params = [correo];
                const dataUsuario = await dbConnection.executeQuery(query, params);
                
                if (dataUsuario.length > 0) {
                    const idUsuario = dataUsuario[0].id;
                    const token = controller.generateToken(dataUsuario[0]);

                    
                query = `SELECT
                                asi.id
                            ,	asi.asignatura
                            ,	asi.seccion
                            ,	asi.sede
                        FROM usuario_asignatura ua
                        JOIN asignatura asi ON ua.asignatura = asi.id
                        WHERE ua.usuario = ?`;

                // Ejecuta consulta
                params = [idUsuario];
                const dataAsignaturas = await dbConnection.executeQuery(query, params);

                    let data = {
                        "token": token,
                        "usuario": dataUsuario,
                        "asignaturas": dataAsignaturas
                    }

                    if(clave === dataUsuario[0].clave) {
                        tipo = config.SUCCESS.INFOOK;
                        response = controller.getResponse(tipo, data);
                        res.json(response); 
                    }else {
                        tipo = config.ERROR.ERRORPASSWORD;
                        response = controller.getResponse(tipo, []);
                        res.json(response); 
                    }
                }else{
                    tipo = config.ERROR.ERRORUSER;
                    response = controller.getResponse(tipo, []);
                    res.json(response); 
                }
            } catch (error) {
                console.error('Error en la ejecucion:', error);
                tipo = config.ERROR.ERROR;
                response = controller.getResponse(tipo, []);
                res.json(response); 
            }
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    login
};