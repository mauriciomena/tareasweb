let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    const { version , sistema } = req.query

    db.vw_entregas.findAll( { 
      where : { version : version,
                sistema : sistema},
      order: [
        ['id', 'DESC']
      ] })
      .then((entregas) => {
        //res.render("products/productList.ejs", { products });
        //res.json(tareas)
        res.json({
          meta:{
            status: 200,
            total : entregas.length,
            url : `http://${req.headers.host}/entregas`
          },
          data: entregas
      })          
    }).catch((error) => res.send(error));
  },
  listCompilaciones: (req, res) => {

    db.vw_entregas.findAll( { 
      attributes: ['sistema','deno_sistema','version'],
      group: ['sistema','deno_sistema','version'],   
       })
      .then((entregas) => {
        //res.render("products/productList.ejs", { products });
        //res.json(tareas)
        res.json({
          meta:{
            status: 200,
            total : entregas.length,
            url : `http://${req.headers.host}/entregas/compilaciones`
          },
          data: entregas
      })          
    }).catch((error) => res.send(error));
  },
};