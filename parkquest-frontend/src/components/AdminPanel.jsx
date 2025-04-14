import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; // Adding toasts for notifications

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8081/api/users/all?adminId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      console.log("Fetched users:", response.data); // Log fetched users
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        toast.error("Unauthorized: You don't have access to view this data.");
      } else {
        toast.error('Failed to fetch users.');
      }
    }
  };

  const toggleAdmin = async (targetUserId, isCurrentlyAdmin) => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is included
      console.log("Sending Update Role Request:", {
        userId: targetUserId,
        isAdmin: !isCurrentlyAdmin,
        adminId: userId, // Currently logged-in admin's ID
      });

      await axios.put('http://localhost:8081/api/users/update-role', {
        userId: targetUserId,
        isAdmin: !isCurrentlyAdmin,
        adminId: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
      toast.success('User role updated successfully.');
    } catch (error) {
      console.error("Error updating user role:", error.response?.data || error.message);
      toast.error('Failed to update user role.');
    }
  };

  const deleteUser = async (targetUserId) => {
    if (targetUserId === Number(userId)) {
      toast.error("You cannot delete yourself.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token"); // Ensure token is included
      await axios.delete(`http://localhost:8081/api/users/delete/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          adminId: userId, // Include adminId as a query parameter
        },
      });
      fetchUsers();
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      toast.error("Failed to delete the user.");
    }
  };

  if (!isAdmin) {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
      <div className="admin-panel">
        <Toaster />
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
                        disabled={user.userId === Number(userId)}
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