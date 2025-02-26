import { useAuth } from "../util/AuthService";

export function Dashboard() {
    const { user, isAuthenticated } = useAuth();

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