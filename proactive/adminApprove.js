const AccountCreate = require("../Schema/accountcreate");

const approvePlan = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await AccountCreate.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.planStatus = 'active';
        user.planStartDate = new Date();

        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
        user.planEndDate = oneMonthLater;

        await user.save();

        res.status(200).json({ message: 'Plan activated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to activate plan', error: error.message });
    }
};

module.exports = approvePlan;