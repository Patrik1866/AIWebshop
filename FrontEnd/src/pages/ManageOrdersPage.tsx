import { useEffect, useState } from "react";
import { User } from "../entities/User";
import "../styles/ManageOrders.css"


const ManageOrdersPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (<>
        <div className="orders-page-container">
            <div className="orders-page-header">
                <h1>Rendelések kezelése</h1>
            </div>
            <div className="orders-page-content">
                {users.map((user) => (
                    <div className="user-order-tile" key={user.id} onClick={() => window.location.href = `/viewUserOrder/${user.id}`}>
                        <div className="user-item"><strong>Felhaszáló teljes neve:</strong> {user.surname} {user.firstname}</div>
                        <div className="user-item"><strong>Felhasználónév:</strong>  {user.username}</div>
                        <div className="user-item"><strong>Email:</strong>  {user.email}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default ManageOrdersPage;