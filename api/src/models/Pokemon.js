const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    health: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    attack: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    defense: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      defaultValue: "https://icon-library.com/images/pokeball-icon/pokeball-icon-4.jpg"
    }
  });
};
