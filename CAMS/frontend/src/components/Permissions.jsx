import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Container, 
  CircularProgress, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Box,
  Alert,
  Fade
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
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
  const [qrExpired, setQrExpired] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

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
      setQrExpired(false);
      setScanSuccess(false);
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
        setScanSuccess(true);
        setQrExpired(true);
        setTimeout(() => {
          setQrDialogOpen(false);
          setQrCode(null);
          setScanSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Error scanning QR code:', error);
        setQrExpired(true);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#1a237e',
              mb: 3
            }}
          >
            Permission Requests
          </Typography>
          
          {userRole === 'mentee' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
              sx={{
                mb: 4,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
              startIcon={<QrCodeIcon />}
            >
              Request Permission
            </Button>
          )}

          <PermissionForm 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            onPermissionAdded={handlePermissionAdded} 
          />
          
          <PermissionsList 
            permissions={permissions} 
            onStatusChange={handleStatusChange} 
            onShowQRCode={handleShowQRCode} 
          />

          {/* Enhanced QR Code Dialog */}
          <Dialog 
            open={qrDialogOpen} 
            onClose={() => !scanSuccess && setQrDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }
            }}
          >
            <DialogTitle sx={{ 
              textAlign: 'center', 
              bgcolor: 'primary.main', 
              color: 'white',
              py: 3,
              fontSize: '1.5rem',
              fontWeight: 600,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                backgroundColor: '#fff',
                borderRadius: '2px'
              }
            }}>
              Scan QR Code to Verify
            </DialogTitle>
            <DialogContent sx={{ p: 4, bgcolor: '#f8f9fa' }}>
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                gap={3}
                sx={{ py: 2 }}
              >
                {qrExpired ? (
                  <Fade in={true}>
                    <Alert 
                      severity={scanSuccess ? "success" : "error"}
                      sx={{ 
                        width: '100%', 
                        mb: 2,
                        '& .MuiAlert-message': {
                          fontSize: '1.1rem'
                        }
                      }}
                    >
                      {scanSuccess ? "QR Code successfully scanned!" : "This QR Code has expired"}
                    </Alert>
                  </Fade>
                ) : qrCode ? (
                  <>
                    <Box
                      sx={{
                        p: 4,
                        border: '3px solid #e0e0e0',
                        borderRadius: 4,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: '#fff',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                          borderColor: 'primary.main'
                        }
                      }}
                      onClick={handleScanQRCode}
                    >
                      <img 
                        src={qrCode} 
                        alt="QR Code" 
                        style={{ 
                          width: '100%',
                          maxWidth: '280px',
                          height: 'auto',
                          display: 'block'
                        }} 
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        bgcolor: '#e3f2fd',
                        py: 2,
                        px: 3,
                        borderRadius: 2
                      }}
                    >
                      <QrCodeIcon color="primary" />
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          fontWeight: 500,
                          color: 'primary.main'
                        }}
                      >
                        Click on the QR code to scan and verify
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <CircularProgress size={60} thickness={4} />
                )}
              </Box>
            </DialogContent>
            <DialogActions 
              sx={{ 
                p: 3, 
                justifyContent: 'center',
                bgcolor: '#f8f9fa',
                borderTop: '1px solid #e0e0e0'
              }}
            >
              <Button 
                onClick={() => setQrDialogOpen(false)}
                variant="contained"
                sx={{ 
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Layout>
  );
};

export default Permissions;
