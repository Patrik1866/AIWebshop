import { useEffect, useState } from 'react';
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
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-4xl md:text-3xl font-bold text-center mb-8 text-main-green-title">A bevásárló kosarad</h1>

      <div className="bg-white rounded-4xl shadow-lg p-6">
        {cartContent!.length <= 0 ? (
          <div className="text-center py-8">
            <p className="text-main-green-title text-2xl mb-4">A kosarad üres!</p>
            <button
              className="bg-main-brown hover:bg-main-brown-hover text-main-green-title font-medium py-2 px-6 rounded-md transition duration-300"
              onClick={() => { window.location.href = "/products" }}
            >
              Vásárolj itt
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartContent!.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-spacing-0.5 rounded-2xl shadow:md hover:shadow-lg transition duration-200 bg-main-beige">
                  <div className="mb-3 sm:mb-0 p-1">
                    <div className="font-bold text-main-green-title text-lg mb-1">{item.productName}</div>
                    <div className="text-main-green">{item.productPrice} HUF</div>
                  </div>
                  <button
                    className="bg-main-brown text-main-green-title hover:bg-main-brown-hover px-4 py-2 rounded-md text-sm font-bold transition duration-300"
                    onClick={handleCartDelete.bind(this, index)}
                  >
                    Törlés
                  </button>
                </div>
              ))}
            </div>

            {cartService.getCartContent() && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-xl font-semibold mb-4 sm:mb-0 text-main-green-title">
                    Végösszeg: {cartContent?.reduce((total, item) => total + item.productPrice, 0)} HUF
                  </div>
                  <button
                    className="w-full sm:w-auto bg-main-brown hover:bg-main-brown-hover text-main-green font-medium py-3 px-8 rounded-md transition duration-300"
                    onClick={() => { window.location.href = "/order" }}
                  >
                    Rendelés
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    {showNotifification && <Notification message="A termék sikeresen törölve a kosárból!" />}
  </>);
};

export default CartPage;
