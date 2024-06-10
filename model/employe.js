const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../DB/connect'); 
const Company = require('./company'); 

const Employee = sequelize.define('Employee', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100], // Minimum password length
        },
    },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id',
        },
    },
}, {
    tableName: 'employees',
    timestamps: true,
    hooks: {
        beforeCreate: async (employee) => {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(employee.password, 10);
            employee.password = hashedPassword;
        },
    },
});

// Define associations
Company.hasMany(Employee, { foreignKey: 'companyId' });
Employee.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Employee;
