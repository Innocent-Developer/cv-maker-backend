const workingExpressionSchema = require('../Schema/workingExpriession');

const getworkingexpression = async (req, res) => {
    const { userId } = req.body; // Assuming you're sending userId in the request body

    try {
        // Fetch working expression for the given userId
        const workingExpression = await workingExpressionSchema.findOne({ userId });

        if (!workingExpression) {
            return res.status(404).json({ message: "No working expression found for this user." });
        }

        res.status(200).json({ message: "Working expression retrieved successfully", data: workingExpression });
    } catch (error) {
        console.error("Error fetching working expression:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = getworkingexpression;