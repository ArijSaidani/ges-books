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
import ManageUsers from './components/user/ManageUsers';

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
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><ManageUsers /></ProtectedRoute>} />
              
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
  <div className="home-container">
    <img 
      src="/home_img.jpg" 
      alt="Library Management" 
      className="home-image"
    />
    <div className="home-overlay"></div>
    <div className="home-content">
      <h1 className="home-title">Welcome to <span className="highlight">BiblioTech</span></h1>
      <p className="home-subtitle">
        Your digital library. Discover new books, track your reading progress, 
        and connect with other readers.
      </p>
    </div>
  </div>
);

const NotFound = () => (
  <Container className="py-5 text-center">
    <h1 className="display-1">404</h1>
    <h2 className="mb-4">Page Not Found</h2>
    <p className="lead">The page you are looking for does not exist.</p>
  </Container>
);

export default App;
