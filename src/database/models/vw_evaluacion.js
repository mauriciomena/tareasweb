"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class vw_evaluacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // // hasOne associations
      // vw_evaluacion.hasOne(models.OrderDetail, {
      //   as: 'orderdetails',
      //   foreignKey: 'products_id'
      // })

      // hasMany associations
      
      

      // // belongsTo associations
      // Product.belongsTo(models.Category,{
      //   as:"categories",
      //   foreignKey: "categories_id"
      // })

    }
  }
 vw_evaluacion.init(
    { 
      asunto: DataTypes.STRING,
    tarea: DataTypes.STRING,
    tipo_incidente: DataTypes.STRING,
    estado_tarea: DataTypes.STRING,
    deno_tipo_incidente: DataTypes.STRING,
    fecha: DataTypes.DATE,
    },
    {
      sequelize,
      modelName:  "vw_evaluacion",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName:  'vw_evaluacion'
    }
  );
  return vw_evaluacion;
};