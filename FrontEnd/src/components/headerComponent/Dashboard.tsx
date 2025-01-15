import { useAuth } from "../../util/AuthContext";

export function Dashboard() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <p>Please log in to view this page.</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>User: {user?.username}</p> <br />
            <p>Email {user?.email}</p>
        </div>
    );
}