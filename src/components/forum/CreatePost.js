import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useForum } from '../../contexts/ForumContext';
import { useAuth } from '../../contexts/AuthContext';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addPost } = useForum();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!currentUser) {
        throw new Error('You must be logged in to create a post');
      }

      const newPost = {
        id: Date.now(),
        title,
        content,
        category,
        author: currentUser.displayName || currentUser.email,
        authorId: currentUser.uid,
        createdAt: new Date().toISOString(),
        comments: []
      };

      addPost(newPost);
      navigate('/forum');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2>Create New Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="general">General Discussion</option>
            <option value="books">Book Recommendations</option>
            <option value="reviews">Book Reviews</option>
            <option value="questions">Questions</option>
            <option value="events">Events</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Submit Post'}
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePost;