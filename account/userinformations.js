const AccountCreate = require("../Schema/accountcreate");

const userinformation = async (req, res) => {
  const { userId } = req.body; // Should directly be in the body

  if (!userId) {
    return res.status(400).json({ message: "Missing userId in request body." });
  }

  try {
    const userInfo = await AccountCreate.findById(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "No user information found for this ID." });
    }

    res.status(200).json({
      message: "User information retrieved successfully",
      data: userInfo,
    });
  } catch (error) {
    console.error("Error fetching user information:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = userinformation;
