const educationSchema = require("../Schema/educations");

const educationadd = async (req, res) => {
  const {
    userId,
    schoolName,
    degree,
    fieldOfStudy,
    institution,
    startDate,
    endDate,
  } = req.body;

  if (
    !userId ||
    !schoolName ||
    !degree ||
    !institution ||
    !fieldOfStudy ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newEntry = {
    schoolName,
    degree,
    fieldOfStudy,
    institution,
    startDate,
    endDate,
  };

  try {
    const existingUser = await educationSchema.findOne({ userId });

    if (existingUser) {
      existingUser.educations.push(newEntry);
      await existingUser.save();
      res
        .status(200)
        .json({
          message: "Education entry add Success Full.",
          education: existingUser,
        });
    } else {
      const newEducation = await educationSchema.create({
        userId,
        educations: [newEntry],
      });
      res
        .status(201)
        .json({
          message: "Education document created for new user.",
          education: newEducation,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = educationadd;
