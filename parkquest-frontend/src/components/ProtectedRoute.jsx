import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ isAuthenticated, children }) => {
    return (
        // If the user is authenticated, render the child component
        isAuthenticated ? children :
            // If not authenticated, redirect the user to the login page
            <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;