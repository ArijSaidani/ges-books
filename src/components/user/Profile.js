import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Button, 
  Card, 
  Container, 
  Row, 
  Col, 
  Alert, 
  Image,
  Spinner,
  Badge
} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'; // Ajustez le chemin d'importation selon vos besoins

const Profile = () => {
  const { 
    user, 
    loading: authLoading, 
    updateProfile,
    isAdmin,
    isUser,
    logout
  } = useAuth();
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    readingProgress: 0,
    favoriteGenres: []
  });
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Initialiser le profil avec les données utilisateur
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || 'Parlez-nous de vous...',
        readingProgress: user.readingProgress || 0,
        favoriteGenres: user.favoriteGenres || []
      });
    }
  }, [user, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genre) => {
    setProfile(prev => {
      const newGenres = prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre];
      return { ...prev, favoriteGenres: newGenres };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfile(profile);
      if (result.success) {
        setSuccess('Profil mis à jour avec succès !');
        setEditing(false);
      } else {
        setError(result.error || 'Échec de la mise à jour du profil');
      }
    } catch (err) {
      setError('Échec de la mise à jour du profil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Afficher l'état de chargement pendant la vérification de l'authentification
  if (authLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  // Demander la connexion si non authentifié
  if (!authLoading && !user) {
    return (
      <Container className="py-5">
        <Alert variant="info">Veuillez vous connecter pour voir votre profil</Alert>
      </Container>
    );
  }

  const allGenres = ['Fiction', 'Non-Fiction', 'Science-Fiction', 'Fantasy', 'Mystère', 'Romance', 'Thriller', 'Biographie'];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="fw-bold mb-0">Mon Profil</h2>
                  {isAdmin() && <Badge bg="danger" className="ms-2">Admin</Badge>}
                </div>
                {!editing ? (
                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Modifier le profil
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={() => {
                    setEditing(false);
                    // Réinitialiser avec les données utilisateur lors de l'annulation
                    setProfile({
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      email: user.email || '',
                      bio: user.bio || '',
                      readingProgress: user.readingProgress || 0,
                      favoriteGenres: user.favoriteGenres || []
                    });
                  }}>
                    Annuler
                  </Button>
                )}
              </div>
              
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={4} className="text-center">
                    <Image 
                      src={user.profilePicture || '/profile_img.jpg'} 
                      roundedCircle 
                      className="mb-3"
                      width="150"
                      height="150"
                      alt="Photo de profil"
                    />
                    {editing && (
                      <div>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          className="d-none"
                          id="profilePictureUpload"
                        />
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => document.getElementById('profilePictureUpload').click()}
                        >
                          Changer la photo
                        </Button>
                      </div>
                    )}
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Prénom</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            disabled={!editing}
                            required
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
                        onChange={handleChange}
                        disabled={!editing}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                {isUser() && (
                  <Form.Group className="mb-3">
                    <Form.Label>Progression de lecture</Form.Label>
                    <Form.Range 
                      min="0" 
                      max="100" 
                      value={profile.readingProgress} 
                      onChange={(e) => setProfile(prev => ({ ...prev, readingProgress: parseInt(e.target.value) }))}
                      disabled={!editing}
                    />

                  </Form.Group>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Label>Biographie</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Parlez-nous de vous..."
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Genres préférés</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {allGenres.map(genre => (
                      <Form.Check
                        key={genre}
                        type="checkbox"
                        id={`genre-${genre}`}
                        label={genre}
                        checked={profile.favoriteGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                        disabled={!editing}
                        inline
                      />
                    ))}
                  </div>
                </Form.Group>
                
                {editing && (
                  <div className="d-flex justify-content-end mt-4 gap-2">
                    <Button 
                      type="submit" 
                      variant="success" 
                      disabled={loading}
                    >
                      {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="shadow mt-4">
            <Card.Body>
              <h4 className="fw-bold mb-3">Paramètres du compte</h4>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="outline-primary" className="me-2 mb-2">
                  Changer le mot de passe
                </Button>
                <Button 
                  variant="outline-danger" 
                  className="mb-2"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                      logout();
                    }
                  }}
                >
                  Déconnexion
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;