const DailyLog = require("../models/meal.model"); // Your daily log + meals model
const Goal = require("../models/goal.model");
const User = require("../models/user.model");

// Get daily log for a user
const getDailyLog = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const date = req.query.date || new Date().toISOString().split("T");

        // Always fetch the current goal
        const goal = await Goal.findOne({ userId });
        
        if (!goal) {
            return res.status(404).json({ message: "Goal not found for this user" });
        }

        // Find existing daily log
        let dailyLog = await DailyLog.findOne({ user: userId, date });

        if (!dailyLog) {
            // Create new daily log with current goal values
            dailyLog = new DailyLog({
                user: userId,
                date,
                caloriesGoal: goal.caloriesGoal,
                proteinGoal: goal.proteinGoalG,
                carbsGoal: goal.carbsGoalG,
                fatGoal: goal.fatGoal,
                waterGoalMl: goal.waterGoalMl,
                meals: [],
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                totalWater: 0
            });
            await dailyLog.save();
        } else {
            // Update existing daily log with current goal values
            dailyLog.caloriesGoal = goal.caloriesGoal;
            dailyLog.proteinGoal = goal.proteinGoalG;
            dailyLog.carbsGoal = goal.carbsGoalG;
            dailyLog.fatGoal = goal.fatGoal;
            dailyLog.waterGoalMl = goal.waterGoalMl;
            await dailyLog.save();
        }

        res.status(200).json(dailyLog);
    } catch (error) {
        next(error);
    }
};


// Add meal to today's log
const addMeal = async (req, res, next) => {
    try {
        const userId = req.user._id;
        
        // Get timezone from request header or default to UTC
        const userTimezone = req.headers['x-timezone'] || 'UTC';
        
        const today = new Date().toISOString().split("T");

        // Check if req.body is an array or single object
        const mealsToAdd = Array.isArray(req.body) ? req.body : [req.body];

    // Find today's log
    let dailyLog = await DailyLog.findOne({ user: userId, date: today });

    if (!dailyLog) {
      // Fetch user's goal if daily log doesn't exist
      const goal = await Goal.findOne({ userId });

      if (!goal) {
        return res.status(404).json({ message: "Goal not found for this user" });
      }

      dailyLog = new DailyLog({
        user: userId,
        date: today,
        caloriesGoal: goal.caloriesGoal,
        proteinGoal: goal.proteinGoalG,
        carbsGoal: goal.carbsGoalG,
        fatGoal: goal.fatGoal,
        waterGoalMl: goal.waterGoalMl,
        meals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalWater: 0
      });
    }

        // Generate current time in user's timezone
        const now = new Date();
        const defaultTime = now.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        // Initialize totals for this operation
        let totalCaloriesAdded = 0;
        let totalProteinAdded = 0;
        let totalCarbsAdded = 0;
        let totalFatAdded = 0;
        let totalWaterAdded = 0;

        // Process each meal in the array
        mealsToAdd.forEach(meal => {
            const { name, time, calories, protein, carbs, fat, water } = meal;
            
            // Add each meal to the beginning of meals array
            dailyLog.meals.unshift({
                name,
                time: time || defaultTime,
                calories: calories || 0,
                protein: protein || 0,
                carbs: carbs || 0,
                fat: fat || 0,
                water: water || 0
            });

            // Accumulate totals
            totalCaloriesAdded += calories || 0;
            totalProteinAdded += protein || 0;
            totalCarbsAdded += carbs || 0;
            totalFatAdded += fat || 0;
            totalWaterAdded += water || 0;
        });

        // Update daily log totals
        dailyLog.totalCalories += totalCaloriesAdded;
        dailyLog.totalProtein += totalProteinAdded;
        dailyLog.totalCarbs += totalCarbsAdded;
        dailyLog.totalFat += totalFatAdded;
        dailyLog.totalWater += totalWaterAdded;

    await dailyLog.save();

    res.status(200).json(dailyLog);
  } catch (error) {
    next(error);
  }
};



module.exports = { getDailyLog, addMeal };
