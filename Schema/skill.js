const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema({
  skillName: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    required: true,
  },
});

const skillAdds = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccountCreate",
    required: true,
  },
  skills: [skillSchema], // <-- Array of skills
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Skill", skillAdds);
