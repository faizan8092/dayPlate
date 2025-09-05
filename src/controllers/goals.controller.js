const Goal = require("../models/goal.model");
const User = require("../models/user.model");

// Controller to create or update the goal for the user
const createGoal = async (req, res) => {
  const userId = req.user._id; // Get the userId from the auth middleware
  const { caloriesGoal, proteinGoalG, carbsGoalG, fatGoalG, waterGoalMl } = req.body; 
  try {
    // Find the goal by userId and update it, or create a new one if not found
    const goal = await Goal.findOneAndUpdate(
      { userId: userId }, // Query to find the existing goal by userId
      { 
        caloriesGoal,
        proteinGoalG,
        carbsGoalG,
        fatGoalG,
        waterGoalMl,
        effectiveAt: Date.now() // Update the effectiveAt field
      },
      { 
        new: true, // Return the updated document
        upsert: true // If not found, create a new document
      });

    res.status(200).json(goal);  // Return the updated/created goal
  } catch (error) {
    res.status(500).json({ message: "Error creating/updating goal", error });
  }
};



// Controller to get the active goal for the user
// Controller to get the active goal for the user
const getGoal = async (req, res) => {
  const userId = req.user._id; // Get the userId from the auth middleware

  try {
    // Retrieve the most recent goal for the user using the correct field name (`userId`)
    const goal = await Goal.findOne({ userId: userId }).sort({ effectiveAt: -1 });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving goal", error });
  }
};


module.exports = { createGoal, getGoal };
