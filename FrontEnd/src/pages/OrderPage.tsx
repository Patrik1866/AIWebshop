import React, { useEffect, useState } from "react";
import "../styles/OrderPage.css";
import { UserWithAddress } from "../entities/UserWithAddress";

const OrderPage = () => {
    const [orderDetails, setOrderDetails] = useState<UserWithAddress | null>(null);

    useEffect(() => {
        loadAddressWithUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderDetails((prevOrderDeatils) => {
            if (!prevOrderDeatils) return null; 
            return { ...prevOrderDeatils, [name]: value };
          });
    };

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Rendelési adatok:", orderDetails);
        alert("Rendelés sikeresen leadva!");
    };

    const loadAddressWithUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/userWithAddress`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                setOrderDetails(data as UserWithAddress);
                
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="order-page">
            <h1>Rendelés leadása</h1>
            <form onSubmit={handleOrderSubmit}>
                <div className="form-group">
                    <label>Teljes név:</label>
                    <input
                        type="text"
                        name="name"
                        value={orderDetails?.suername + " " + orderDetails?.firstname}
                        onChange={handleInputChange}
                        placeholder="Adja meg a teljes nevét"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={orderDetails?.email}
                        onChange={handleInputChange}
                        placeholder="Adja meg az email címét"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Cím:</label>
                    <input
                        type="text"
                        name="address"
                        value={orderDetails?.address}
                        onChange={handleInputChange}
                        placeholder="Adja meg a szállítási címét"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Város:</label>
                    <input
                        type="text"
                        name="city"
                        value={orderDetails?.city}
                        onChange={handleInputChange}
                        placeholder="Adja meg a városát"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Irányítószám:</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={orderDetails?.zipCode}
                        onChange={handleInputChange}
                        placeholder="Adja meg az irányítószámot"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Fizetési mód:</label>
                    <select
                        name="paymentMethod"
                       
                    >
                        <option value="credit_card">Bankkártya</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash_on_delivery">Utánvét</option>
                    </select>
                </div>

                <div className="order-summary">
                    <h2>Rendelés összegzés</h2>
                    {/* Itt jelenítsd meg a rendelés tételeit és a végösszeget */}
                    <p>Végösszeg: 12 345 Ft</p>
                </div>

                <button type="submit" className="submit-button">
                    Rendelés leadása
                </button>
            </form>
        </div>
    );
};

export default OrderPage;
