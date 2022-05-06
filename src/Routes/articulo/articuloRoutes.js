const express = require("express");
const router = express.Router();
//const tareasController = require("../Controllers/tareasController")
const tareasController = require("../../Controllers/tareasController")

// Rutas
router.get("/", tareasController.art);

module.exports = router;