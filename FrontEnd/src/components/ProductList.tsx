import { useEffect, useState } from "react";
import { Product } from "../entities/Product";
import "../styles/products.css";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <>
      {products.map((product, index) => (
        <div className="product-tile" key={index}>
          <p>Termék neve: <span>{product.name}</span></p>
          <p>Termék leírása: <span> {product.description}</span></p>
          <p>Termék ára: <span>{product.price}-. (Ft) </span></p>
          <p>Termék mennyisége: <span>{product.quantity} (db)</span></p>
          <p>Termék kategória: <span>{product.categoryId}</span></p>
          <p>Termék alkategória: <span>{product.subCategoryId}</span></p>
          <button onClick={() => handleProductDelete(product.id)}>Törlés</button>
        </div>
      ))}
    </>
  );
};

export default ProductList;
