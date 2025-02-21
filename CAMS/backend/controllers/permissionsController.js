const Permission = require('../models/Permission');
const QRCode = require('qrcode');

// Get all permissions for a specific mentee
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({ menteeId: req.params.menteeId });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request a new permission (mentee)
const requestPermission = async (req, res) => {
  const { mentorId, menteeId, title, description } = req.body;
  const newPermission = new Permission({
    mentorId,
    menteeId,
    title,
    description,
    status: 'pending',
    date: new Date(),
    qrValid: false, // Set to false initially, generated later
  });

  try {
    const savedPermission = await newPermission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update permission status (mentor) and generate QR code if accepted
const updatePermission = async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json(updatedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Generate QR code for a permission
const generateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    if (permission.status !== 'accepted') {
      return res.status(400).json({ message: 'QR Code can only be generated for accepted permissions' });
    }

    // Generate QR Code
    const qrData = JSON.stringify({
      permissionId: permission._id,
      menteeId: permission.menteeId,
      mentorId: permission.mentorId,
      title: permission.title,
      date: permission.date,
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    // Save QR code and mark as valid
    permission.qrCode = qrCodeUrl;
    permission.qrValid = true;
    await permission.save();

    res.json({ qrCode: qrCodeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate QR Code scan and invalidate after scanning
const scanQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    if (!permission.qrValid) {
      return res.status(400).json({ message: 'QR Code is no longer valid' });
    }

    // Invalidate QR code after scanning
    permission.qrValid = false;
    await permission.save();

    res.json({ message: 'QR Code scanned successfully', permission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPermissions, requestPermission, updatePermission, generateQRCode, scanQRCode };
