import { useState, useEffect } from "react";
import "../styles/manageProducts.css"
import { Product } from "../entities/Product";
import { useParams } from "react-router-dom";


const ManageProductsPage = () => {
  const [product, setProduct] = useState<Product>({
    id: null,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    subCategoryId: 0
  });

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      loadProductIfUpdated(Number(id));
    }
  }, [id]);

  const loadProductIfUpdated = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (e) {

    }
  }

  const handleProductSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(product),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const productToSave = {
      ...product,
      [name]: value
    };
    setProduct(productToSave);
  };

  return (
    <div className="product-manage-container">
      <h2>Termék hozzáadása</h2>
      <form>
        <div>
          <label>Termék neve</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék leírása</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék ára</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék mennyisége</label>
          <input
            type="text"
            name="quantity"
            value={product.quantity}
            onChange={handleProductInputChange}
          />
        </div>
        <div>
          <label>Kategória kiválasztása</label>
          <input
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleProductInputChange}
          />
        </div>
        <div>
          <label>Alkategória kiválasztása</label>
          <input
            type="text"
            name="subCategoryId"
            value={product.subCategoryId}
            onChange={handleProductInputChange}
          />
        </div>

        <button onClick={handleProductSave}>Mentés</button>
      </form>
      <a href="/productList">
        <button>Termékek megtekintése</button>
      </a>
    </div>
  );
};

export default ManageProductsPage;