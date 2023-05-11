const { DataTypes } = require("sequelize");
const { getConnection } = require('../sql');

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

Task.belongsTo(Employee, {
    foreignKey: 'assignedUser',
});
Employee.hasMany(Task, {
    foreignKey: 'assignedUser',
    targetKey: 'assignedUser',
    as: 'tasks',
});

module.exports = {
    Employee,
    Task,
}