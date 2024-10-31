const { DataTypes } = require("sequelize");
const { getSequelize } = require("../utils/databaseConnector");

const ProfileImage = getSequelize()?.define(
    "profile_images",
    {
        id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: true,
        createdAt: "upload_date",
        updatedAt: false
    }
);

ProfileImage.sync();

module.exports = {
    ProfileImage,
};
