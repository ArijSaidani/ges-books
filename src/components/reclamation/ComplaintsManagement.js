import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';


const ComplaintsManagement = () => {
  // 👇 Simulated role: 'admin' or 'user'
  const currentRole = 'user'; // Change to 'admin' to test admin interface
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([
    { id: 1, user: 'John Doe', book: 'The Great Gatsby', type: 'Problème de livraison', description: 'Le livre ne m\'est jamais parvenu', status: 'pending', date: '2023-08-15' },
    { id: 2, user: 'Jane Smith', book: '1984', type: 'Livre endommagé', description: 'Des pages étaient manquantes à la réception', status: 'in_progress', date: '2023-08-10' },
    { id: 3, user: 'Robert Johnson', book: 'To Kill a Mockingbird', type: 'Retard de retour', description: 'Je n\'ai pas pu retourner le livre à temps à cause d\'un voyage', status: 'resolved', date: '2023-08-05' }
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const isAdmin = user?.role === 'admin';
  const [newComplaint, setNewComplaint] = useState({
    user: '',
    book: '',
    type: '',
    description: ''
  });

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const newId = complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const complaintToAdd = {
      ...newComplaint,
      id: newId,
      status: 'pending',
      date: today
    };

    setComplaints([complaintToAdd, ...complaints]);
    setNewComplaint({ user: '', book: '', type: '', description: '' });
  };

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    ));
  };

  const handleResponseSubmit = () => {
    if (!selectedComplaint || response.trim() === '') return;
    
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === selectedComplaint.id 
        ? { ...complaint, status: 'resolved', response } 
        : complaint
    );
    
    setComplaints(updatedComplaints);
    setShowModal(false);
    setResponse('');
    setSelectedComplaint(null);
  };

  const openResponseModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <Badge bg="warning">En attente</Badge>;
      case 'in_progress': return <Badge bg="primary">En cours</Badge>;
      case 'resolved': return <Badge bg="success">Résolu</Badge>;
      default: return <Badge bg="secondary">Inconnu</Badge>;
    }
  };

  return (
    <Container className="py-5">
      {/* Formulaire utilisateur */}
      
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Déposer une réclamation</h2>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleSubmitComplaint}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control 
                          value={newComplaint.user}
                          onChange={(e) => setNewComplaint({ ...newComplaint, user: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Livre concerné</Form.Label>
                        <Form.Control 
                          value={newComplaint.book}
                          onChange={(e) => setNewComplaint({ ...newComplaint, book: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Type de réclamation</Form.Label>
                    <Form.Control 
                      value={newComplaint.type}
                      onChange={(e) => setNewComplaint({ ...newComplaint, type: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="success">
                    ➕ Soumettre la réclamation
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      

      {/* Liste des réclamations */}
      {isAdmin && (
      <Row>
        <Col>
          <h2 className="fw-bold">Liste des réclamations</h2>
          <Card className="shadow">
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Utilisateur</th>
                    <th>Livre</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Statut</th>
                     <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(complaint => (
                    <tr key={complaint.id}>
                      <td>{complaint.id}</td>
                      <td>{complaint.user}</td>
                      <td>{complaint.book}</td>
                      <td>{complaint.type}</td>
                      <td>{complaint.date}</td>
                      <td>{getStatusBadge(complaint.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => openResponseModal(complaint)}
                            >
                              Répondre
                            </Button>
                            {complaint.status !== 'in_progress' && (
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleStatusChange(complaint.id, 'in_progress')}
                              >
                                Prendre en charge
                              </Button>
                            )}
                            {complaint.status !== 'resolved' && (
                              <Button 
                                variant="outline-success" 
                                size="sm"
                                onClick={() => handleStatusChange(complaint.id, 'resolved')}
                              >
                                Marquer comme résolu
                              </Button>
                            )}
                          </div>
                        </td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )}
      {/* Modal pour répondre */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Réponse à la réclamation #{selectedComplaint?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Utilisateur:</strong> {selectedComplaint?.user}</p>
          <p><strong>Livre:</strong> {selectedComplaint?.book}</p>
          <p><strong>Description:</strong> {selectedComplaint?.description}</p>
          
          <Form.Group className="mb-3">
            <Form.Label>Votre réponse</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Écrivez votre réponse ici..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleResponseSubmit}>
            Envoyer la réponse
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ComplaintsManagement;
