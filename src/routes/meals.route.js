
const router = require("express").Router();

const { getDailyLog, addMeal } = require("../controllers/meals.controller");

const auth = require('../middlewares/auth');

router.use(auth);
router.get("/", getDailyLog);
router.post("/", addMeal);


module.exports = router;
