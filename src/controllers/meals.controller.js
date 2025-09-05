const DailyLog = require("../models/meal.model"); // Your daily log + meals model
const Goal = require("../models/goal.model");
const User = require("../models/user.model");

// Get daily log for a user
const getDailyLog = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const date = req.query.date || new Date().toISOString().split("T")[0];

        // Find existing daily log
        let dailyLog = await DailyLog.findOne({ user: userId, date });

        if (!dailyLog) {
            // Fetch user's goal
            const goal = await Goal.findOne({ userId });

            if (!goal) {
                return res.status(404).json({ message: "Goal not found for this user" });
            }

            // Create a new daily log using goal
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
        const { name, time, calories, protein, carbs, fat, water } = req.body;

        const today = new Date().toISOString().split("T")[0];

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

        // Get current time in HH:MM AM/PM format
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


        // Add the meal
        dailyLog.meals.unshift({
            name,
            time: time || formattedTime,
            calories,
            protein,
            carbs,
            fat,
            water
        });

        // Update totals
        dailyLog.totalCalories += calories;
        dailyLog.totalProtein += protein;
        dailyLog.totalCarbs += carbs;
        dailyLog.totalFat += fat;
        dailyLog.totalWater += water || 0;


        await dailyLog.save();

        res.status(200).json(dailyLog);
    } catch (error) {
        next(error);
    }
};

module.exports = { getDailyLog, addMeal };
