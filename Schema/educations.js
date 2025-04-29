const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocument schema for individual education entries
const educationEntrySchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    currentStatus: {
        type: String,
        enum: ['Completed', 'In Progress'],
        default: 'In Progress'
    }
}, { _id: false });

// Parent schema with userId and array of educations
const educationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountCreate',
        required: true,
        unique: true
    },
    educations: [educationEntrySchema]
});

module.exports = mongoose.model('Education', educationSchema);
