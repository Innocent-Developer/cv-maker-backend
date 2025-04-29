const bcrypt = require('bcryptjs');
const AccountCreate = require('../Schema/accountcreate');

const signup = async (req, res) => {
    const { userName, First_Name, Last_Name, Email, password } = req.body;

    // Validate required fields
    if (!userName || !First_Name || !Last_Name || !Email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await AccountCreate.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the account
        const account = await AccountCreate.create({
            userName,
            First_Name,
            Last_Name,
            Email,
            password: hashedPassword // Store hashed password
        });

        res.status(201).json({ message: 'Account created successfully.', account });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = signup;
