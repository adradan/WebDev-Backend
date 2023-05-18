const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'postgres://pmiqjlix:hrI0fhB7NLhEIhnctITNGB3KdSUYNKtr@lallah.db.elephantsql.com/pmiqjlix'
);

async function startConnection() {
    await sequelize.authenticate();
}

function getConnection() {
    return sequelize;
}

module.exports = {
    getConnection,
    startConnection,
};
