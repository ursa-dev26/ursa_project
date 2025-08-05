import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [tokenAuth, setTokenAuth] = useState(null);
    const api = import.meta.env.VITE_API
    const navigate = useNavigate()

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    /** connexion a la plateforme */

    const login = async (body) => {

        try {

            const fetch = await window.fetch(`${api}/login`, {
                headers: headersHttp,
                body: JSON.stringify(body),
                method: "POST",
                mode: "cors",
                credentials: "include"
            })
            const json = await fetch.json()
            

            if (json?.token) {
                setIsLoggedIn(true)
                setUser(json?.data)
                setTokenAuth(json?.token)
                navigate('/')

                return json
            } else {
                setIsLoggedIn(false)
                setUser(null)
                navigate('/login')
            }

        } catch (error) {
            const err = {
                message: error
            }
            return err;
        }

    };

    /** deconnexion a la plateforme */

    const logout = async () => {
        try {

            await window.fetch(`${api}/logout`, {
                headers: headersHttp,
                method: "Get",
                mode: "cors",
                credentials: "include"
            })

            setIsLoggedIn(false)
            return isLoggedIn

        } catch (error) {
            setIsLoggedIn(false)

            return isLoggedIn

        };
    };



    // affiche les cookies disponible
    const hascookies = async () => {

        try {

            const fetch = await window.fetch(`${api}/`, {
                headers: headersHttp,
                method: "Get",
                mode: "cors",
                credentials: "include"
            })
            const json = await fetch.json()

            if (json?.authuser) {
                setIsLoggedIn(true)
                const cookies = json?.authuser
                setUser(cookies?.data)
                setTokenAuth(cookies?.token)

                navigate('/')

                return isLoggedIn

            } else {
                setIsLoggedIn(false)
                navigate('/login')
                return isLoggedIn

            }
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false)

            return isLoggedIn

        }
    }
    useEffect(() => {
        hascookies()
    }, []);



    return (
        <AuthContext.Provider value={{ isLoggedIn, user, tokenAuth, setIsLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    return useContext(AuthContext);
};


