const express = require('express');
const router = express.Router();
const { 
  getPermissions, 
  requestPermission, 
  updatePermission, 
  generateQRCode,
  scanQRCode
} = require('../controllers/permissionsController');

// Get all permissions for a specific mentee
router.get('/:menteeId', getPermissions);

// Request a new permission (mentee)
router.post('/', requestPermission);

// Update permission status (mentor) & generate QR if accepted
router.put('/:id', updatePermission);

// Generate a QR code for an accepted permission
router.get('/generate-qr/:id', generateQRCode);

// Scan and invalidate QR code after use
router.post('/scan/:id', scanQRCode);

module.exports = router;
