import { createCipheriv, createDecipheriv } from 'crypto';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';

// Importa la biblioteca dotenv
require('dotenv').config();

const getResponse = (tipo, object) => {
    const partes = tipo.split(';');

    const response = {
        peticion: {
            exito: partes[0],
            mensaje: partes[1],
            codigo: partes[2]
        },
        object: object
    };

    return response;
};

// Función de cifrado
const encryption = (string) => {
    const key = createHash('sha256').update(process.env.SECRET_KEY).digest('hex').substring(0, 32);
    const iv = createHash('sha256').update(process.env.SECRET_IV).digest('hex').substring(0, 16);
    const cipher = createCipheriv(process.env.METHOD, key, iv);
    let output = cipher.update(string, 'utf8', 'base64');
    output += cipher.final('base64');
    return output;
};
  
// Función de descifrado
const decryption = (string) => {
    const key = createHash('sha256').update(process.env.SECRET_KEY).digest('hex').substring(0, 32);
    const iv = createHash('sha256').update(process.env.SECRET_IV).digest('hex').substring(0, 16);
    const decipher = createDecipheriv(process.env.METHOD, key, iv);
    let output = decipher.update(string, 'base64', 'utf8');
    output += decipher.final('utf8');
    return output;
};

const generateToken = (user) => {
    // Define la información que deseas incluir en el token
    const payload = {
      id: user.id,
      usuario: user.usuario,
      email: user.email,
      usuario_sala: user.usuario_sala
    };

    const key = createHash('sha256').update(process.env.SECRET_KEY).digest('hex').substring(0, 32);
    
    // Firma el token con tu clave secreta
    const token = sign(payload, key, { expiresIn: '8h' });
  
    return token;
}

export default {
    getResponse,
    encryption,
    decryption,
    generateToken
};