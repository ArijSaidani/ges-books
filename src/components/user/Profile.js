import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    favoriteGenres: [],
    profilePicture: '/profile_img.jpg',
  });
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      setProfile({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        bio: currentUser.bio || 'I love reading science fiction and fantasy novels. Currently exploring classic literature.',
        favoriteGenres: currentUser.favoriteGenres || ['Science Fiction', 'Fantasy', 'Mystery'],
        profilePicture: currentUser.profilePicture || '/profile_img.jpg',
      });
    }
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        favoriteGenres: profile.favoriteGenres,
      });
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setEditing(false);
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">My Profile</h2>
                {!editing ? (
                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                )}
              </div>
              
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={4} className="text-center">
                    <Image 
                      src={profile.profilePicture} 
                      roundedCircle 
                      className="mb-3"
                      width="150"
                      height="150"
                      alt="Profile"
                    />
                    {editing && (
                      <div>
                        <Button variant="outline-secondary" size="sm" className="mt-2">
                          Change Photo
                        </Button>
                      </div>
                    )}
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            disabled={!editing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            disabled={!editing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profile.email}
                        disabled
                      />
                      {editing && <Form.Text className="text-muted">Email cannot be changed</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
                
                {editing && (
                  <div className="d-flex justify-content-end mt-4">
                    <Button 
                      type="submit" 
                      variant="success" 
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="shadow mt-4">
            <Card.Body>
              <h4 className="fw-bold mb-3">Account Settings</h4>
              <Button variant="outline-primary" className="me-2 mb-2">Change Password</Button>
              <Button variant="outline-danger" className="mb-2">Delete Account</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile; 