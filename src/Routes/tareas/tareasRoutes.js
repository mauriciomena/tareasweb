const express = require("express");
const router = express.Router();
const tareasController = require("../../Controllers/tareasController")

// Rutas
router.get("/", tareasController.list);
router.get("/sprint/:id", tareasController.sprint);

module.exports = router;