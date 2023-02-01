// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const jwt = require("jsonwebtoken");

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
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "AdminChatList",
    paranoid: false,
  }
);

AdminChatList.addHook("beforeCreate", async (chat) => {
  chat.url = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });
});

module.exports = AdminChatList;
