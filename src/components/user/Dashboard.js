import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Row, Col, Card, Badge, Table, Button, ProgressBar, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FiBook, FiBookOpen, FiHeart, FiActivity, FiStar, 
  FiShield, FiUsers, FiAlertTriangle, FiBarChart2, 
  FiFlag, FiCheckCircle, FiMessageSquare, FiClock
} from 'react-icons/fi';

const Dashboard = () => {
  const { user, updateReadingProgress, getAllBooks } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    booksRead: 0,
    booksInProgress: 0,
    wishlist: 0,
    recentActivities: [],
    currentlyReading: [],
    recommendations: [],
    adminStats: {
      totalUsers: 0,
      totalBooks: 0,
      pendingApprovals: 0,
      recentSignups: []
    }
  });

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const allBooks = getAllBooks?.() || [];
        
        if (isAdmin) {
          // Données vue admin
          setDashboardData({
            booksRead: 0,
            booksInProgress: 0,
            wishlist: 0,
            recentActivities: [
              { id: 1, user: 'Admin', action: 'Approuvé', book: 'Nouveau Livre', date: '2023-08-15' },
              { id: 2, user: 'Jean Dupont', action: 'Signalé', book: 'Problème de livre', date: '2023-08-14' }
            ],
            currentlyReading: [],
            recommendations: [
              { 
                id: 1, 
                title: '3 Approbations en attente', 
                type: 'alert', 
                icon: <FiAlertTriangle />,
                description: 'Nouveaux livres en attente de validation'
              },
              { 
                id: 2, 
                title: '5 Nouveaux utilisateurs', 
                type: 'info', 
                icon: <FiUsers />,
                description: 'Nouveaux inscrits à vérifier'
              },
              { 
                id: 3, 
                title: '2 Signalements', 
                type: 'warning', 
                icon: <FiFlag />,
                description: 'Problèmes signalés par les utilisateurs'
              }
            ],
            adminStats: {
              totalUsers: 42,
              totalBooks: allBooks.length,
              pendingApprovals: 3,
              recentSignups: [
                { id: 1, name: 'Nouvel Utilisateur 1', date: '2023-08-20', email: 'user1@example.com' },
                { id: 2, name: 'Nouvel Utilisateur 2', date: '2023-08-19', email: 'user2@example.com' }
              ]
            }
          });
        } else {
          // Données vue utilisateur
          setDashboardData({
            booksRead: user?.books?.filter(b => b.status === 'completed').length || 12,
            booksInProgress: user?.books?.filter(b => b.status === 'reading').length || 2,
            wishlist: user?.wishlist?.length || 8,
            recentActivities: [
              { id: 1, action: 'Emprunté', book: 'Gatsby le Magnifique', date: '2023-08-15' },
              { id: 2, action: 'Retourné', book: '1984', date: '2023-08-10' },
              { id: 3, action: 'Noté', book: 'Ne tirez pas sur l\'oiseau moqueur', date: '2023-08-05' },
              { id: 4, action: 'Ajouté à la liste', book: 'Dune', date: '2023-08-01' }
            ],
            currentlyReading: user?.books?.filter(b => b.status === 'reading').map(book => ({
              id: book.id,
              title: allBooks.find(b => b.id === book.id)?.title || 'Livre inconnu',
              author: allBooks.find(b => b.id === book.id)?.author || 'Auteur inconnu',
              progress: book.progress || 0
            })) || [
              { id: 1, title: 'Le Hobbit', author: 'J.R.R. Tolkien', progress: 75 },
              { id: 2, title: 'Orgueil et Préjugés', author: 'Jane Austen', progress: 30 }
            ],
            recommendations: allBooks.slice(0, 3).map(book => ({
              id: book.id,
              title: book.title,
              author: book.author,
              genre: book.genre || 'Fiction',
              image: book.image || '/images/default-book-cover.jpg'
            })),
            adminStats: {
              totalUsers: 0,
              totalBooks: 0,
              pendingApprovals: 0,
              recentSignups: []
            }
          });
        }
      } catch (error) {
        console.error('Échec du chargement du tableau de bord:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, getAllBooks, isAdmin]);

  const handleProgressUpdate = async (bookId, newProgress) => {
    try {
      await updateReadingProgress(bookId, newProgress);
      setDashboardData(prev => ({
        ...prev,
        currentlyReading: prev.currentlyReading.map(book => 
          book.id === bookId ? { ...book, progress: newProgress } : book
        )
      }));
    } catch (error) {
      console.error('Échec de la mise à jour de la progression:', error);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Chargement de votre tableau de bord...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* En-tête */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            {isAdmin ? 'Tableau de bord Admin' : 'Votre tableau de bord de lecture'}
            <Badge bg={isAdmin ? "warning" : "primary"} className="ms-2">
              {isAdmin ? "Mode Admin" : `${dashboardData.booksRead} Livres lus`}
            </Badge>
          </h2>
        </Col>
      </Row>

      {/* Section Aperçu Admin */}
      {isAdmin && (
        <Row className="mb-4">
          <Col>
            <Card className="border-warning shadow-sm">
              <Card.Body>
                <Card.Title className="text-warning d-flex align-items-center">
                  <FiShield className="me-2" /> Aperçu du système
                </Card.Title>
                <Row>
                  <Col md={3} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                        <FiUsers className="fs-3 text-warning" />
                      </div>
                      <div>
                        <h4 className="mb-0">{dashboardData.adminStats.totalUsers}</h4>
                        <small className="text-muted">Utilisateurs</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                        <FiBook className="fs-3 text-warning" />
                      </div>
                      <div>
                        <h4 className="mb-0">{dashboardData.adminStats.totalBooks}</h4>
                        <small className="text-muted">Livres</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                        <FiAlertTriangle className="fs-3 text-warning" />
                      </div>
                      <div>
                        <h4 className="mb-0">{dashboardData.adminStats.pendingApprovals}</h4>
                        <small className="text-muted">En attente</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                        <FiFlag className="fs-3 text-warning" />
                      </div>
                      <div>
                        <h4 className="mb-0">2</h4>
                        <small className="text-muted">Signalements</small>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-3 d-flex gap-2">
                  <Button variant="warning" size="sm" as={Link} to="/admin/users">
                    <FiUsers className="me-1" /> Gérer les utilisateurs
                  </Button>
                  <Button variant="warning" size="sm" as={Link} to="/admin/books">
                    <FiBook className="me-1" /> Gérer les livres
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Cartes de statistiques */}
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold d-flex align-items-center">
                {isAdmin ? <FiUsers className="me-2" /> : <FiBook className="me-2" />}
                {isAdmin ? 'Utilisateurs actifs' : 'Livres lus'}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">
                    {isAdmin ? dashboardData.adminStats.totalUsers : dashboardData.booksRead}
                  </h1>
                  <p className="text-muted">{isAdmin ? 'Actifs' : 'Total'}</p>
                </div>
              </div>
              <Button 
                variant={isAdmin ? "outline-warning" : "outline-primary"} 
                size="sm" 
                as={Link} 
                to={isAdmin ? "/admin/users" : "/books/read"}
              >
                Voir tout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold d-flex align-items-center">
                <FiBookOpen className="me-2" />
                {isAdmin ? 'Nouveaux livres' : 'En cours de lecture'}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">
                    {isAdmin ? dashboardData.adminStats.pendingApprovals : dashboardData.booksInProgress}
                  </h1>
                  <p className="text-muted">
                    {isAdmin ? 'En attente' : 'En cours'}
                  </p>
                </div>
              </div>
              <Button 
                variant={isAdmin ? "outline-warning" : "outline-primary"} 
                size="sm" 
                as={Link} 
                to={isAdmin ? "/admin/books" : "/books/current"}
              >
                {isAdmin ? 'Vérifier' : 'Voir les livres'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold d-flex align-items-center">
                {isAdmin ? <FiFlag className="me-2" /> : <FiHeart className="me-2" />}
                {isAdmin ? 'Signalements' : 'Liste de souhaits'}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <div className="text-center">
                  <h1 className="display-4 mb-0">
                    {isAdmin ? 2 : dashboardData.wishlist}
                  </h1>
                  <p className="text-muted">
                    {isAdmin ? 'Nouveaux' : 'Livres sauvegardés'}
                  </p>
                </div>
              </div>
              <Button 
                variant={isAdmin ? "outline-warning" : "outline-primary"} 
                size="sm" 
                as={Link} 
                to={isAdmin ? "/admin/reports" : "/books/wishlist"}
              >
                Voir tout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section principale */}
      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          {isAdmin ? (
            <>
              {/* Admin - Nouveaux inscrits */}
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                    <FiUsers className="me-2" /> Nouveaux inscrits
                  </Card.Title>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Date d'inscription</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.adminStats.recentSignups.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.date}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">Voir</Button>
                            <Button variant="outline-success" size="sm">Approuver</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to="/admin/users">
                      Voir tous les utilisateurs
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Admin - Activités récentes */}
              <Card className="shadow mt-4">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                    <FiActivity className="me-2" /> Activités système
                  </Card.Title>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Action</th>
                        <th>Élément</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentActivities.map(activity => (
                        <tr key={activity.id}>
                          <td>{activity.user}</td>
                          <td>
                            <Badge bg={
                              activity.action === 'Approuvé' ? 'success' : 
                              activity.action === 'Signalé' ? 'danger' : 'primary'
                            }>
                              {activity.action}
                            </Badge>
                          </td>
                          <td>{activity.book}</td>
                          <td>{activity.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          ) : (
            <>
              {/* Utilisateur - Lecture en cours */}
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                    <FiBookOpen className="me-2" /> Lecture en cours
                  </Card.Title>
                  {dashboardData.currentlyReading.length > 0 ? (
                    dashboardData.currentlyReading.map(book => (
                      <div key={book.id} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="mb-0">{book.title}</h6>
                          <div className="d-flex align-items-center">
                            <input 
                              type="number" 
                              min="0" 
                              max="100" 
                              value={book.progress}
                              onChange={(e) => handleProgressUpdate(book.id, parseInt(e.target.value))}
                              className="form-control form-control-sm me-2"
                              style={{ width: '60px' }}
                            />
                            <span>%</span>
                          </div>
                        </div>
                        <ProgressBar 
                          now={book.progress} 
                          variant={book.progress > 50 ? "success" : "primary"} 
                          className="mb-1" 
                        />
                        <small className="text-muted">Par {book.author}</small>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">Vous ne lisez actuellement aucun livre</p>
                      <Button variant="primary" as={Link} to="/books">
                        Parcourir les livres
                      </Button>
                    </div>
                  )}
                  <div className="mt-3">
                    <Button variant="primary" size="sm" as={Link} to="/books">
                      Trouver de nouveaux livres
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Utilisateur - Activités récentes */}
              <Card className="shadow mt-4">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                    <FiActivity className="me-2" /> Votre activité récente
                  </Card.Title>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Livre</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentActivities.map(activity => (
                        <tr key={activity.id}>
                          <td>
                            <Badge bg={
                              activity.action.includes('Emprunté') ? 'primary' : 
                              activity.action.includes('Retourné') ? 'success' :
                              activity.action.includes('Noté') ? 'info' :
                              'secondary'
                            }>
                              {activity.action}
                            </Badge>
                          </td>
                          <td>{activity.book}</td>
                          <td>{activity.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
        
        {/* Section Recommandations/Alertes */}
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                <FiStar className="me-2" />
                {isAdmin ? 'Alertes système' : 'Recommandations'}
              </Card.Title>
              {isAdmin ? (
                // Alertes admin
                dashboardData.recommendations.map(alert => (
                  <div key={alert.id} className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className={`me-3 fs-4 ${
                        alert.type === 'alert' ? 'text-danger' : 
                        alert.type === 'warning' ? 'text-warning' : 'text-info'
                      }`}>
                        {alert.icon}
                      </div>
                      <div>
                        <h6 className="mb-1">{alert.title}</h6>
                        <p className="text-muted small mb-2">{alert.description}</p>
                        <Button 
                          variant={
                            alert.type === 'alert' ? 'outline-danger' : 
                            alert.type === 'warning' ? 'outline-warning' : 'outline-info'
                          } 
                          size="sm"
                        >
                          Voir détails
                        </Button>
                      </div>
                    </div>
                    {alert.id !== dashboardData.recommendations[dashboardData.recommendations.length - 1].id && (
                      <hr className="my-3" />
                    )}
                  </div>
                ))
              ) : (
                // Recommandations utilisateur avec images
                dashboardData.recommendations.map((book, index) => (
                  <React.Fragment key={book.id}>
                    <div className="mb-3">
                      <div className="d-flex">
                        <div className="me-3" style={{ width: '80px', flexShrink: 0 }}>
                          <img 
                            src={book.image} 
                            alt={`Couverture de ${book.title}`}
                            className="img-fluid rounded shadow-sm"
                            style={{ height: '120px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'public/alchemist.webp';
                            }}
                          />
                        </div>
                        <div>
                          <h6 className="mb-1">{book.title}</h6>
                          <small className="text-muted d-block">{book.author}</small>
                          {book.genre && (
                            <Badge bg="secondary" className="mt-1 mb-2">{book.genre}</Badge>
                          )}
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="d-block"
                            as={Link}
                            to={`/books/${book.id}`}
                          >
                            Prévisualiser
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < dashboardData.recommendations.length - 1 && (
                      <hr className="my-3" />
                    )}
                  </React.Fragment>
                ))
              )}
              <div className="mt-3">
                <Button 
                  variant={isAdmin ? "outline-warning" : "outline-primary"} 
                  size="sm" 
                  as={Link} 
                  to={isAdmin ? "/admin/alerts" : "/books/recommendations"}
                >
                  {isAdmin ? 'Voir toutes les alertes' : 'Voir plus'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Actions rapides admin */}
      {isAdmin && (
        <Row className="mt-4">
          <Col>
            <Card className="shadow border-warning">
              <Card.Body>
                <Card.Title className="fw-bold text-warning d-flex align-items-center">
                  <FiCheckCircle className="me-2" /> Actions rapides
                </Card.Title>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="warning" size="sm" as={Link} to="/admin/books">
                    <FiBook className="me-1" /> Gérer les livres
                  </Button>
                  <Button variant="warning" size="sm" as={Link} to="/admin/users">
                    <FiUsers className="me-1" /> Gérer les utilisateurs
                  </Button>
                  <Button variant="warning" size="sm" as={Link} to="/admin/reports">
                    <FiFlag className="me-1" /> Voir les signalements
                  </Button>
                  <Button variant="warning" size="sm" as={Link} to="/admin/stats">
                    <FiBarChart2 className="me-1" /> Statistiques
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;