import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ForumProvider } from './contexts/ForumContext';
//manage users
import ManageUsers from './components/user/ManageUsers';

// Common Components
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// User Components
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import Profile from './components/user/Profile';
import Dashboard from './components/user/Dashboard';

// Book & Review Components
import BookManagement from './components/BookManagement/BookManagement';
import ReviewManagement from './components/ReviewManagement/ReviewManagement';

// Forum Components

import CreatePost from './components/forum/CreatePost';


import Forum from './components/forum/Forum';

//stats component
import Statistics from './components/stats/Statistics';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';


import AuthorsManagement from './components/authors/AuthorsManagement';
import ComplaintsManagement from './components/reclamation/ComplaintsManagement';

function App() {
  return (
    <AuthProvider>
      <ForumProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/authors" element={<ProtectedRoute><AuthorsManagement /></ProtectedRoute>} />
                <Route path="/complaints" element={<ProtectedRoute><ComplaintsManagement /></ProtectedRoute>} />
                <Route 
  path="/admin/users" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <ManageUsers />
    </ProtectedRoute>
  } 
/>
                
                {/* User Protected Routes */}
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
                <Route 
                  path="/books" 
                  element={
                    <ProtectedRoute>
                      <BookManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/reviews" 
                  element={
                    <ProtectedRoute>
                      <ReviewManagement />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Protected Routes */}
                <Route 
                  path="/admin/books" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <BookManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/reviews" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <ReviewManagement />
                    </ProtectedRoute>
                  } 
                />


                  <Route 
                  path="/authors" 
                  element={
                    <ProtectedRoute >
                      <AuthorsManagement />
                    </ProtectedRoute>
                  } 

                  
                />

                  <Route 
                  path="/support" 
                  element={
                    <ProtectedRoute >
                      <ComplaintsManagement />
                    </ProtectedRoute>
                  } 
                /> 
                  <Route 
                  path="/admin/reports" 
                  element={
                    <ProtectedRoute >
                      <ComplaintsManagement />
                    </ProtectedRoute>
                  } 
                  /> 
                  <Route path="/forum" element={
                    <ProtectedRoute><Forum /></ProtectedRoute>
                  } />

                 <Route path="/admin/stats" element={
                    <ProtectedRoute><Statistics /></ProtectedRoute>
                  } />

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ForumProvider>
    </AuthProvider>
  );
}

// Placeholder Components
const Home = () => (
  <div className="home-container">
    <img 
      src="/home_img.jpg" 
      alt="Gestion de bibliothèque" 
      className="home-image"
    />
    <div className="home-overlay"></div>
    <div className="home-content">
      <h1 className="home-title">Bienvenue sur <span className="highlight">BiblioTech</span></h1>
      <p className="home-subtitle">
        Votre bibliothèque numérique. Découvrez de nouveaux livres, suivez votre progression de lecture,
        et connectez-vous avec d'autres lecteurs.
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