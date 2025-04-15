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
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/books" className="text-decoration-none text-muted">Browse Books</Link></li>
              <li className="mb-2"><Link to="/authors" className="text-decoration-none text-muted">Authors</Link></li>
              <li className="mb-2"><Link to="/genres" className="text-decoration-none text-muted">Genres</Link></li>
              <li className="mb-2"><Link to="/new-releases" className="text-decoration-none text-muted">New Releases</Link></li>
              <li className="mb-2"><Link to="/popular" className="text-decoration-none text-muted">Popular</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Community</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/forum" className="text-decoration-none text-muted">Forum</Link></li>
              <li className="mb-2"><Link to="/reviews" className="text-decoration-none text-muted">Reviews</Link></li>
              <li className="mb-2"><Link to="/events" className="text-decoration-none text-muted">Events</Link></li>
              <li className="mb-2"><Link to="/book-clubs" className="text-decoration-none text-muted">Book Clubs</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/profile" className="text-decoration-none text-muted">My Profile</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-decoration-none text-muted">Dashboard</Link></li>
              <li className="mb-2"><Link to="/books/reading" className="text-decoration-none text-muted">My Books</Link></li>
              <li className="mb-2"><Link to="/books/wishlist" className="text-decoration-none text-muted">Wishlist</Link></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Help</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/support" className="text-decoration-none text-muted">Support</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-decoration-none text-muted">FAQ</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none text-muted">Contact Us</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-decoration-none text-muted">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-decoration-none text-muted">Terms of Service</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr />
        
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} BiblioTech. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 