const { DataTypes } = require("sequelize");
const { getSequelize } = require("../utils/databaseConnector");

const UserVerification = getSequelize()?.define(
    "UserVerification",
    {
        id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

UserVerification.sync();

module.exports = {
    UserVerification,
};
