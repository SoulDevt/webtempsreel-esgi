// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class AdminChatList extends Model {}

AdminChatList.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    }
  },
  {
    sequelize: connection,
    modelName: "AdminChatList",
    paranoid: false,
  }
);

module.exports = AdminChatList;
