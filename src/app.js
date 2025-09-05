// src/app.js
const express = require("express");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes")
const goalsRoutes = require("./routes/goals.route")
const mealRoutes = require('./routes/meals.route')
const cors = require('cors');



const app = express();
app.use(logger);
app.use(express.json());
// app.use('/',(req,res)=>{
//     res.status(200).send({data:'Hello i am live'})
// })
app.use(cors())

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/meals", mealRoutes);

app.get("/", (_req, res) => res.send("Task Manager API v2"));
app.use(errorHandler); // must be last



module.exports = app;
