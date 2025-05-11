import { useState } from 'react';
import { 
  Container, 
  Form, 
  Button, 
  Card, 
  ListGroup, 
  Alert 
} from 'react-bootstrap';
import { useForum } from './context/ForumContext';

export default function Forum() {
  const { posts, addPost, analytics } = useForum();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Général');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Les champs titre et contenu sont obligatoires');
      return;
    }

    try {
      addPost({
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        category,
        date: new Date().toLocaleString('fr-FR'),
        comments: []
      });
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      setError("Une erreur est survenue lors de la publication");
    }
  };

  return (
    <Container className="forum-container my-5">
      <div className="forum-header mb-5">
        <h1 className="text-center">Forum de discussion</h1>
        <p className="text-muted text-center">
          {analytics.totalPosts} sujets publiés • {analytics.activeUsers} utilisateurs en ligne
        </p>
      </div>

      <section className="new-post-section mb-5">
        <h2 className="mb-4">Créer un nouveau sujet</h2>
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titre du sujet <span className="text-danger">*</span></Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Problème de connexion"
              maxLength={120}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contenu détaillé <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Décrivez votre sujet en détail..."
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Général">Général</option>
              <option value="Technique">Support Technique</option>
              <option value="Ventes">Questions Commerciales</option>
              <option value="Suggestions">Suggestions</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              className="px-5"
            >
              Publier
            </Button>
          </div>
        </Form>
      </section>

      <section className="posts-list">
        <h2 className="mb-4">Dernières discussions</h2>
        
        {posts.length === 0 ? (
          <Alert variant="info">
            Aucune discussion disponible. Soyez le premier à en créer une !
          </Alert>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="text-primary">{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <span className="badge bg-secondary me-2">{post.category}</span>
                      Posté le {post.date}
                    </Card.Subtitle>
                  </div>
                </div>
                
                <Card.Text className="mt-3">{post.content}</Card.Text>

                {post.comments.length > 0 && (
                  <>
                    <hr className="my-4" />
                    <h5 className="mb-3">Réponses ({post.comments.length})</h5>
                    <ListGroup>
                      {post.comments.map((comment, index) => (
                        <ListGroup.Item 
                          key={index} 
                          className="d-flex align-items-start bg-light"
                        >
                          <span className="me-3">💬</span>
                          <div>
                            <div className="fw-bold mb-1">Utilisateur {index + 1}</div>
                            {comment}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </section>
    </Container>
  );
}