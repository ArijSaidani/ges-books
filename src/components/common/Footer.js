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
              <span style={{ color: '#8B5B29' }}>Biblio</span>
              <span style={{ color: '#4B3D2D' }}>Tech</span>
            </h5>
            <p className="text-muted">
              Your digital library management system - discover, track, and enjoy books like never before.
            </p>
            <div className="social-links">
              <a href="#" className="me-3 text-dark"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3 text-dark"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-3 text-dark"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-dark"><i className="bi bi-linkedin"></i></a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3" style={{ color: '#4B3D2D' }}>Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/books" className="text-decoration-none" style={{ color: '#A67C4D' }}>Browse Books</Link></li>
              <li className="mb-2"><Link to="/authors" className="text-decoration-none" style={{ color: '#A67C4D' }}>Authors</Link></li>
              <li className="mb-2"><Link to="/genres" className="text-decoration-none" style={{ color: '#A67C4D' }}>Genres</Link></li>
              <li className="mb-2"><Link to="/new-releases" className="text-decoration-none" style={{ color: '#A67C4D' }}>New Releases</Link></li>
              <li className="mb-2"><Link to="/popular" className="text-decoration-none" style={{ color: '#A67C4D' }}>Popular</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3" style={{ color: '#4B3D2D' }}>Community</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/forum" className="text-decoration-none" style={{ color: '#A67C4D' }}>Forum</Link></li>
              <li className="mb-2"><Link to="/reviews" className="text-decoration-none" style={{ color: '#A67C4D' }}>Reviews</Link></li>
              <li className="mb-2"><Link to="/events" className="text-decoration-none" style={{ color: '#A67C4D' }}>Events</Link></li>
              <li className="mb-2"><Link to="/book-clubs" className="text-decoration-none" style={{ color: '#A67C4D' }}>Book Clubs</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3" style={{ color: '#4B3D2D' }}>Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/profile" className="text-decoration-none" style={{ color: '#A67C4D' }}>My Profile</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-decoration-none" style={{ color: '#A67C4D' }}>Dashboard</Link></li>
              <li className="mb-2"><Link to="/books/reading" className="text-decoration-none" style={{ color: '#A67C4D' }}>My Books</Link></li>
              <li className="mb-2"><Link to="/books/wishlist" className="text-decoration-none" style={{ color: '#A67C4D' }}>Wishlist</Link></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: '#4B3D2D' }}>Help</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/support" className="text-decoration-none" style={{ color: '#A67C4D' }}>Support</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-decoration-none" style={{ color: '#A67C4D' }}>FAQ</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none" style={{ color: '#A67C4D' }}>Contact Us</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-decoration-none" style={{ color: '#A67C4D' }}>Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-decoration-none" style={{ color: '#A67C4D' }}>Terms of Service</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr style={{ borderColor: '#D9CBA0' }} />
        
        <div className="text-center" style={{ color: '#A67C4D' }}>
          <small>&copy; {new Date().getFullYear()} BiblioTech. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 