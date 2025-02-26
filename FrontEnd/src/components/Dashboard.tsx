import { useState } from "react";
import authService from "../util/AuthService";

export function Dashboard() {
    const [ user,isAuthenticated ] = useState(authService.getUser());

    if (!isAuthenticated) {
        return <p>Kérlek jelentkezz be hogy lásd az oldalt</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>User: {user?.username}</p> <br />
            <p>Email {user?.email}</p>
        </div>
    );
}