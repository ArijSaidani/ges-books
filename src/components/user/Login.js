import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('admin@bibliotech.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">Connexion</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-4">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mb-3" type="submit">
                Se connecter
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Pas de compte ? <Link to="/signup">S'inscrire</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;