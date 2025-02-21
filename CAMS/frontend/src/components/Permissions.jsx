import React, { useState, useEffect } from 'react';
import { Button, Container, CircularProgress, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Layout from '../components/Layout';
import PermissionForm from './PermissionForm';
import PermissionsList from './PermissionsList';
import { getPermissionsByMentor, getQRCode, scanQRCode } from '../api';
import { useAuth } from '../AuthContext';
import { useMentee } from '../MenteeContext';
import { useParams } from 'react-router-dom';

const Permissions = () => {
  const params = useParams();
  const { userRole } = useAuth();
  const { menteeId } = useMentee();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const fetchedPermissions = await getPermissionsByMentor(params.id);
        setPermissions(fetchedPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [params.id]);

  const handlePermissionAdded = (newPermission) => {
    setPermissions([...permissions, newPermission]);
  };

  const handleStatusChange = async (updatedPermission) => {
    setPermissions(permissions.map((perm) => (perm._id === updatedPermission._id ? updatedPermission : perm)));
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

  const handleScanQRCode = async () => {
    if (qrCode) {
      try {
        await scanQRCode(qrCode);
        setQrCode(null);
        setQrDialogOpen(false);
      } catch (error) {
        console.error('Error scanning QR code:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Permission Requests
        </Typography>
        {userRole === 'mentee' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            style={{ marginBottom: '1.5rem' }}
          >
            Request Permission
          </Button>
        )}
        <PermissionForm open={openModal} onClose={() => setOpenModal(false)} onPermissionAdded={handlePermissionAdded} />
        <PermissionsList permissions={permissions} onStatusChange={handleStatusChange} onShowQRCode={handleShowQRCode} />

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onClose={handleScanQRCode}>
          <DialogTitle>QR Code</DialogTitle>
          <DialogContent>
            {qrCode ? (
              <img src={qrCode} alt="QR Code" style={{ width: '100%' }} onClick={handleScanQRCode} />
            ) : (
              <Typography>Generating QR Code...</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Permissions;
