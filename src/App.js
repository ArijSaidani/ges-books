import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Common Components
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// User Components
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import Profile from './components/user/Profile';
import Dashboard from './components/user/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navigation />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Placeholder Components
const Home = () => (
  <Container className="py-5 text-center">
    <h1 className="display-4 mb-4">Welcome to <span style={{ color: '#4B3D2D' }}>Liber</span>Hub</h1>
    <p className="lead mb-5">
      Your comprehensive library management system. Discover new books, track your reading progress, 
      and connect with other readers.
    </p>
    <div className="py-5">
      <img 
        src="/placeholder-hero.png" 
        alt="Library Management" 
        className="img-fluid"
        style={{ maxHeight: '400px', opacity: 0.8 }}
      />
    </div>
  </Container>
);

const NotFound = () => (
  <Container className="py-5 text-center">
    <h1 className="display-1">404</h1>
    <h2 className="mb-4">Page Not Found</h2>
    <p className="lead">The page you are looking for does not exist.</p>
  </Container>
);

export default App;
