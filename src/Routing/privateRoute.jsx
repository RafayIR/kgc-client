import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";




function PrivateRoute({ children }) {
    const logInState = useSelector(state => state.login.isLoggedIn)
    const userRole = useSelector(state => state.login.role);
    const location = useLocation()

    if (!logInState) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (location.pathname === '/signup' && userRole !== 'admin') {
        return <Navigate to="/404" />;
    }

    return children;
}

export default PrivateRoute;