import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">
              <span>BiblioTech</span>
            </h5>
            <p className="text-muted">
              Votre bibliothèque numérique. Découvrez, suivez et profitez des livres comme jamais auparavant.
            </p>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Explorer</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/books" className="text-decoration-none text-muted">Parcourir les livres</Link></li>
              <li className="mb-2"><Link to="/authors" className="text-decoration-none text-muted">Auteurs</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Communauté</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/forum" className="text-decoration-none text-muted">Forum</Link></li>
              <li className="mb-2"><Link to="/reviews" className="text-decoration-none text-muted">Avis</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Compte</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/profile" className="text-decoration-none text-muted">Mon profil</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-decoration-none text-muted">Dashboard</Link></li>
              <li className="mb-2"><Link to="/books/wishlist" className="text-decoration-none text-muted">Wishlist</Link></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Aide</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/support" className="text-decoration-none text-muted">Réclamations</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr />
        
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} BiblioTech. Tous droits réservés.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;