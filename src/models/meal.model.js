const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g., "07:00 AM"
  name: { type: String, required: true }, // e.g., "Honey"
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  water: { type: Number, default: 0 } // add water in ml

});

const dailyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // store as YYYY-MM-DD
  caloriesGoal: { type: Number, required: true },
  proteinGoal: { type: Number, required: true },
  carbsGoal: { type: Number, required: true },
  fatGoal: { type: Number, required: true },
  waterGoalMl: { type: Number, required: true },
  meals: [mealSchema],
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFat: { type: Number, default: 0 },
  totalWater: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("DailyLog", dailyLogSchema);
