"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Articulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // // hasOne associations
      // Articulos.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // // hasMany associations
      // Product.hasMany(models.Image,{
      //   as:"images",
      //   foreignKey:"products_id"
      // })

      // // belongsTo associations
      // Product.belongsTo(models.Category,{
      //   as:"categories",
      //   foreignKey: "categories_id"
      // })

    }
  }
  Articulo.init(
    { descripcion_1: DataTypes.STRING,
		precio_1: DataTypes.DECIMAL,
		
    },
    {
      sequelize,
      modelName: "Articulo",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'v_articulo'
    }
  );
  return Articulo;
};