import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, make API call to authenticate user
      // const response = await axios.post('/api/users/login', { email, password });
      
      // For now, simulate successful login with mock data
      const userData = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        token: 'sample-token-' + Math.random().toString(36).substring(2)
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to login'
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // In a real app, make API call to register user
      // const response = await axios.post('/api/users/register', userData);
      
      // For now, simulate successful registration
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to register'
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      // In a real app, make API call to update user profile
      // const response = await axios.put('/api/users/profile', profileData, {
      //   headers: { Authorization: `Bearer ${currentUser.token}` }
      // });
      
      // For now, simulate successful profile update
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 