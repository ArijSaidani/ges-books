import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Generate initials from user name
  const getInitials = () => {
    if (!currentUser) return 'U';
    
    const firstInitial = currentUser.firstName ? currentUser.firstName.charAt(0) : '';
    const lastInitial = currentUser.lastName ? currentUser.lastName.charAt(0) : '';
    
    return (firstInitial + lastInitial).toUpperCase();
  };
  
  // Get user full name
  const getUserName = () => {
    if (!currentUser) return 'User';
    
    return `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
  };
  
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span style={{ color: '#8B5B29' }}>Biblio</span>
          <span style={{ color: '#4B3D2D' }}>Tech</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/books">Browse Books</Nav.Link>
            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
            <Nav.Link as={Link} to="/forum">Forum</Nav.Link>
          </Nav>
          
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <Nav.Link as={Link} to="/dashboard" className="me-2">Dashboard</Nav.Link>
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                       style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                    {getInitials()}
                  </div>
                  <span className="d-none d-md-inline">{getUserName()}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/books/reading">My Books</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Button as={Link} to="/login" variant="outline-primary" className="me-2">Log In</Button>
              <Button as={Link} to="/signup" variant="primary">Sign Up</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 