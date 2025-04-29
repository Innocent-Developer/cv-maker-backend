const Skill = require("../Schema/skill"); // Ensure this is the correct path

const addSkills = async (req, res) => {
  try {
    const { userId, skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "Skills must be a non-empty array." });
    }

    // Check if Skill document already exists for this user
    let existingSkill = await Skill.findOne({ userId });

    if (existingSkill) {
      // Get the list of already existing skill names
      const existingSkillNames = existingSkill.skills.map(skill => skill.skillName.toLowerCase());

      // Filter incoming skills: only add if skillName does NOT already exist
      const newSkills = skills.filter(
        skill => !existingSkillNames.includes(skill.skillName.toLowerCase())
      );

      if (newSkills.length === 0) {
        return res.status(400).json({ message: "All provided skills already exist." });
      }

      // Add new skills
      existingSkill.skills.push(...newSkills);
      await existingSkill.save();

      return res.status(200).json({ message: "Skills updated successfully", data: existingSkill });

    } else {
      // No existing entry, create a new one
      const newSkillEntry = new Skill({
        userId,
        skills,
      });

      await newSkillEntry.save();
      return res.status(201).json({ message: "Skills added successfully", data: newSkillEntry });
    }

  } catch (error) {
    console.error("Error adding/updating skills:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = addSkills;
