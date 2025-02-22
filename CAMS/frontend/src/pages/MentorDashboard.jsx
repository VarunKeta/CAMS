import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiniLayout from '../components/MiniLayout';
import { fetchMentorById } from '../api';
import { useAuth } from '../AuthContext';
import profilebanner from '../assets/profilebanner.png'

const years = [2020, 2021, 2022, 2023, 2024];

const MentorDashboard = () => {
  const { userId } = useAuth();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleYearClick = (year) => {
    navigate(`/mentees/mentor/${userId}/year/${year}`);
  };

  useEffect(() => {
    const getMentor = async () => {
      try {
        const mentorData = await fetchMentorById(userId);
        setMentor(mentorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentor:', error);
        setLoading(false);
      }
    };

    getMentor();
  }, [userId]);

  if (loading) {
    return (
      <MiniLayout>
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Container>
      </MiniLayout>
    );
  }

  if (!mentor) {
    return (
      <MiniLayout>
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h5" component="div">
            Mentor not found.
          </Typography>
        </Container>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <Container>
        <Card 
          elevation={0}
          style={{
            marginBottom: '2rem',
            borderRadius: '15px',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
            position: 'relative',
            background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
            border: '1px solid #eaeaea'
          }}
        >
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <img
              src={profilebanner}
              alt="Profile Banner"
              style={{ 
                width: '100%', 
                height: '25vh', 
                borderTopLeftRadius: '15px', 
                borderTopRightRadius: '15px',
                objectFit: 'cover'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '12vh',
                right: '3rem',
                border: '5px solid white',
                borderRadius: '50%',
                padding: '5px',
                backgroundColor: 'white',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <img
                src={mentor.photoLink}
                alt={mentor.name}
                style={{ 
                  width: '10rem', 
                  height: '10rem', 
                  borderRadius: '50%', 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
          <CardContent style={{padding: '2rem'}}>
            <Typography 
              variant="h3" 
              component="div" 
              gutterBottom
              style={{
                fontWeight: '600',
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome! {mentor.name}
            </Typography>
            <Grid container spacing={3} style={{marginTop: '1rem'}}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" component="div" style={{margin: '0.5rem 0'}}>
                  <strong style={{color: '#666'}}>Registration Number:</strong> 
                  <span style={{marginLeft: '0.5rem'}}>{mentor.registrationNumber}</span>
                </Typography>
                <Typography variant="body1" component="div" style={{margin: '0.5rem 0'}}>
                  <strong style={{color: '#666'}}>Year:</strong> 
                  <span style={{marginLeft: '0.5rem'}}>{mentor.year}</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" component="div" style={{margin: '0.5rem 0'}}>
                  <strong style={{color: '#666'}}>Email:</strong> 
                  <span style={{marginLeft: '0.5rem'}}>{mentor.email}</span>
                </Typography>
                <Typography variant="body1" component="div" style={{margin: '0.5rem 0'}}>
                  <strong style={{color: '#666'}}>Role:</strong> 
                  <span style={{marginLeft: '0.5rem', textTransform: 'capitalize'}}>{mentor.role}</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Typography 
          variant="h5" 
          style={{
            marginBottom: '1.5rem',
            color: '#444',
            fontWeight: '500'
          }}
        >
          Select Academic Year
        </Typography>

        <Grid container spacing={3}>
          {years.map((year) => (
            <Grid item xs={12} sm={6} md={3} key={year}>
              <Card
                onClick={() => handleYearClick(year)}
                style={{
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
                  border: '1px solid #eaeaea',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
                elevation={0}
              >
                <CardContent>
                  <Typography 
                    variant="h4" 
                    component="div"
                    style={{
                      fontWeight: '600',
                      color: '#2196F3',
                      textAlign: 'center',
                      padding: '1.5rem'
                    }}
                  >
                    {year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MiniLayout>
  );
};

export default MentorDashboard;
