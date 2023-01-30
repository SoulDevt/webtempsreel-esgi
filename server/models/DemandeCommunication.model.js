const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class DemandeCommunication extends Model {}

DemandeCommunication.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    },
    {
        sequelize: connection,
        modelName: "demandeCommunication",
        paranoid: false,
    }
);
