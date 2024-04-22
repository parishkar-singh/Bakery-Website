'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    username: string;
    email: string;
    picture: string | null;
}

interface AuthContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const isServer = typeof window === 'undefined'; // Check if running on the server

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a hook to access the AuthContext
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!isServer) { // Avoid using localStorage on the server
            const storedUser = localStorage.getItem('user');
            if (storedUser && storedUser !== 'undefined') {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    // Define the login function
    const login = (user: User) => {
        if (!isServer) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        setUser(user);
    };

    // Define the logout function
    const logout = () => {
        if (!isServer) {
            localStorage.removeItem('user');
        }
        setUser(null);
    };

    // Return the AuthContext.Provider with value containing user, login, and logout
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
