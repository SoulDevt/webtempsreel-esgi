const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class DemandeCommunication extends Model {}

DemandeCommunication.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: connection,
    modelName: "demandeCommunication",
    paranoid: false,
  }
);

module.exports = DemandeCommunication;
