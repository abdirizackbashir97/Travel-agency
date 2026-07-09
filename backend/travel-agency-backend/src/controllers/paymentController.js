const mpesaService = require('../services/mpesaService');
const Transaction = require('../models/Transaction');

exports.initiatePayment = async (req, res) => {
  try {
    const { phoneNumber, amount, bookingDetails } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and amount are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const accountReference = `BOOK-${Date.now()}`;
    const result = await mpesaService.initiatePayment(
      phoneNumber,
      amount,
      accountReference,
      bookingDetails || {}
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to initiate payment'
    });
  }
};

exports.queryPaymentStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;
    
    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        message: 'Checkout request ID is required'
      });
    }

    const result = await mpesaService.queryStatus(checkoutRequestId);
    
    res.status(200).json({
      success: true,
      status: result.ResultCode === '0' ? 'completed' : 'failed',
      data: result
    });
  } catch (error) {
    console.error('Status query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to query payment status'
    });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const result = await mpesaService.handleCallback(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Callback handling error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process callback'
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      transactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history'
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction'
    });
  }
};
