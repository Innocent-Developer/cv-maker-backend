const educationSchema = require("../Schema/educations");


const geteducations = async (req, res) => {
    
  const { userId } = req.body; // Assuming you're sending userId in the request body

  try {
    // Fetch education for the given userId
    const education = await educationSchema.findOne({ userId });
    if (!education) {
        return res.status(404).json({ message: "No education found for this user." });
        }
    res.status(200).json({ message: "Education retrieved successfully", data: education });
  } catch (error) {
    
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
module.exports = geteducations;