const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require("./User.model");

class DemandeCommunication extends Model {}

DemandeCommunication.init(
  {},
  {
    sequelize: connection,
    modelName: "demandeCommunication",
    paranoid: false,
  }
);
// DemandeCommunication.belongsToMany(User, { through: "Demande_Admin" });
// DemandeCommunication.belongsToMany(User, { through: "Demande_User" });

module.exports = DemandeCommunication;
