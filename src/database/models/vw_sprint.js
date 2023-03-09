"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class vw_sprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // // hasOne associations
      // vw_sprint.hasOne(models.OrderDetail, {
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
  vw_sprint.init(
    { 
    deno_dificultad: DataTypes.STRING,
    estado_tarea: DataTypes.STRING,
    numero_tarea: DataTypes.BIGINT,
    asunto: DataTypes.STRING,
    tiempo_presupuestado: DataTypes.BIGINT,
    tarea_en_proceso:DataTypes.BIGINT,
		BACKLOG: DataTypes.STRING,
    HACER: DataTypes.STRING,
		EN_PROCESO: DataTypes.STRING,
		EN_TESTING: DataTypes.STRING,
		TESTING_OK: DataTypes.STRING,
		HECHO: DataTypes.STRING,
    tot_usuarios_pendientes:  DataTypes.BIGINT,
    total_consumido:  DataTypes.BIGINT,
    puntos_dificultad: DataTypes.INTEGER,
    en_proceso_por: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "vw_sprint",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'vw_sprint'
    }
  );
  return vw_sprint;
};