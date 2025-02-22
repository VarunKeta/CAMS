import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getWalletDetails = async (userId) => {
  const response = await axios.get(`${BASE_URL}/wallet/${userId}`);
  return response.data;
};

export const createRazorpayOrder = async (amount) => {
  const response = await axios.post(`${BASE_URL}/wallet/create-order`, { amount });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await axios.post(`${BASE_URL}/wallet/verify-payment`, paymentData);
  return response.data;
}; 