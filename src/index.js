const express = require('express');
const { getConnection, startConnection} = require("./sql");

const app = express();
const PORT = 3000;

async function syncDatabase() {
    const sequelize = getConnection();
    await sequelize.sync();
}

async function init() {
    await startConnection();
    await syncDatabase();
}

app.listen(PORT, async () => {
    console.log(`App listening at localhost:${PORT}`);
    await init();
});