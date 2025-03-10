import { useEffect, useState } from 'react';
import '../styles/cartPage.css';
import cartService from '../util/CartService';
import Notification from '../components/Notification';

const CartPage = () => {
    const [cartContent, setCartContent] = useState(cartService.getCartContent());
    const [showNotifification, setShowNotifification] = useState(false);
  
    useEffect(() => {
      setCartContent(cartService.getCartContent());
    }, [cartService]);
  
    const handleCartDelete = async (index: number) => {
      try {
        console.log(cartContent)
        console.log(cartContent![index].cartId);
        const response = await fetch(`http://localhost:8080/cart/${cartContent![index].cartId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
  
        if (response.ok) {
          cartService.setCartContent(cartContent!.filter(item => item.cartId !== cartContent![index].cartId));
          setCartContent(cartService.getCartContent());
          setShowNotifification(true);
          setTimeout(() => {
            setShowNotifification(false);
          }, 4000);
        } else {
          throw new Error(`Failed to delete cart: ${response.statusText}`);
        }
      } catch (e) {
        console.error(e);
      }
    }

    return (<>
        <div className="cart-page">
            <h1 className="cart-header">A bevásárló kosarad</h1>

            <div className="cart-items">
                {!cartContent ? (
                    <div className="empty-cart">
                        <p>A kosarad üres!</p>
                        <button className="empty-cart-btn" onClick={() => { window.location.href = "/products" }}>
                            Vásárolj itt
                        </button>
                    </div>
                ) : (
                    cartContent!.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="product-details">
                                <div className="product-name">{item.productName}</div>
                                <div className="product-price">{item.productPrice} HUF</div>
                            </div>
                            <div className="remove-btn-container">
                                <button
                                    className="remove-btn"
                                    onClick={handleCartDelete.bind(this, index)}
                                >
                                    Törlés
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {cartService.getCartContent() &&
                
                <div>
                  <label>Végösszeg: {cartContent?.reduce((total, item) => total + item.productPrice, 0)} HUF</label>
                  <button onClick={() => { window.location.href = "/order" }}>Rendelés</button>
                </div>
                }
                
            </div>
        </div>
        {showNotifification && <Notification message="A termék sikeresen törölve a kosárból!" />}
        </>);
};

export default CartPage;
