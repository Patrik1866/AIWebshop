import { createContext, useState, useContext, useEffect } from "react";
import React from "react";
import { User } from "../entities/User";

export type Role = "ADMIN" | "MODERATOR" | "USER";

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    hasRole: (requiredRoles: Role[]) => boolean;
    getUserRole: () => Role;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = sessionStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

   

    const isAuthenticated = !!user;

    const getUserRole = (): Role => {
        if (user?.isAdmin) {
            return "ADMIN";
        } else if (user?.isModerator) {
            return "MODERATOR";
        } else {
            return "USER";
        }
    };

    const hasRole = (requiredRoles: Role[]): boolean => {
        if (!user) return false;

        const currentRole = getUserRole();
        console.log("test")

        if (currentRole === "ADMIN") return true;

        if (currentRole === "MODERATOR") return requiredRoles.some(role => ["MODERATOR"].includes(role))

        return requiredRoles.includes("USER");
    };


    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, hasRole, getUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};