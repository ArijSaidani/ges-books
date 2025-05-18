import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/ManagementStyles.css';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

const fakeBooks = [
  {
    _id: '1',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    isbn: '9782070612758',
    publicationDate: '1943-04-06',
  },
  {
    _id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    publicationDate: '1949-06-08',
  },
  {
    _id: '3',
    title: 'L\'Étranger',
    author: 'Albert Camus',
    isbn: '9782070360024',
    publicationDate: '1942-05-19',
  },
];

const BookManagement = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    const storedReviews = localStorage.getItem('reviews');

    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(fakeBooks);
      localStorage.setItem('books', JSON.stringify(fakeBooks));
    }

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const updateLocalStorage = (updatedBooks) => {
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedBooks;

    if (editingId) {
      updatedBooks = books.map((book) =>
        book._id === editingId ? { ...book, ...formData } : book
      );
    } else {
      const newBook = {
        ...formData,
        _id: Date.now().toString(),
      };
      updatedBooks = [newBook, ...books];
    }

    setBooks(updatedBooks);
    updateLocalStorage(updatedBooks);

    setFormData({
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
    });
    setEditingId(null);
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book._id);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks);
    updateLocalStorage(updatedBooks);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAverageRating = (bookId) => {
    const bookReviews = reviews.filter((r) => r.bookId === bookId);
    if (bookReviews.length === 0) return null;

    const total = bookReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / bookReviews.length).toFixed(1); // One decimal point
  };

  return (
    <div className="management-container">
      <h2 className="section-title">📚 Gestion des Livres</h2>

      {/* Search Bar */}
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

      {/* Book List */}
      <div className="items-list">
        {filteredBooks.length === 0 ? (
          <p className="empty-message">Aucun livre trouvé.</p>
        ) : (
          filteredBooks.map((book) => {
            const avgRating = getAverageRating(book._id);
            return (
              <div key={book._id} className="list-item">
                <div className="item-info">
                  <h3>{book.title}</h3>
                  <p>📖 Auteur: {book.author}</p>
                  <p>🔖 ISBN: {book.isbn}</p>
                  <p>📅 Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
                  <p>⭐ Note Moyenne: {avgRating ? `${avgRating} / 5` : 'Aucune note'}</p>
                </div>
                {isAdmin && (
                  <div className="item-actions">
                    <button onClick={() => handleEdit(book)} className="edit-button">
                      ✏️ Modifier
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="delete-button">
                      🗑️ Supprimer
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Book Form (Admin Only) */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Auteur</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Date Publication</label>
            <input
              type="date"
              value={formData.publicationDate}
              onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="form-button">
            {editingId ? '🔄 Modifier' : '➕ Ajouter'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookManagement;
