const AccountCreate = require("../Schema/accountcreate");

const userinformation = async (req, res) => {
    const { userId } = req.body; // Assuming you're sending userId in the request body

    try {
        // Fetch user information for the given userId
        const userInfo = await AccountCreate.findOne({ _id: userId });

        if (!userInfo) {
            return res.status(404).json({ message: "No user information found for this ID." });
        }

        res.status(200).json({ message: "User information retrieved successfully", data: userInfo });
    } catch (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports = userinformation;