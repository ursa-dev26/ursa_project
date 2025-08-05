import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const LogOut = () => {
 const {logout } = useAuth();

 useEffect(() => {
    logout()
 }, []);
    return (
        <Navigate to={"/login"}></Navigate>
    )

};


export default LogOut