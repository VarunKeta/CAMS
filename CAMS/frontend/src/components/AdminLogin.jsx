import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Header from '../landing page/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <Header />
      <div className="login-background min-vh-100 d-flex align-items-center">
        <Container className="login-container p-4 rounded-4 shadow-lg">
          <Row className="justify-content-center">
            <Col className="text-center mb-4">
              <img 
                src="https://i.imgur.com/FkLkjAy.png" 
                alt="Logo" 
                className="logo mb-3"
                style={{ width: '120px', height: 'auto' }}
              />
              <h1 className="h2 fw-bold text-white mb-2">VNR VJIET</h1>
              <h3 className="h4 fw-light text-white fst-italic">CampusConnect</h3>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="bg-white bg-opacity-10 p-4 rounded-3 backdrop-blur">
                <h4 className="mb-4 fw-bold text-center text-white">Admin Portal</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="text-white fw-semibold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="form-control-lg border-0"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label className="text-white fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control-lg border-0"
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 btn-lg mb-3"
                    style={{
                      background: 'linear-gradient(to right, #4776E6, #8E54E9)',
                      border: 'none'
                    }}
                  >
                    Sign In
                  </Button>
                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
                  <Row className="mt-4">
                    <Col className="text-center">
                      <a href="/" className="text-white text-decoration-none hover-underline">
                        Back to Home
                      </a>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminLogin;
