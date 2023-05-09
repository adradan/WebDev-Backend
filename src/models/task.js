const { Sequelize, DataTypes } = require('sequelize');
const { getConnection } = require('../sql')
const { Employee } = require("./employee");

const sequelize = getConnection();

const Task = sequelize.define('Task', {
    assignedUser: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        }
    },
    taskDescription: {
        type: DataTypes.STRING
    },
    taskPriorityLevel: {
        type: DataTypes.STRING
    },
    taskCompletionStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
},);

module.exports = {
    Task
}
