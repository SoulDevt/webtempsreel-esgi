// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class ChatbotEvent extends Model {}

ChatbotEvent.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["entretien", "routier", "toutTerrain", "sportif"]],
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "chatbotEvent",
    paranoid: false,
  }
);

module.exports = ChatbotEvent;
