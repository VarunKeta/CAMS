import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { updatePermissionStatus, getQRCode } from '../api';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import './PermissionsList.css';

const PermissionsList = ({ permissions, onStatusChange }) => {
  const { userRole } = useAuth();
  const [qrCode, setQrCode] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const handleStatusChange = async (id, status) => {
    try {
      const updatedPermission = await updatePermissionStatus(id, status);
      onStatusChange(updatedPermission);
    } catch (error) {
      console.error('Error updating permission status:', error);
    }
  };

  const handleShowQRCode = async (id) => {
    try {
      const qr = await getQRCode(id);
      setQrCode(qr);
      setQrDialogOpen(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleScanQRCode = () => {
    setQrDialogOpen(false);
    setQrCode(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-success';
      case 'rejected':
        return 'text-danger';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-dark';
    }
  };

  return (
    <div>
      <div className="row">
        {permissions.map((permission) => (
          <div
            className="col-12 col-sm-6 col-md-4 mb-3"
            key={permission._id}
            onClick={() => permission.status === 'accepted' && handleShowQRCode(permission._id)}
            style={{ cursor: permission.status === 'accepted' ? 'pointer' : 'default' }}
          >
            <div className="card permission-card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbz8S46qH4I4g7PacDGHeZuKICCu7zk3zlA&s"
                    alt="Avatar"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h5 className="card-title mb-0">{permission.title}</h5>
                    <small className="text-muted">{permission.username}</small>
                  </div>
                </div>
                <p className="card-text flex-grow-1">{permission.description}</p>
                <p className="card-text text-muted">
                  Date: {new Date(permission.date).toLocaleString()}
                </p>
                <p className={`card-text font-weight-bold ${getStatusColor(permission.status)}`}>
                  Status: {permission.status.charAt(0).toUpperCase() + permission.status.slice(1)}
                </p>
                {userRole === 'mentor' && permission.status === 'pending' && (
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatusChange(permission._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStatusChange(permission._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onClose={handleScanQRCode}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {qrCode ? (
            <img src={qrCode} alt="QR Code" style={{ width: '100%' }} onClick={handleScanQRCode} />
          ) : (
            <p>Generating QR Code...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsList;
