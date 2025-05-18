import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Row, Col, Card, Table, Button, Form, Badge, InputGroup } from 'react-bootstrap';

const AuthorsManagement = () => {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([
    { id: 1, name: 'Victor Hugo', booksCount: 25, nationality: 'Français', status: 'active' },
    { id: 2, name: 'Jane Austen', booksCount: 7, nationality: 'British', status: 'active' },
    { id: 3, name: 'George Orwell', booksCount: 12, nationality: 'British', status: 'inactive' }
  ]);

  const [newAuthor, setNewAuthor] = useState({
    name: '',
    nationality: '',
    status: 'active'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = user?.role === 'admin';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor(prev => ({ ...prev, [name]: value }));
  };

  const addAuthor = () => {
    if (newAuthor.name.trim() === '') return;
    
    const author = {
      id: authors.length + 1,
      name: newAuthor.name,
      nationality: newAuthor.nationality,
      booksCount: 0,
      status: newAuthor.status
    };
    
    setAuthors([...authors, author]);
    setNewAuthor({ name: '', nationality: '', status: 'active' });
  };

  const toggleAuthorStatus = (id) => {
    setAuthors(authors.map(author => 
      author.id === id 
        ? { ...author, status: author.status === 'active' ? 'inactive' : 'active' } 
        : author
    ));
  };

  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Gestion des Auteurs</h2>
        </Col>
      </Row>

      {/* Search Bar - Visible to all users */}
      <Row className="mb-4">
        <Col>
          <InputGroup>
            <Form.Control
              placeholder="Rechercher un auteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              🔍 Rechercher
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Add Author Form - Only visible to admin */}
      {isAdmin && (
        <Row className="mb-4">
          <Col>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Ajouter un nouvel auteur</Card.Title>
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom complet</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name"
                          value={newAuthor.name}
                          onChange={handleInputChange}
                          placeholder="Nom de l'auteur" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nationalité</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nationality"
                          value={newAuthor.nationality}
                          onChange={handleInputChange}
                          placeholder="Nationalité" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Statut</Form.Label>
                        <Form.Select 
                          name="status"
                          value={newAuthor.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Actif</option>
                          <option value="inactive">Inactif</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button variant="primary" onClick={addAuthor}>
                        Ajouter
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Liste des auteurs</Card.Title>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Nationalité</th>
                    <th>Livres</th>
                    <th>Statut</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredAuthors.map(author => (
                    <tr key={author.id}>
                      <td>{author.id}</td>
                      <td>{author.name}</td>
                      <td>{author.nationality}</td>
                      <td>{author.booksCount}</td>
                      <td>
                        <Badge bg={author.status === 'active' ? 'success' : 'secondary'}>
                          {author.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      {isAdmin && (
                        <td>
                          <Button 
                            variant={author.status === 'active' ? 'outline-danger' : 'outline-success'} 
                            size="sm" 
                            onClick={() => toggleAuthorStatus(author.id)}
                          >
                            {author.status === 'active' ? 'Désactiver' : 'Activer'}
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorsManagement;