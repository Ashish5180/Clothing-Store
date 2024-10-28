import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Protected = ({ children }) => {
    // Check if the token exists in cookies
    const token = Cookies.get('token');
    
    // If token doesn't exist, redirect to the login page
    if (!token) {
        return <Navigate to="/Signin" replace />;
    }

    // If token exists, render the protected component
    return children;
};


export default Protected;
