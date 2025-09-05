
// src/controllers/task.controller.js
const Task = require("../models/task.model");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({user:req.user._id});
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    console.log(req.user)
    const task = await Task.create({ title, completed, user: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};




//  //const store = require("../data/store")
// const task = require('../config/db')

// const getAllTasks = async (req, res) =>{
//   try {
//     const task = await task.find()
//     res.status(200).json(task)
//   } catch (error) {
    
//   }

// }


// const getTask = (req, res) => {
//   const task = store.tasks.find(t => String(t.id) === req.params.id);
//   if (!task) return res.status(404).json({ error: "Task not found" });
//   res.json(task);
// };



// // const createTask = (req, res) => {
// //     const {title, completed = false} = req.body
// //     const task = {id: Date.now(), title: title.trim(), completed}
// //     store.tasks.push(task)
// //     res.status(201).json(task)
// // }

// const createTask = async (req, res, next) => {
//   try {
//     const { title, completed } = req.body;
//     const task = await Task.create({ title, completed });
//     res.status(201).json(task);
//   } catch (err) {
//     next(err);
//   }
// };


// const updateTask = (req, res) => {
//   // Find the index of the task in store.tasks that matches the ID from the request URL.
//   // - store.tasks is an array of task objects.
//   // - Each task has an id property (stored as a number).
//   // - req.params.id comes from the route parameter (always a string).
//   // - String(t.id) === req.params.id ensures comparison works even if types differ.
//   const idx = store.tasks.findIndex(t => String(t.id) === req.params.id);

//   // If findIndex() doesn’t find any match, it returns -1.
//   // That means no task exists with this ID.
//   // So we return an HTTP 404 status with a JSON error message.
//   if (idx === -1) return res.status(404).json({ error: "Task not found" });


//   const { title, completed } = req.body;

//   // If "title" is present in the request body, update the task's title.
//   // - title.trim() removes leading/trailing spaces to clean the input.
//   // - Only update if title !== undefined to avoid overwriting with nothing.
//   if (title !== undefined) store.tasks[idx].title = title.trim();

//   // If "completed" is present in the request body, update the task's completed flag.
//   // - This could be true or false.
//   // - Only update if completed !== undefined to avoid accidentally clearing it.
//   if (completed !== undefined) store.tasks[idx].completed = completed;

//   // Finally, send back the updated task as a JSON response.
//   // - store.tasks[idx] is the modified task object.
//   // - This lets the client immediately see the new updated state.
//   res.json(store.tasks[idx]);
// };


// const deleteTask = (req, res) => {
//   const idx = store.tasks.findIndex(t => String(t.id) === req.params.id);
//   if (idx === -1) return res.status(404).json({ error: "Task not found" });
//   const [removed] = store.tasks.splice(idx, 1);
//   res.json(removed);
// };


// module.exports = {
//  getAllTasks, getTask,deleteTask, createTask, updateTask
// }
