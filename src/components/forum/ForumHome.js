import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useForum } from '../../contexts/ForumContext';

function ForumHome() {
  const { posts } = useForum(); // Make sure you're getting posts
  const navigate = useNavigate();

  console.log(posts); // Add this to check if posts are loading

  return (
    <Container className="py-4">
      <h2>Forum</h2>
      {posts.length === 0 ? (
        <Card>
          <Card.Body>No posts yet. Be the first to create one!</Card.Body>
        </Card>
      ) : (
        posts.map(post => (
          <Card key={post.id} className="mb-3" onClick={() => navigate(`/forum/post/${post.id}`)}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
      <Button 
        variant="primary" 
        onClick={() => navigate('/forum/create')}
        className="mt-3"
      >
        Create Post
      </Button>
    </Container>
  );
}
export default ForumHome;