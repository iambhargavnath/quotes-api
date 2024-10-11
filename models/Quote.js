const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the import to use db.js

class Quote extends Model {}

Quote.init({
  quote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Quote',
});

module.exports = Quote;
