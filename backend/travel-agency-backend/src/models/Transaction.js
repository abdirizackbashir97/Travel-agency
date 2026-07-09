const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  merchantRequestId: {
    type: String,
    required: true
  },
  checkoutRequestId: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  accountReference: {
    type: String,
    required: true
  },
  bookingDetails: {
    hotelName: String,
    roomType: String,
    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
    bookingId: String,
    customerName: String,
    customerEmail: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  resultCode: String,
  resultDesc: String,
  receiptNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

transactionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
