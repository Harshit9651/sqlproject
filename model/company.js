const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connect.js');
const bcrypt = require('bcrypt');

const company = sequelize.define('company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensure password is not empty
            len: [6, 255], // Minimum and maximum password length
        },
        set(value) {
            // Hash the password before saving
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        },
    },
}, {
    tableName: 'companies',
    timestamps: true,
});

module.exports = company;
