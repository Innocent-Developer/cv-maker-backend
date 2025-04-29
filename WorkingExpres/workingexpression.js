const workingExpressionSchema = require('../Schema/workingExpriession');

const addworkingexpression = async (req, res) => {
    const { userId, userEmail, companyName, companyAddress, WorkingDoaimn, yearofExperience, startYear, endYear } = req.body;

    try {
        const existingRecord = await workingExpressionSchema.findOne({ userId });

        // Create new experience WITH userId
        const newExperience = {
            userId, // very important
            companyName,
            companyAddress,
            WorkingDoaimn,
            yearofExperience,
            startYear,
            endYear
        };

        if (existingRecord) {
            // Add new experience into existing array
            existingRecord.experiences.push(newExperience);
            await existingRecord.save();

            res.status(200).json({ message: "Working experience updated successfully", data: existingRecord });
        } else {
            // CREATE a new document correctly with experiences array
            const newWorkingExpression = new workingExpressionSchema({
                userId,
                userEmail,
                experiences: [newExperience] // ⬅️ Important: wrap inside array!
            });

            await newWorkingExpression.save();

            res.status(201).json({ message: "Working experience added successfully", data: newWorkingExpression });
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding working experience", error: error.message });
    }
};

module.exports = addworkingexpression;
