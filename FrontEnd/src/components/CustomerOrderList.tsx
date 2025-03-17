import { useEffect, useState } from "react";
import { Order } from "../entities/Order";
import { OrderItems } from "../entities/OrderItems";
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
     <div className="container mx-auto p-4">
       <div className="mb-6">
         <h1 className="text-2xl font-bold text-center">Rendeléseim</h1>
       </div>
       <div className="grid gap-4">
         {orders.map((order) => (
           <div
             className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100"
             key={order.id}
             onClick={() => { handleOrderClick(order.id!), console.log(order.id) }}
           >
             <div>
               <label className="block text-sm font-semibold">Rendelés azonosítója:</label>
               <span className="block mb-2">{order.id}</span>
               <label className="block text-sm font-semibold">Rendelés ideje:</label>
               <span>
                 {new Date(order.orderDate).toLocaleDateString('hu-HU', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric',
                   hour: 'numeric',
                   minute: 'numeric',
                 })}
               </span>
             </div>
           </div>
         ))}
       </div>
   
       {overlayVisible && (
         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
             <button className="text-red-500 float-right" onClick={closeOverlay}>✖</button>
             <h2 className="text-xl font-bold mb-4">Rendelés tételei</h2>
             <div className="space-y-4">
               {orderItems.map((orderItem) => (
                 <div key={orderItem.itemId} className="border-b pb-2">
                   <span className="block"><strong>Tétel:</strong> {orderItem.productName}</span>
                   <span className="block"><strong>Ár:</strong> {orderItem.price} Ft</span>
                   <span className="block"><strong>Mennyiség:</strong> {orderItem.quantity}</span>
                 </div>
               ))}
               <div className="mt-4">
                 <span className="text-lg font-bold">Összesen: {orderItems.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity, 0)} Ft</span>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}

export default CustomerOrderList;