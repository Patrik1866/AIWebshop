import { useAuth } from "../util/AuthContext";
import "../styles/profile.css"
import { useEffect, useState } from "react";


export function ProfilePage(this: any) {
    const { user, setUser } = useAuth();
    const [address, setAddressForm] = useState({
        id: 0,
        userId: 0,
        city: "",
        street: "",
        address: "",
        zipcode: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/address/${user?.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();

                    const safeDate = {
                        id: data.id,
                        userId: user?.id!,
                        city: data.city,
                        street: data.street,
                        address: data.address,
                        zipcode: data.zipcode
                    }

                    setAddressForm(safeDate);
                }
            } catch (error) {
                throw error;
            }
        };

        fetchData();
    }, []);

    async function savePersonalData() {
        try {

            const response = await fetch(`http://localhost:8080/users/saveUser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                credentials: 'include',
                body: JSON.stringify({ user, address })
            });

            if (response.ok) {
            }
        } catch (error) {
            throw error;
        }
    }

    function handlePersonalDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (user) {
            const userToSave = {
                ...user,
                [name]: value
            };

            if (name !== 'password') {
                setUser(userToSave);
            }

        }
    }

    return <>
        <header className="profile-header">
            <h2>Saját profil oldal</h2>
        </header>
        <legend className="profile-page-form">
            <div className="profile-data">
                <h3>Személyes adatok</h3>
                <div>
                    <label>Felhasználónév</label>
                    <input type="text" name="username" value={user?.username} onChange={handlePersonalDataChange} />
                </div>
                <div>
                    <label>Családnév</label>
                    <input type="text" name="surname" value={user?.surname} onChange={handlePersonalDataChange} />
                </div>
                <div>
                    <label>Keresztnév</label>
                    <input type="text" name="firstname" value={user?.firstname} onChange={handlePersonalDataChange} />
                </div>
                <div>
                    <label>E-mail</label>
                    <input type="text" name="email" value={user?.email} onChange={handlePersonalDataChange} />
                </div>
                <div>
                    <label>Telefonszám</label>
                    <input type="text" name="phone" value={user?.phone} onChange={handlePersonalDataChange} />
                </div>
            </div>
            <div className="profile-data">
                <h3>Szállítási adatok</h3>
                <div>
                    <label>Település</label>
                    <input type="text" value={address.city} />
                </div>
                <div>
                    <label>Út/Utca</label>
                    <input type="text" value={address.street} />
                </div>
                <div>
                    <label>Házszám</label>
                    <input type="text" value={address.address} />
                </div>
                <div>
                    <label>Postakód</label>
                    <input type="text" value={address.zipcode} />
                </div>
            </div>
        </legend>
        <button className="profile-save-button" onClick={savePersonalData}>Mentés</button>
    </>

}

export default ProfilePage;