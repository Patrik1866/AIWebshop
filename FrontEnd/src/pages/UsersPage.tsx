import { useEffect, useState } from "react";
import { User } from "../entities/User";
import '../styles/usersPage.css'

const UsersPage = ({ }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [editUserInfo, setEditUserInfo] = useState(false);
    const [editUserPassword, setUserPassword] = useState(false);
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const handleModalClose = () => {
        setEditingUser(null);
        setEditUserInfo(false);
        setUserPassword(false);
    };

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(
        (user) =>
            user.surname.toLowerCase().includes(searchTerm) ||
            user.firstname.toLowerCase().includes(searchTerm)
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setEditingUser((prevEditingUser) => {
            if (!prevEditingUser) return null;
            return { ...prevEditingUser, [name]: value };
        });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setNewPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    const loadUsers = async () => {
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
    };

    const handleUserDelete = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            });
            if (response.ok) {
                loadUsers();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleUserUpdate = async (updatedUser: User) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                loadUsers();
                handleModalClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handlePasswordUpdate = async (updatedUser: User) => {
        try {
            if (newPassword.password !== newPassword.confirmPassword) {
                alert("A jelszök nem egyeznek!");
                return;
            }
            if (editingUser != null) {
                setEditingUser((prevEditingUser) => prevEditingUser ? { ...prevEditingUser, password: newPassword.password } : null);
            }
            const response = await fetch(`http://localhost:8080/users/password/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ password: newPassword.password }),
            });
            if (response.ok) {
                loadUsers();
                handleModalClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className={`container mx-auto p-4 ${editUserInfo || editUserPassword ? "blur-md" : ""}`} >
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Keressen név alapján"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map((user, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <div className="mb-4">
                                <label className="block text-lg font-bold">teljes név: {user.surname} {user.firstname}</label>
                            </div>
                            <div className="mb-4">
                                <label className="block">email: {user.email}</label>
                                <label className="block">tel: {user.phone}</label>
                                <label className="block">Felhasználónév: {user.username}</label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-main-green hover:bg-main-beige text-white px-3 py-1 rounded-lg transition duration-300 cursor-pointer" onClick={() => { setEditUserInfo(true), setEditingUser(user) }}>Szerkesztés</button>
                                <button className="bg-main-green-title hover:bg-main-beige text-white px-3 py-1 rounded-lg transition duration-300 cursor-pointer" onClick={() => { setUserPassword(true), setEditingUser(user) }}>Jelszó módosítása</button>
                                <button className="bg-main-brown hover:bg-main-beige text-white px-3 py-1 rounded-lg transition duration-300 cursor-pointer" onClick={() => handleUserDelete(user.id)}>Törlés</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {editUserInfo && (
                <div className="fixed inset-0  bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <header className="text-xl font-bold mb-4">Adatok szerkesztése</header>
                        <div className="space-y-4 mb-4">
                            <input name="surname" type="text" placeholder="Vezetéknév" value={editingUser?.surname} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            <input name="firstname" type="text" placeholder="Keresztnév" value={editingUser?.firstname} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            <input name="email" type="text" placeholder="E-mail" value={editingUser?.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            <input name="phone" type="text" placeholder="Telefonszám" value={editingUser?.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            <input name="username" type="text" placeholder="Felhasználónév" value={editingUser?.username} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleModalClose} className="bg-gray-500 text-white px-3 py-1 rounded-lg">
                                Bezárás
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded-lg" onClick={() => handleUserUpdate(editingUser!)}>
                                Mentés
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editUserPassword && (
                <div className="fixed inset-0  bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <header className="text-xl font-bold mb-4">Jelszó módosítása</header>
                        <div className="space-y-4 mb-4">
                            <input name="password" type="password" placeholder="Új jelszó" onChange={handlePasswordChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            <input name="confirmPassword" type="password" placeholder="Jelszó megerősítése" onChange={handlePasswordChange} className="w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleModalClose} className="bg-gray-500 text-white px-3 py-1 rounded-lg">
                                Bezárás
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded-lg" onClick={() => handlePasswordUpdate(editingUser!)}>
                                Mentés
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}


export default UsersPage;