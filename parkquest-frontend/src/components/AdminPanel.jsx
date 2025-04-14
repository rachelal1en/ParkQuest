import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // optional for styling
import { FaTrash } from 'react-icons/fa';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId"); // logged-in admin user ID
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all', {
        params: { adminId: userId }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleAdmin = async (targetUserId, isCurrentlyAdmin) => {
    try {
      await axios.put('http://localhost:8080/api/users/update-role', {
        adminId: userId,
        userId: targetUserId,
        isAdmin: !isCurrentlyAdmin
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating admin role:', error);
    }
  };

  const deleteUser = async (targetUserId) => {
    if (targetUserId === Number(userId)) {
      alert("You cannot delete yourself.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${targetUserId}`, {
        params: { adminId: userId }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!isAdmin) {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userIsAdmin = user.roles.some((role) => role.name === "ROLE_ADMIN");

            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={userIsAdmin}
                    onChange={() => toggleAdmin(user.userId, userIsAdmin)}
                    disabled={user.userId === Number(userId)} // prevent self toggle
                  />
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.userId)}
                    disabled={user.userId === Number(userId)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
