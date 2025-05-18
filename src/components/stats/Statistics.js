import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import { useForum } from '../../contexts/ForumContext';

export default function Statistics() {
  const { analytics } = useForum();

  return (
    <div className="my-4">
      <h2>Statistiques du forum</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total des posts</Card.Title>
              <Card.Text className="display-6">{analytics.totalPosts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Utilisateurs actifs</Card.Title>
              <Card.Text className="display-6">{analytics.activeUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Catégories populaires</Card.Title>
              <ListGroup variant="flush">
                {analytics.popularTopics.map((topic, i) => (
                  <ListGroup.Item key={i}>{topic}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}