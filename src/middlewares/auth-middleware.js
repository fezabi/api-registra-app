const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
import config from "../config";
import controller from "../controllers/controller";

function isAuthenticated(req, res, next) {
  // Obtén el token del encabezado de la solicitud
  let token = req.headers.authorization;
  
  if (!token) {
    const tipo = config.ERROR.ERRORTOKENFALSE;
    const response = controller.getResponse(tipo, []);
    return res.status(401).json( response );
  }

  // token = token.replace('Bearer ', '');
  token = token.split(' ').pop();

  const key = createHash('sha256').update(config.ENCRYPT.SECRET_KEY).digest('hex').substring(0, 32);

  // Verifica el token
  jwt.verify(token, key, (err, user) => {
    if (err) {
      const tipo = config.ERROR.ERRORTOKEN;
      const response = controller.getResponse(tipo, []);
      return res.status(401).json( response );
    }
    // Si el token es válido, almacena el usuario en la solicitud para que puedas acceder a él en tus controladores
    req.user = user;
    next();
  });
}

module.exports = isAuthenticated;
