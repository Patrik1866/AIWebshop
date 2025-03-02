import "../styles/profile.css"
import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import authService from "../util/AuthService";


export function ProfilePage(this: any) {
    const [user, setUser] = useState(authService.getUser());
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [address, setAddressForm] = useState({
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

    return (<>
        <div className="profile-page">
          <header className="profile-header">
            <h2>Saját profil oldal</h2>
          </header>
          <div className="profile-page-form">
            <div className="profile-section">
              <h3>Személyes adatok</h3>
              <div className="profile-form-group">
                <label>Felhasználónév</label>
                <input
                  type="text"
                  name="username"
                  value={user?.username}
                  onChange={handlePersonalDataChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Családnév</label>
                <input
                  type="text"
                  name="surname"
                  value={user?.surname}
                  onChange={handlePersonalDataChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Keresztnév</label>
                <input
                  type="text"
                  name="firstname"
                  value={user?.firstname}
                  onChange={handlePersonalDataChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>E-mail</label>
                <input
                  type="text"
                  name="email"
                  value={user?.email}
                  onChange={handlePersonalDataChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Telefonszám</label>
                <input
                  type="text"
                  name="phone"
                  value={user?.phone}
                  onChange={handlePersonalDataChange}
                  className="profile-input"
                />
              </div>
            </div>
            <div className="profile-section">
              <h3>Szállítási adatok</h3>
              <div className="profile-form-group">
                <label>Település</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleDeliveryAddress}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Út/Utca</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleDeliveryAddress}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Házszám</label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleDeliveryAddress}
                  className="profile-input"
                />
              </div>
              <div className="profile-form-group">
                <label>Postakód</label>
                <input
                  type="text"
                  name="zipcode"
                  value={address.zipcode}
                  onChange={handleDeliveryAddress}
                  className="profile-input"
                />
              </div>
            </div>
          </div>
          <button className="profile-save-button" onClick={savePersonalData}>
            Mentés
          </button>
        </div>
        {notificationMessage && <Notification message={notificationMessage} />}
      </>);
        
    

}

export default ProfilePage;

