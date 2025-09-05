
const router = require("express").Router();

const {createGoal, getGoal} = require("../controllers/goals.controller");

const auth = require('../middlewares/auth');

router.use(auth);
router.post("/", createGoal);
router.get("/", getGoal);


module.exports = router;



