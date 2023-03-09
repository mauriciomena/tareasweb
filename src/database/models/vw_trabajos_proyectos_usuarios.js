"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class vw_trabajos_proyectos_usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // belongsTo associations
      
    }
  }
  vw_trabajos_proyectos_usuarios.init(
    { 
      usuario: DataTypes.STRING,
      estado_tarea: DataTypes.STRING,
    numero_tarea: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "vw_trabajos_proyectos_usuarios",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'vw_trabajos_proyectos_usuarios'
    }
  );
  return vw_trabajos_proyectos_usuarios;
};