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
            if (editingUser != null){
               setEditingUser((prevEditingUser) => prevEditingUser ? { ...prevEditingUser, password: newPassword.password } : null);
            }
            const response = await fetch(`http://localhost:8080/users/password/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({password: newPassword.password}),
            });
            if (response.ok) {
                loadUsers();
                handleModalClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (<>
        <div className="users-container">
            <input
                type="text"
                placeholder="Keressen név alapján"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="user-list">
                {filteredUsers.map((user, index: number) => (
                    <div key={index} className="user-tile">
                        <div className="user-header">
                            <label className="user-name">teljes nev: {user.surname} {user.firstname}</label>
                        </div>
                        <div className="user-info">
                            <label>email: {user.email}</label>
                            <label>tel: {user.phone}</label>
                            <label>Felhasználónév: {user.username}</label>
                        </div>
                        <div className="action-buttons">
                            <button className="edit-button"onClick={() => {setEditUserInfo(true), setEditingUser(user)}}>Szerkesztés</button>
                            <button className="edit-password-button" onClick={() => {setUserPassword(true), setEditingUser(user)}}>Jelszó módosítása</button>
                            <button className="delete-button" onClick={() => handleUserDelete(user.id)}>Törlés</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>

        {editUserInfo && (
        <div className="edit-user-container">
          <div className="modal">
            <header>Adatok szerkesztése</header>
            <div className="modal-content">
              <input name="surname" type="text" placeholder="Vezetéknév" value={editingUser?.surname} onChange={handleChange}/>
              <input name="firstname" type="text" placeholder="Keresztnév"  value={editingUser?.firstname} onChange={handleChange}/>
              <input name="email" type="text" placeholder="E-mail" value={editingUser?.email} onChange={handleChange}/>
              <input name="phone" type="text" placeholder="Telefonszám" value={editingUser?.phone} onChange={handleChange}/>
              <input name="username" type="text" placeholder="Felhasználónév" value={editingUser?.username} onChange={handleChange}/>
            </div>
            <button onClick={handleModalClose} className="close-button">
              Bezárás
            </button>
            <button className="save-button" onClick={() => handleUserUpdate(editingUser!)}>
                Mentés
            </button>
          </div>
        </div>
      )}

      {editUserPassword && (
        <div className="edit-user-container">
          <div className="modal">
            <header>Jelszó módosítása</header>
            <div className="modal-content">
              <input name="password" type="password" placeholder="Új jelszó" onChange={handlePasswordChange}/>
              <input name="confirmPassword" type="password" placeholder="Jelszó megerősítése" onChange={handlePasswordChange}/>
            </div>
            <button onClick={handleModalClose} className="close-button">
              Bezárás
            </button>
            <button className="save-button" onClick={() => handlePasswordUpdate(editingUser!)}>
                Mentés
            </button>
          </div>
        </div>
      )}
    </>
    )
}


export default UsersPage;