const express = require("express");
const router = express.Router();
//const clientesController = require("../controllers/clientesController");
const clientesController = require("../Controllers/clientesController");
const tareasController = require("../Controllers/tareasController")

// Rutas
router.get("/", clientesController.list);
router.get("/tareas", tareasController.list);

module.exports = router;