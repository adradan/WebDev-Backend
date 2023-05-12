const express = require("express");
var bodyParser = require('body-parser')
const { Task } = require("../models");

const router = express.Router();
const jsonParser = bodyParser.json()

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        console.error("ERROR: GET /tasks/");
        console.error(err);
        res.status(500).json({
            message: "Error grabbing all tasks",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const task = await Task.findOne({where:{id:userID}});
        res.json(task);
    } catch (err) {
        console.error("ERROR: GET /task/");
        console.error(err);
        res.status(500).json({
            message: "Error getting task with given id",
        });
    }
});

router.post("/add", jsonParser,  (req, res) => {
    const data = req.body;
    let newTask = Task.build(data);
    newTask.save();
    console.log(newTask.id);
    return res.json({msg: "new task added"});
});

//todo: Make route to delete task
router.delete("/delete/:id", jsonParser, (req, res) => {
    try {
        const taskID = req.params.id;
        Task.destroy({where:{id:taskID}});
        res.send("Deleted the task with the given ID")
    } catch (err) {
        console.error("ERROR: DELETE /delete/:id");
        console.error(err);
        res.status(500).json({
            message: "Error deleting task with given id",
        });
    }
});

module.exports = router;