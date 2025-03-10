import { useEffect, useState } from "react";
import { Order } from "../entities/Order";
import { OrderItems } from "../entities/OrderItems";
import { User } from "../entities/User";
import "../styles/OrderList.css"

interface OrderListProps {
    userId: number;
}

const CustomerOrderList: React.FC<OrderListProps> = ({ userId }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [overlayVisible, setOverlayVisible] = useState(false);

    useEffect(() => {
        loadOrdersToUser();
    }, []);

    const handleOrderClick = async (orderId: number) => {
        let items = await loadOrderItems(orderId);
        setOrderItems(items);
        console.log(items)
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOrderItems([]);
        setOverlayVisible(false);
    }

    async function loadOrdersToUser() {
        try {
            const response = await fetch(`http://localhost:8080/order/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function loadOrderItems(orderId: number) {
        try {
            const response = await fetch(`http://localhost:8080/manageOrders/order/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
            }
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className="view-orders-container">
            <div className="view-orders-header">
                <h1>Rendeléseim</h1>
            </div>
            <div className="view-orders-content">
                {orders.map((order) => (
                    <div
                        className="view-order-tile"
                        key={order.id}
                        onClick={() => { handleOrderClick(order.id!), console.log(order.id) }}
                    >
                        <div className="view-order-tile-content">
                            <label>Rendelés azonosítója:</label><span> {order.id}</span>
                            <label>Rendelés ideje:</label>
                            <span>{new Date(order.orderDate).toLocaleDateString('hu-HU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}</span>
                        </div>
                    </div>
                ))}
            </div>

            {overlayVisible && (
                <div className="order-items-overlay">
                    <div className="overlay-content">
                        <button className="items-close-button" onClick={closeOverlay}>✖</button>
                        <h2>Rendelés tételei</h2>
                        <div className="order-items-list">
                            {orderItems.map((orderItem) => (
                                <div key={orderItem.itemId}>
                                    <div className="order-item" key={orderItem.itemId}>
                                        <span><strong>Tétel:</strong> {orderItem.productName}</span>
                                        <span><strong>Ár:</strong> {orderItem.price} Ft</span>
                                        <span><strong>Mennyiség:</strong> {orderItem.quantity}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="totalprice">
                                <span><strong>Összesen:</strong> {orderItems.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity, 0)} Ft</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerOrderList;