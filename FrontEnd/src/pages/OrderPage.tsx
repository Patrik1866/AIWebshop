import React, { useEffect, useState } from "react";
import "../styles/OrderPage.css";
import { UserWithAddress } from "../entities/UserWithAddress";
import cartService from "../util/CartService";
import { Payment } from "../entities/Payment";
import { Order } from "../entities/Order";
import { States } from "../entities/States";
import LoadingBanner from "../components/LoadingBanner";


const OrderPage = () => {
    const [userDetails, setUserDetails] = useState<UserWithAddress | null>(null);
    const [payment, setPayment] = useState<Payment[]>([]);
    const [shipping, setShipping] = useState<Payment[]>([]);
    const [states, setStates] = useState<States[]>([]);
    const [selectedPaymentType, setSelectedPaymentType] = useState<number | null>(null);
    const [selectedShippingType, setSelectedShippingType] = useState<number | null>(null);
    const [selectedState, setSelectedState] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAddressWithUser();
        loadPaymentMethod();
        loadShippingMethod();
        loadStates();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevUserDeatils) => {
            if (!prevUserDeatils) return null;
            return { ...prevUserDeatils, [name]: value };
        });
    };

    const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userDetails || !selectedPaymentType || !selectedShippingType || !selectedState) {
            alert("Please fill out the form!");
            return;
        }

        const orderToSave: Order = {
            userId: userDetails.userId,
            orderDate: new Date(),
            addressId: userDetails.addressId,
            shippingTypeId: selectedShippingType,
            paymentTypeId: selectedPaymentType,
            stateId: selectedState,
        };

        const orderItemstoSave = cartService.getCartContent()?.map((item) => ({
            productId: item.productId,
            quantity: item.productQuantity,
            price: item.productPrice
        }))

        const requestBody = {
            order: orderToSave,
            orderItems: orderItemstoSave
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/order", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                cartService.setCartContent([]);
                setLoading(false);
                setTimeout(() => {
                    window.location.href = "/successful";
                }, 500);
            } else {
                throw new Error(`Failed to save order: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save order!");
        }
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
                const data = await response.json();
                setUserDetails(data as UserWithAddress);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const loadPaymentMethod = async () => {
        try {
            const response = await fetch("http://localhost:8080/payment", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPayment(data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const loadShippingMethod = async () => {
        try {
            const response = await fetch("http://localhost:8080/shipmentType", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setShipping(data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const loadStates = async () => {
        try {
            const response = await fetch("http://localhost:8080/states", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStates(data);
            }
        } catch (e) {
            console.error(e);
        }
    }



    function handlePaymentChange(e: number) {
        setSelectedPaymentType(e);
    }
    function handleShippingChange(e: number) {
        setSelectedShippingType(e);
    }
    function handleStateChange(value: number) {
        setSelectedState(value);
    }

    return (<>
        <div className="order-page">
            <h1 className="order-h1">Rendelés leadása</h1>
            <form onSubmit={handleOrderSubmit}>
                <div className="personal-info">
                    Személyes adatok
                    <div className="form-group">
                        <label>Teljes név:</label>
                        <input
                            type="text"
                            name="name"
                            value={userDetails?.suername + " " + userDetails?.firstname}
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
                            value={userDetails?.email}
                            onChange={handleInputChange}
                            placeholder="Adja meg az email címét"
                            required
                        />
                    </div>

                    <div>
                        <label>Telefonszám</label>
                        <input
                            type="text"
                            name="phone"
                            value={userDetails?.phone}
                            onChange={handleInputChange}
                            placeholder="Adja meg a telefonszámot"
                            required
                        />
                    </div>
                </div>
                <div className="shippin-info">
                    Szállítási adatok
                    <div className="form-group">
                        <label>Megye</label>
                        <select name="state" onChange={(e) => handleStateChange(Number(e.target.value))}>
                            <option value="">Válasszon megyét</option>
                            {states?.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Település</label>
                        <input
                            type="text"
                            name="address"
                            value={userDetails?.city}
                            onChange={handleInputChange}
                            placeholder="Adja meg a szállítási címét"

                        />
                    </div>

                    <div className="form-group">
                        <label>Utca</label>
                        <input
                            type="text"
                            name="city"
                            value={userDetails?.city}
                            onChange={handleInputChange}
                            placeholder="Adja meg a városát"

                        />
                    </div>

                    <div className="form-group">
                        <label>Házszám</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={userDetails?.zipCode}
                            onChange={handleInputChange}
                            placeholder="Adja meg az irányítószámot"

                        />
                    </div>

                    <div className="form-group">
                        <label>Irányítószám</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={userDetails?.zipCode}
                            onChange={handleInputChange}
                            placeholder="Adja meg az irányítószámot"

                        />
                    </div>
                </div>

                <div className="shippin-delivery-info">
                    <div className="form-group">
                        <label>Fizetési mód</label>
                        <select name="paymentMethod" onChange={(e) => handlePaymentChange(Number(e.target.value))}>
                            <option value="">Válassz fizetési lehetőséget</option>
                            {payment!.map((payment: any) => (
                                <option key={payment.id} value={payment.id}>
                                    {payment.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Szállítási mód</label>
                        <select name="shippingMethod" onChange={(e) => handleShippingChange(Number(e.target.value))}>
                            <option value="">Válasszon szállítási módot</option>
                            {shipping!.map((shipping: any) => (
                                <option key={shipping.id} value={shipping.id}>
                                    {shipping.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="order-summary">
                    <h2>Rendelés összegzés</h2>
                    <p>Végösszeg: {cartService.getCartContent()?.reduce((total, item) => total + item.productPrice, 0)} HUF</p>
                </div>

                <button type="submit" className="submit-button">
                    Rendelés leadása
                </button>


            </form>
            {loading && <LoadingBanner message="Rendelés feldolgozása..." />}
        </div>
    </>);
};

export default OrderPage;
