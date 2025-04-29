const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a sub-schema for each experience
const experienceSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountCreate',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    WorkingDoaimn: {
        type: String,
        required: true
    },
    explaination: {
        type: String
    },
    yearofExperience: {
        type: Number,
        required: true
    },
    startYear: {
        type: Date,
        required: true
    },
    endYear: {
        type: Date,
        required: true
    }
});

// Main Working Expression schema
const workingExpressionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountCreate',
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    experiences: [experienceSchema] // <-- experiences array
});

module.exports = mongoose.model('WorkingExpression', workingExpressionSchema);
