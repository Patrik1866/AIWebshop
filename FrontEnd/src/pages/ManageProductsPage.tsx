import { useState } from "react";
import { useAuth } from "../util/AuthContext";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  subCategoryId: number;
}

const ManageProductsPage = () => {
    const {user} = useAuth();
  const [product, setProduct] = useState<ProductProps>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    subCategoryId: 0,
  });

  const handleProductSave = async () => {
    console.log(product);
    try {
      const response = await fetch(`http://localhost:8080/products`,{
        method: 'POST',
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
        if (user) {
            const productToSave = {
                ...product,
                [name]: value
            };
            setProduct(productToSave);
        }

  };

  return (
    <div>
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
