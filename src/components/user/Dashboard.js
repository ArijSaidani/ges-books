import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Table, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    booksRead: 12,
    booksInProgress: 2,
    wishlist: 8,
    recentActivities: [
      { id: 1, action: 'Borrowed', book: 'The Great Gatsby', date: '2023-08-15' },
      { id: 2, action: 'Returned', book: '1984', date: '2023-08-10' },
      { id: 3, action: 'Reviewed', book: 'To Kill a Mockingbird', date: '2023-08-05' },
      { id: 4, action: 'Added to Wishlist', book: 'Dune', date: '2023-08-01' }
    ],
    currentlyReading: [
      { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', progress: 75 },
      { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', progress: 30 }
    ],
    recommendations: [
      { id: 1, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian' },
      { id: 2, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction' },
      { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fantasy' }
    ]
  });

  useEffect(() => {
    // In a real app, fetch user data from API
    // This is a simulation
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Welcome back, {userData.name}!</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold">Books Read</Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">{userData.booksRead}</h1>
                  <p className="text-muted">Total</p>
                </div>
              </div>
              <Button variant="outline-primary" size="sm" as={Link} to="/books/read">
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold">Currently Reading</Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">{userData.booksInProgress}</h1>
                  <p className="text-muted">In Progress</p>
                </div>
              </div>
              <Button variant="outline-primary" size="sm" as={Link} to="/books/current">
                View Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold">Wishlist</Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">{userData.wishlist}</h1>
                  <p className="text-muted">Saved Books</p>
                </div>
              </div>
              <Button variant="outline-primary" size="sm" as={Link} to="/books/wishlist">
                View Wishlist
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Currently Reading</Card.Title>
              {userData.currentlyReading.map(book => (
                <div key={book.id} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0">{book.title}</h6>
                    <small>{book.progress}%</small>
                  </div>
                  <ProgressBar 
                    now={book.progress} 
                    variant={book.progress > 50 ? "success" : "primary"} 
                    className="mb-1" 
                  />
                  <small className="text-muted">By {book.author}</small>
                </div>
              ))}
              <div className="mt-3">
                <Button variant="primary" size="sm" as={Link} to="/books/current">
                  Update Progress
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Recommended For You</Card.Title>
              <div className="recommendation-list">
                {userData.recommendations.map(book => (
                  <div key={book.id} className="mb-3 d-flex align-items-start">
                    <div className="recommendation-book-icon me-2">
                      <i className="bi bi-book"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">{book.title}</h6>
                      <small className="text-muted d-block">{book.author}</small>
                      <Badge bg="secondary" className="mt-1">{book.genre}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button variant="outline-primary" size="sm" as={Link} to="/books/recommendations">
                  See More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Recent Activity</Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Book</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.recentActivities.map(activity => (
                    <tr key={activity.id}>
                      <td>{activity.action}</td>
                      <td>{activity.book}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-center mt-3">
                <Button variant="outline-primary" size="sm" as={Link} to="/activities">
                  View All Activities
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 