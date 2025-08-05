// components/PrivateRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const PrivateRoute = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Outlet></Outlet> : <Navigate to="/login" replace />;
};

export default PrivateRoute;