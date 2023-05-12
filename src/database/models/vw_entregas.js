"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class vw_entregas extends Model {
    static associate(models) {    
    }
  }
  vw_entregas.init(
    { 
      version: DataTypes.BIGINT,
      sistema: DataTypes.BIGINT,
      deno_sistema: DataTypes.STRING,
      asunto: DataTypes.STRING,
      tarea: DataTypes.STRING,
      tipo_incidente: DataTypes.STRING,
      estado_tarea: DataTypes.STRING,
      deno_tipo_incidente: DataTypes.STRING,
      fecha: DataTypes.DATE,
    
    },
    {
      sequelize,
      modelName: "vw_entregas",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'vw_entregas'
    }
  );
  return vw_entregas;
};