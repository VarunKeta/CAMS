const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  menteeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true 
  },
  mentorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  date: { type: Date, required: true },
  qrCode: { type: String },  // Stores the QR code data
  qrValid: { type: Boolean, default: true } // Indicates if the QR code is valid or scanned
});

module.exports = mongoose.model('Permission', permissionSchema);
