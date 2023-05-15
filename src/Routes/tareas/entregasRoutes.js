const express = require("express");
const entregasControler = require("../../Controllers/entregasControler");
const router = express.Router();

// Rutas

router.get("/fordate",          entregasControler.listForDate);
router.get("/compilaciones",    entregasControler.listCompilaciones);
router.get("/",                 entregasControler.list);





module.exports = router;