import { useEffect, useState } from "react";
import { Product } from "../entities/Product";
import {useNavigate} from "react-router-dom";
import "../styles/products.css";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  return (
    <>
      <div>
        <button onClick={() => window.history.back()} className="back-button"><i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza</button>
      </div>
      <div className="product-tile-container">
        {products.map((product, index) => (
          <div onClick={() => navigate(`/ViewProductPage`, { state: { product } })} className="product-tile" key={index}>
            <p>Termék neve: <span>{product.name}</span></p>
            <p>Termék leírása: <span> {product.description}</span></p>
            <p>Termék ára: <span>{product.price}-. (Ft) </span></p>
            <p>Termék mennyisége: <span>{product.quantity} (db)</span></p>
            <div className="product-button-group">
              <button onClick={() => handleProductDelete(product.id!)}>Törlés</button>
              <button onClick={() => handleProductUpdate(Number(product.id))}>Módosítás</button>
            </div>
          </div>
        ))}
    </div >
    </>
  );
};

export default ProductList;
