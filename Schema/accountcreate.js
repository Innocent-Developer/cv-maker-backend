const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountCreateSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^[a-zA-Z0-9._-]+$/.test(v),
            message: props => `${props.value} is not a valid username!`
        }
    },
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    tital:{
        type: String,
        // enum:['Web Developer','App Developer','Data Scientist','AI Engineer','ML Engineer','Cloud Engineer','Cyber Security Expert','DevOps Engineer'],
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    dataandtime: {
        type: Date,
        default: Date.now
    },
    plan: {
        type: String,
        enum: ['free', 'basic', 'premium', 'enterprise'],
        default: 'free'
    },
    planStatus: {
        type: String,
        enum: ['active', 'canceled', 'pending'],
        default: 'pending'
    },
    planStartDate: {
        type: Date
    },
    planEndDate: {
        type: Date
    },

});


const AccountCreate = mongoose.model('AccountCreate', accountCreateSchema);
module.exports = AccountCreate;
