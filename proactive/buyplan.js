const AccountCreate = require('../Schema/accountcreate');

const submitPlanRequest = async (req, res) => {
    const { userId, plan, paymentProofUrl } = req.body;

    if (!userId || !plan || !paymentProofUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await AccountCreate.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.plan = plan;
        user.planStatus = 'pending';
        user.paymentProofUrl = paymentProofUrl;
        user.paymentSubmittedAt = new Date();

        await user.save();

        res.status(200).json({ message: 'Plan request submitted. Awaiting approval.', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit plan request', error: error.message });
    }
};

module.exports = submitPlanRequest;
