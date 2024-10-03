const { DataTypes } = require("sequelize");
const { getSequelize } = require("../utils/databaseConnector");

const User = getSequelize().define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: true,
        createdAt: 'account_created',
        updatedAt: 'account_updated'
    }
);

User.sync();

module.exports = {
    User,
};
