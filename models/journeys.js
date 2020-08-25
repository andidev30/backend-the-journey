'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journeys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journeys.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "userId"
        }
      })
      journeys.hasMany(models.bookmark)
    }
  };
  journeys.init({
    title: DataTypes.STRING,
    userId: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'journeys',
  });
  return journeys;
};