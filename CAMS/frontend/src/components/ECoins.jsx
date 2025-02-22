import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWalletDetails, createRazorpayOrder, verifyPayment } from '../api/wallet';

const ECoins = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const params = useParams();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Fetch initial balance and transactions
    fetchWalletDetails();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchWalletDetails = async () => {
    try {
      const response = await getWalletDetails(params.id);
      setBalance(response.balance);
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error fetching wallet details:', error);
      alert('Failed to fetch wallet details. Please try again.');
    }
  };

  const handleAddMoney = async () => {
    try {
      // Create Razorpay order
      const orderResponse = await createRazorpayOrder(amount * 100); // Convert to paise

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: 'INR',
        name: 'CAMS E-Coins',
        description: 'Add money to E-Coins Wallet',
        order_id: orderResponse.id,
        handler: async function (response) {
          try {
            // Verify payment with backend
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: params.id,
              amount: amount
            });
            
            // Refresh wallet details after successful payment
            await fetchWalletDetails();
            setAmount('');
            alert('Payment successful!');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || 'Student Name',
          email: localStorage.getItem('userEmail') || 'student@example.com',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">E-Coins Wallet</h2>
            
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Current Balance</h5>
                    <h2>₹{balance.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Add Money</h5>
                    <div className="input-group mb-3">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="1"
                      />
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddMoney}
                      disabled={!amount || amount <= 0}
                    >
                      Add Money
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5>Recent Transactions</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>{transaction.description}</td>
                        <td>₹{transaction.amount.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${transaction.type === 'credit' ? 'bg-success' : 'bg-danger'}`}>
                            {transaction.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">No transactions yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ECoins;
