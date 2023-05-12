const express = require("express");
const entregasControler = require("../../Controllers/entregasControler");
const router = express.Router();

// Rutas
router.get("/", entregasControler.list);
router.get("/compilaciones", entregasControler.listCompilaciones);

module.exports = router;