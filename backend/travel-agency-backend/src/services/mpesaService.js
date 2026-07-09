const axios = require('axios');
const darajaConfig = require('../config/daraja');
const Transaction = require('../models/Transaction');
require('dotenv').config();

class MpesaService {
  async initiatePayment(phoneNumber, amount, accountReference, bookingDetails) {
    try {
      const formattedPhone = this.formatPhoneNumber(phoneNumber);
      const token = await darajaConfig.getAccessToken();
      const { password, timestamp } = darajaConfig.generatePassword();

      const requestData = {
        BusinessShortCode: darajaConfig.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: darajaConfig.shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: accountReference || 'TravelBooking',
        TransactionDesc: `Booking payment for ${bookingDetails.hotelName || 'Travel Agency'}`
      };

      const response = await axios.post(
        `${darajaConfig.baseURL}/mpesa/stkpush/v1/processrequest`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const transaction = new Transaction({
        merchantRequestId: response.data.MerchantRequestID,
        checkoutRequestId: response.data.CheckoutRequestID,
        phoneNumber: formattedPhone,
        amount,
        accountReference: requestData.AccountReference,
        bookingDetails,
        status: 'pending'
      });
      await transaction.save();

      return {
        success: true,
        message: 'Payment initiated. Enter your M-Pesa PIN to complete.',
        checkoutRequestId: response.data.CheckoutRequestID,
        transaction
      };
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw {
        success: false,
        message: 'Failed to initiate payment. Please try again.',
        error: error.response?.data || error.message
      };
    }
  }

  formatPhoneNumber(phone) {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    } else if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned;
    }
    return cleaned;
  }

  async queryStatus(checkoutRequestId) {
    try {
      const token = await darajaConfig.getAccessToken();
      const { password, timestamp } = darajaConfig.generatePassword();

      const requestData = {
        BusinessShortCode: darajaConfig.shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      const response = await axios.post(
        `${darajaConfig.baseURL}/mpesa/stkpushquery/v1/query`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      await Transaction.findOneAndUpdate(
        { checkoutRequestId },
        { 
          status: response.data.ResultCode === '0' ? 'completed' : 'failed',
          resultCode: response.data.ResultCode,
          resultDesc: response.data.ResultDesc
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error querying status:', error);
      throw error;
    }
  }

  async handleCallback(callbackData) {
    try {
      const { Body: body } = callbackData;
      const { stkCallback } = body;

      const transaction = await Transaction.findOne({
        checkoutRequestId: stkCallback.CheckoutRequestID
      });

      if (!transaction) {
        return { success: false, message: 'Transaction not found' };
      }

      transaction.status = stkCallback.ResultCode === '0' ? 'completed' : 'failed';
      transaction.resultCode = stkCallback.ResultCode;
      transaction.resultDesc = stkCallback.ResultDesc;
      
      if (stkCallback.ResultCode === '0') {
        const callbackMetadata = stkCallback.CallbackMetadata.Item;
        const receiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber');
        if (receiptNumber) {
          transaction.receiptNumber = receiptNumber.Value;
        }
      }

      await transaction.save();

      return {
        success: true,
        message: 'Callback processed successfully',
        transaction
      };
    } catch (error) {
      console.error('Error handling callback:', error);
      throw error;
    }
  }
}

module.exports = new MpesaService();
