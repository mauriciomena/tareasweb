let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        console.log('list');
        db.TareasDiarias.findAll( { offset: 15, limit: 15 })
          .then((tareas) => {
            //res.render("products/productList.ejs", { products });
            //res.json(tareas)
            res.json({
              meta:{
                status: 200,
                total : tareas.length,
                url : `http://${req.headers.host}/tareas`
              },
              data: tareas
          })          
        }).catch((error) => res.send(error));
    },
    art: (req, res) => {
      console.log('articulos');
      db.Articulo.findAll( )
        .then((tareas) => {
          //res.render("products/productList.ejs", { products });
          //res.json(tareas)
          res.json({
            meta:{
              status: 200,
              total : tareas.length,
              url : `http://${req.headers.host}/tareas/articulos`
            },
            data: tareas
        })          
      }).catch((error) => res.send(error));
  },
  sprint: (req, res) => {
    console.log(req.params.id);

    db.vw_sprint.findAll({
          where: {
            [Op.and]: [
              { id: req.params.id}
            ]
          }
        }
     )
      .then((tareas) => {
        //res.render("products/productList.ejs", { products });
        //res.json(tareas)
        res.json({
          meta:{
            status: 200,
            total : tareas.length,
            url : `http://${req.headers.host}/tareas/articulos`
          },
          data: tareas
      })          
    }).catch((error) => res.send(error));
}
  };