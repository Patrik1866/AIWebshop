
import { createContext, useState, useEffect } from 'react';

interface UserContextType {
    currentUser: any;
    token: string;
    setCurrentUser: (user: any) => void;
    setToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const userData = sessionStorage.getItem('currentUser');
        const tokenData = sessionStorage.getItem('token');
        if (userData && tokenData) {
            setCurrentUser(JSON.parse(userData));
            setToken(tokenData);
        }
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };