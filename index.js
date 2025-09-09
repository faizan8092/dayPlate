const express = require('express');
require('dotenv').config()
const app = require("./src/app"); // Assuming you are importing an Express app from another file
const PORT = process.env.PORT || 3005;
const connectDB = require('./src/config/db')



// Start the server after the middleware setup
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
});



// app.get('/', (req, res) =>{
//     res.send({message:"This is my first server on the expressJS framework, samjha bidu"})
// })

// app.listen(PORT, ()=>{
//     console.log(`You code is running on the port ${PORT}`)
// })


// Temporary in-memory tasks
// let tasks = [];

// app.get("/api/tasks", (req, res) => {
//   res.json(tasks);
// });

// app.post("/api/tasks", (req, res) => {
//   const { title } = req.body;
//   const newTask = { id: Date.now(), title };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// const tasks = []

// app.get("/tasks", (req,res) =>{
//     res.json(tasks)
// })


// app.post("/addTask",(req,res)=>{
//     const {title} = req.body;
//     const newTask = {id:Date.now(), title};
//     tasks.push(newTask);
//     res.status(201).json(newTask)
// })


