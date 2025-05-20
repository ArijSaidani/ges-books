import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';

const ManageUsers = () => {
  const { user, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [getAllUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, role: newRole } : u
        ));
        setSuccess('Rôle utilisateur mis à jour avec succès');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        setLoading(true);
        setError(null);
        const result = await deleteUser(userId);
        if (result.success) {
          setUsers(users.filter(u => u.id !== userId));
          setSuccess('Utilisateur supprimé avec succès');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Gestion des utilisateurs</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userItem) => (
            <tr key={userItem.id}>
              <td>{userItem.id}</td>
              <td>{userItem.firstName} {userItem.lastName}</td>
              <td>{userItem.email}</td>
              <td>
                <select
                  value={userItem.role}
                  onChange={(e) => handleRoleChange(userItem.id, e.target.value)}
                  disabled={userItem.id === user?.id} // Empêche les admins de modifier leur propre rôle
                  className="form-select"
                >
                  <option value="admin">Administrateur</option>
                  <option value="user">Utilisateur</option>
                </select>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(userItem.id)}
                  disabled={userItem.id === user?.id} // Empêche les admins de se supprimer eux-mêmes
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageUsers;