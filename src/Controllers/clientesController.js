let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Clientes.findAll()
          .then((Clientes) => {
            //res.render("products/productList.ejs", { products });
            res.json(Clientes)
          })
          .catch((error) => res.send(error));
      },
};