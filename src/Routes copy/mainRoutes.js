const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

// Rutas
router.get("/", clientesController.list);

module.exports = router;