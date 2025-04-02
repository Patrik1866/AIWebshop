
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
        fetchData();
    }, []);

    async function fetchData() {
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
              
              const updatedUser = await response.json(); 

              setNotificationMessage("Sikeres mentés!");
              setTimeout(() => {
                  setNotificationMessage(null);
              }, 5000);
  
              authService.setUser(updatedUser);
   
              setUser(updatedUser);
  
              fetchData();
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

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <header className="bg-main-brown text-main-green-title py-5 px-6">
            <h2 className="text-2xl font-bold text-center">Saját adatok</h2>
          </header>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Személyes adatok szekció */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-main-green-title mb-6 pb-2 border-b">Személyes adatok</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Felhasználónév</label>
                    <input
                      type="text"
                      name="username"
                      value={user?.username}
                      onChange={handlePersonalDataChange}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Családnév</label>
                    <input
                      type="text"
                      name="surname"
                      value={user?.surname}
                      onChange={handlePersonalDataChange}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Keresztnév</label>
                    <input
                      type="text"
                      name="firstname"
                      value={user?.firstname}
                      onChange={handlePersonalDataChange}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">E-mail</label>
                    <input
                      type="text"
                      name="email"
                      value={user?.email}
                      onChange={handlePersonalDataChange}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Telefonszám</label>
                    <input
                      type="text"
                      name="phone"
                      value={user?.phone}
                      onChange={handlePersonalDataChange}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              
              {/* Szállítási adatok szekció */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-main-green-title mb-6 pb-2 border-b">Szállítási adatok</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Település</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleDeliveryAddress}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Út/Utca</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleDeliveryAddress}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Házszám</label>
                    <input
                      type="text"
                      name="address"
                      value={address.address}
                      onChange={handleDeliveryAddress}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-main-green-title font-bold mb-2">Postakód</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={address.zipcode}
                      onChange={handleDeliveryAddress}
                      className="border border-main-green-title rounded-lg text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mentés gomb */}
            <div className="mt-8 flex justify-center">
              <button 
                className="bg-main-green-title text-white cursor-pointer hover:bg-main-green font-bold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 ease-in-out"
                onClick={savePersonalData}
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
        
        {/* Értesítés komponens */}
        {notificationMessage && (
          <div className="fixed top-4 right-4 z-50">
            <Notification message={notificationMessage} />
          </div>
        )}
      </div>
    );
  }

export default ProfilePage;

