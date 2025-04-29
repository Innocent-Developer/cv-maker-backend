const pyementHistorySchema = require("../Schema/payementhistroy");

const getpayementHistory = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming you're sending userId in the request body
    
        // Fetch payment history for the given userId
        const paymentHistory = await pyementHistorySchema.find({ userId });
    
        if (!paymentHistory || paymentHistory.length === 0) {
        return res.status(404).json({ message: "No payment history found for this user." });
        }
    
        res.status(200).json({ message: "Payment history retrieved successfully", data: paymentHistory });
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = getpayementHistory;