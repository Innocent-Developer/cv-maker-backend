const mongoose = require('mongoose');
const { Schema } = mongoose;

const pyementHistorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountCreate',
        required: true
    },
    plan: {
        type: String,
        enum: ['free', 'basic', 'premium', 'enterprise'],
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['creditcard','mastercard', 'jazzcash','easypaisa','crypto','binance', 'banktransfer'],
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model('PaymentHistory', pyementHistorySchema);