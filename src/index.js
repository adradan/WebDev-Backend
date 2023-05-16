const express = require('express');
const { getConnection, startConnection} = require("./sql");
const routes = require('./routes');

const app = express();
const PORT = 8080;

async function syncDatabase() {
    const sequelize = getConnection();
    await sequelize.sync();
}

async function init() {
    await startConnection();
    await syncDatabase();
}

// Allows frontend to request from backend since they are on different ports
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-origin", "*")
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

app.use(express.json());

app.use('/employees', routes.employees);
app.use('/tasks', routes.tasks);

app.listen(PORT, async () => {
    console.log(`App listening at localhost:${PORT}`);
    await init();
});
