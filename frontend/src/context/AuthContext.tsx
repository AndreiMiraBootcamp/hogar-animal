import React, { createContext, useContext, useState, useEffect } from "react";

// Define la estructura de los datos del usuario
interface UserData {
    userId: number;
    username: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phoneNumber: string;
    image: string;
}

// Define la interfaz del contexto
interface AuthContextType {
    userData: UserData | null;
    token: string | null;
    login: (data: UserData, token: string) => void;
    logout: () => void;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Proveedor de contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null); // Añadir estado para el token

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");

        if (expirationTime && new Date().getTime() > parseInt(expirationTime, 10)) {
            // Si la hora actual es mayor que la de expiración, borra los datos
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
            setUserData(null);
            setToken(null);
        } else if (storedUserData && storedToken) {
            try {
                const parsedData: UserData = JSON.parse(storedUserData);
                setUserData(parsedData);
                setToken(storedToken);
            } catch (error) {
                console.error("Error parsing user data or token from localStorage", error);
            }
        }
    }, []);

    const login = (data: UserData, token: string) => {
        const expirationTime = new Date().getTime() + 86400000; // 24 horas en milisegundos
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime.toString()); // Guarda la hora de expiración
        setUserData(data);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        setUserData(null);
        setToken(null); 
        window.location.href = "/"; 
    };

    return (
        <AuthContext.Provider value={{ userData, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};