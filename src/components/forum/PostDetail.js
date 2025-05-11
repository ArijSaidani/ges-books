import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { useForum } from '../../contexts/ForumContext';
import { useAuth } from '../../contexts/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const { posts, addComment } = useForum();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Post not found</Alert>
        <Button variant="secondary" onClick={() => navigate('/forum')}>
          Back to Forum
        </Button>
      </Container>
    );
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!currentUser) {
        throw new Error('You must be logged in to comment');
      }

      const newComment = {
        id: Date.now(),
        text: commentText,
        author: currentUser.displayName || currentUser.email,
        authorId: currentUser.uid,
        createdAt: new Date().toISOString()
      };

      addComment(post.id, newComment);
      setCommentText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" onClick={() => navigate('/forum')} className="mb-3">
        Back to Forum
      </Button>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>{post.title}</Card.Title>
            <Badge bg="info">{post.category}</Badge>
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            Posted by {post.author} • {new Date(post.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>{post.content}</Card.Text>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Comments ({post.comments.length})</h4>

      {post.comments.length === 0 ? (
        <Card className="mb-3">
          <Card.Body>No comments yet. Be the first to comment!</Card.Body>
        </Card>
      ) : (
        post.comments.map(comment => (
          <Card key={comment.id} className="mb-3">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.author} • {new Date(comment.createdAt).toLocaleString()}
              </Card.Subtitle>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>{comment.text}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}

      {currentUser ? (
        <Form onSubmit={handleCommentSubmit} className="mt-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Add a Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Comment'}
          </Button>
        </Form>
      ) : (
        <Alert variant="info">
          You need to <Alert.Link href="/login">log in</Alert.Link> to comment.
        </Alert>
      )}
    </Container>
  );
}

export default PostDetail;