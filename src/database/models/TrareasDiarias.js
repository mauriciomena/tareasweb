"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TareasDiarias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // // hasOne associations
      // TareasDiariass.hasOne(models.OrderDetail, {
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
  TareasDiarias.init(
    { usuario: DataTypes.STRING,
		sucursal_id: DataTypes.BIGINT,
		numero_id: DataTypes.BIGINT,
		fecha: DataTypes.DATE,
		numero_cliente: DataTypes.BIGINT,
		descripcion_cliente: DataTypes.STRING,
		contacto: DataTypes.STRING,
		detalle: DataTypes.STRING,
		tipo_tarea: DataTypes.BIGINT,
		minutos: DataTypes.BIGINT,
		numero_tarea: DataTypes.BIGINT,
		horas: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: "TareasDiarias",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'web_tareas_diarias'
    }
  );
  return TareasDiarias;
};