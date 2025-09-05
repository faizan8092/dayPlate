

const router = require("express").Router();

const {getAllTasks, getTask, createTask, updateTask, deleteTask } = require("../controllers/tasks.controller")

const validateTask = require("../middlewares/validate")
const auth = require("../middlewares/auth")


router.use(auth)
router.get("/", getAllTasks);                // GET /api/tasks
router.get("/:id", getTask);               // GET /api/tasks/:id
router.post("/", validateTask, createTask);// POST /api/tasks
router.put("/:id", validateTask, updateTask); // PUT /api/tasks/:id
router.delete("/:id", deleteTask);         // DELETE /api/tasks/:id

// 🔹 Here you control protection per route.
// 👉 Only routes with auth will require a token.
// router.get("/", auth, listTasks);
// router.post("/", auth, validateTask, createTask);


module.exports = router;