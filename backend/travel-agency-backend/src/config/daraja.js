const axios = require('axios');
require('dotenv').config();

class DarajaConfig {
  constructor() {
    this.consumerKey = process.env.CONSUMER_KEY;
    this.consumerSecret = process.env.CONSUMER_SECRET;
    this.passkey = process.env.PASSKEY;
    this.shortcode = process.env.SHORTCODE;
    this.baseURL = process.env.BASE_URL;
  }

  async getAccessToken() {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    
    try {
      const response = await axios.get(
        `${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`
          }
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  generatePassword() {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(
      `${this.shortcode}${this.passkey}${timestamp}`
    ).toString('base64');
    return { password, timestamp };
  }
}

module.exports = new DarajaConfig();
