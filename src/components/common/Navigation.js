import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Générer les initiales à partir du nom d'utilisateur
  const getInitials = () => {
    if (!currentUser) return 'U';
    
    const firstInitial = currentUser.firstName ? currentUser.firstName.charAt(0) : '';
    const lastInitial = currentUser.lastName ? currentUser.lastName.charAt(0) : '';
    
    return (firstInitial + lastInitial).toUpperCase();
  };
  
  // Obtenir le nom complet de l'utilisateur
  const getUserName = () => {
    if (!currentUser) return 'Utilisateur';
    
    return `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
  };
  
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo BiblioTech"
            className="navbar-logo me-2"
            width="40"
            height="40"
          />
          <span className="brand-text">BiblioTech</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/books">Livres</Nav.Link>
            <Nav.Link as={Link} to="/authors">Auteurs</Nav.Link>
            <Nav.Link as={Link} to="/forum">Forum</Nav.Link>
          </Nav>
          
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <Nav.Link as={Link} to="/dashboard" className="me-2">Dashboard</Nav.Link>
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                  <Image
                    src="/profile_img.jpg"
                    alt="Profil"
                    roundedCircle
                    className="nav-profile-img me-2"
                    width="32"
                    height="32"
                  />
                  <span className="d-none d-md-inline">{getUserName()}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Mon profil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Button as={Link} to="/login" variant="outline-primary" className="me-2">Connexion</Button>
              <Button as={Link} to="/signup" variant="primary">Inscription</Button>
            </div>
          )}

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;