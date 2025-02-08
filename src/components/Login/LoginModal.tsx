import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      sessionStorage.setItem('user', JSON.stringify({ email }));
      onLoginSuccess(); // Redirects to /user
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button type="submit" className="w-100 bg-green-500 text-white">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
