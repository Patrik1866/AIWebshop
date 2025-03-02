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

  const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    switch (name) {
      case "categoryId":
        setProduct({ ...product, categoryId: value });
        break;
      case "subCategoryId":
        setProduct({ ...product, subCategoryId: value });
        break;
      default:
        break;
    }
  };

  return (<>
    <button onClick={() => window.location.replace("/products")} className="back-button">
          <i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza
        </button>
    <div className="product-manage-container">
      <div className="header">
        <h2>Termék hozzáadása</h2>
        
      </div>
      <form className="product-form">
        <div className="form-group">
          <label>Termék neve</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Termék leírása</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleProductInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Termék ára</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleProductInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Termék mennyisége</label>
          <input
            type="text"
            name="quantity"
            value={product.quantity}
            onChange={handleProductInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Kategória kiválasztása</label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleSelectChange}
            className="form-control"
          >
            <option value="">Válasszon kategóriát</option>
            {/* options */}
          </select>
        </div>
        <div className="form-group">
          <label>Alkategória kiválasztása</label>
          <select
            name="subCategoryId"
            value={product.subCategoryId}
            onChange={handleSelectChange}
            className="form-control"
          >
            <option value="">Válasszon alkategóriát</option>
            {/* options */}
          </select>
        </div>
  
        <button onClick={handleProductSave} className="btn btn-primary">
          Mentés
        </button>
      </form>
      <a href="/productList">
        <button className="btn btn-secondary">
          Termékek megtekintése
        </button>
      </a>
    </div>
    </>);
};

export default ManageProductsPage;