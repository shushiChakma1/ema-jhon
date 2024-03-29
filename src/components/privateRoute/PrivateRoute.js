import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';



const PrivateRoute = ({ children }) => {
    const [logInUser, setLogInUser] = useContext(userContext);
    return logInUser.email ? children : <Navigate to="/login" />;
}

export default PrivateRoute;