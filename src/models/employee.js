const { DataTypes } = require("sequelize");
const { getConnection } = require('../sql')

const sequelize = getConnection();

const Employee = sequelize.define('Employee', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = {
    Employee
}