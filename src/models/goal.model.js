
const mongoose = require('mongoose');


const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true
  },
  caloriesGoal: {  // Rename this field
    type: Number,
    required: true,
    default: 2400
  },
  proteinGoalG: {  // Rename this field
    type: Number,
    required: true,
    default: 100
  },
  carbsGoalG: {  // Rename this field
    type: Number,
    required: true,
    default: 500
  },
  fatGoal: {
    type: Number,
    require: true,
    default: 100
  },
  waterGoalMl: {  // Rename this field
    type: Number,
    required: true,
    default: 3000
  },
  effectiveAt: {
    type: Date,
    default: Date.now
  },
},
{timestamps: true});

const Goal = mongoose.model("Goal", goalSchema);
module.exports  = Goal;
