const express = require("express");
const router = express.Router();
//const tareasController = require("../Controllers/tareasController")
const tareasController = require("../../Controllers/tareasController")

// Rutas
router.get("/", tareasController.list);
router.get("/sprint/:id", tareasController.sprint);
router.get("/articulos", tareasController.art);


module.exports = router;