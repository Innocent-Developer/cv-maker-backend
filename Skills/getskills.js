const Skill = require("../Schema/skill"); // Ensure this is the correct path

const getSkills = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming you're sending userId in the request body
    
        // Fetch skills for the given userId
        const skillData = await Skill.findOne({ userId });
    
        if (!skillData) {
        return res.status(404).json({ message: "No skills found for this user." });
        }
    
        res.status(200).json({ message: "Skills retrieved successfully", data: skillData });
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
module.exports = getSkills;