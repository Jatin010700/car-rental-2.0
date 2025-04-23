import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    const handleLogout = () => {
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}