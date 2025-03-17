import React, { useEffect, useState } from "react";
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

    return (
      <>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Rendelés leadása</h1>
          <form onSubmit={handleOrderSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Személyes adatok</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Teljes név:</label>
                <input
                  type="text"
                  name="name"
                  value={userDetails?.suername + " " + userDetails?.firstname}
                  onChange={handleInputChange}
                  placeholder="Adja meg a teljes nevét"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails?.email}
                  onChange={handleInputChange}
                  placeholder="Adja meg az email címét"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Telefonszám:</label>
                <input
                  type="text"
                  name="phone"
                  value={userDetails?.phone}
                  onChange={handleInputChange}
                  placeholder="Adja meg a telefonszámot"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Szállítási adatok</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Megye:</label>
                <select
                  name="state"
                  onChange={(e) => handleStateChange(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Válasszon megyét</option>
                  {states?.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Település:</label>
                <input
                  type="text"
                  name="city"
                  value={userDetails?.city}
                  onChange={handleInputChange}
                  placeholder="Adja meg a szállítási címét"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Utca:</label>
                <input
                  type="text"
                  name="street"
                  value={userDetails?.street}
                  onChange={handleInputChange}
                  placeholder="Adja meg az utcát"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Házszám:</label>
                <input
                  type="text"
                  name="houseNumber"
                  value={userDetails?.address}
                  onChange={handleInputChange}
                  placeholder="Adja meg a házszámot"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Irányítószám:</label>
                <input
                  type="text"
                  name="zipCode"
                  value={userDetails?.zipCode}
                  onChange={handleInputChange}
                  placeholder="Adja meg az irányítószámot"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Szállítási és fizetési információk</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Fizetési mód:</label>
                <select
                  name="paymentMethod"
                  onChange={(e) => handlePaymentChange(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Válassz fizetési lehetőséget</option>
                  {payment!.map((payment: any) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Szállítási mód:</label>
                <select
                  name="shippingMethod"
                  onChange={(e) => handleShippingChange(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Válasszon szállítási módot</option>
                  {shipping!.map((shipping: any) => (
                    <option key={shipping.id} value={shipping.id}>
                      {shipping.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Rendelés összegzés</h2>
              <p className="text-lg">Végösszeg: {cartService.getCartContent()?.reduce((total, item) => total + item.productPrice, 0)} HUF</p>
            </div>
            <button type="submit" className="w-full bg-main-green-title hover:bg-main-green  text-white font-bold py-2 rounded-lg transition duration-300 cursor-pointer">
              Rendelés leadása
            </button>
          </form>
          {loading && <LoadingBanner message="Rendelés feldolgozása..." />}
        </div>
      </>
    );
};

export default OrderPage;
