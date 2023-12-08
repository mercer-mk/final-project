const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create Task
router.post("/create", async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const newTask = new Task({
      title: title,
      description: description,
      assignedTo: assignedTo,
    });

    await newTask.save();

    return res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
