import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";
// const isAuthenticated = require('../middlewares/auth-middleware');

const router = Router();

// Rutas no protegidas
router.post("/login", usuarioController.login);

// Rutas protegidas
// router.use(isAuthenticated);
// router.get("/", usuarioController.getUsuarios);
// router.get("/:id", usuarioController.getUsuariosById);

export default router;