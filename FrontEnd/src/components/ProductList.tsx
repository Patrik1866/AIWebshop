import { useEffect, useState } from "react";
import { Product } from "../entities/Product";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";
import authService from "../util/AuthService";
import cartService from "../util/CartService";
import Notification from "../components/Notification";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setCartContent] = useState(cartService.getCartContent());
  const [showNotifification, setShowNotifification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        const fetchedData = await response.json();
        if (response.ok) {
          setProducts(fetchedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductDelete = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        setNotificationMessage("A termék sikeresen törölve!");
        setShowNotifification(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductUpdate = async (productId: number) => {
    try {
      window.location.href = `/manageProducts/${productId}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCart = async (productId: number, quantity: number) => {
    try {
      const cartRequest = {
        product: productId,
        quantity: quantity,
      };

      const response = await fetch("http://localhost:8080/cart/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(cartRequest),
      });

      if (response.ok) {
        const newCartContent = await cartService.fetchCartContent();
        if (newCartContent) {
          setCartContent(newCartContent);
          cartService.getCartContent();
          setNotificationMessage("Sikeresen hozzáadva a kosárhoz!");
          setShowNotifification(true);
        }
        console.log("Cart saved successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => window.location.replace("/")} className="back-button"><i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza</button>
      </div>
      <div className="product-tile-container">
        {products.map((product, index) => (
          <div onClick={() => navigate(`/ViewProductPage`, { state: { product } })} className="product-tile" key={index}>
            <p>Termék neve: <span>{product.name}</span></p>
            <p>Termék leírása: <span> {product.description}</span></p>
            <p>Termék ára: <span>{product.price}-. (Ft) </span></p>
            <p>Termék mennyisége: <span>{product.quantity} (db)</span></p>
            {authService.hasRole(["ADMIN", "MODERATOR"]) &&
              <div className="product-button-group">
                <button onClick={(e) =>{e.stopPropagation(); handleProductDelete(Number(product.id!))}}>Törlés</button>
                <button onClick={(e) => {e.stopPropagation(); handleProductUpdate(Number(product.id))}}>Módosítás</button>
              </div>}
            {authService.hasRole(["USER"]) &&
              <div className="product-button-group">
                <button onClick={(e) => {e.stopPropagation(); handleSaveCart(Number(product.id), 1)}}>Hozzáadás kosárhoz</button>
              </div>
            }
          </div>
        ))}
      </div >
      {showNotifification && <Notification message={notificationMessage} />}
    </>
  );
};

export default ProductList;
