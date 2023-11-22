import config from "../config";
import mysql from "promise-mysql";

// Accede a las variables de entorno
const dbConfig = {
	host: config.DATABASE.DB_HOST,
	database: config.DATABASE.DB_DATABASE,
	user: config.DATABASE.DB_USER,
	password: config.DATABASE.DB_PASSWORD
};


let pool;
async function initialize() {
	pool = await mysql.createPool(dbConfig);
}

async function executeQuery(query, params = [], isTransaction = false) {
	let connection;

	try {
		connection = await pool.getConnection();

		if (isTransaction) {
			await connection.beginTransaction(); // Iniciar transacción
		}

		const result = await connection.query(query, params);

		if (isTransaction) {
			await connection.commit(); // Hacer commit si es una transacción
		}

		return result;
	} catch (error) {
		console.error('Error al ejecutar la consulta:', error);

		if (isTransaction && connection) {
			await connection.rollback(); // Hacer rollback si es una transacción y hay un error
		}

		throw error;
	} finally {
		if (connection) {
			connection.release(); // Devolver la conexión al pool
		}
	}
}

module.exports = {
	initialize,
	executeQuery,
};