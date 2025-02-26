import "../styles/profile.css"
import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";


export function ProfilePage(this: any) {
    const { user, setUser } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
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
                setNotificationMessage("Sikeres mentés!")
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000)
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

    function handleDeliveryAddress(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (address) {
            const addressToSave = {
                ...address,
                [name]: value
            };
            setAddressForm(addressToSave);


        }
    }

    return <>
        <header className="profile-header">
            <h2>Saját profil oldal</h2>
        </header>
        <div className="profile-page-form">
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
                    <input type="text" name="city" value={address.city} onChange={handleDeliveryAddress} />
                </div>
                <div>
                    <label>Út/Utca</label>
                    <input type="text" name="street" value={address.street} onChange={handleDeliveryAddress} />
                </div>
                <div>
                    <label>Házszám</label>
                    <input type="text" name="address" value={address.address} onChange={handleDeliveryAddress} />
                </div>
                <div>
                    <label>Postakód</label>
                    <input type="text" name="zipcode" value={address.zipcode} onChange={handleDeliveryAddress} />
                </div>
            </div>
        </div>
        <button className="profile-save-button" onClick={savePersonalData}>Mentés</button>
        {notificationMessage && <Notification message={notificationMessage} />}
    </>

}

export default ProfilePage;

function useAuth(): { user: any; setUser: any; } {
    throw new Error("Function not implemented.");
}
