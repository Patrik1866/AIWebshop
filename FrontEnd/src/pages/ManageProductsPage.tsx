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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      loadProductIfUpdated(Number(id)).then(() => {
        loadCategories();
      });
    }
  }, [id]);
  
  useEffect(() => {
    if (product.categoryId) {
      loadSubCategories(product.categoryId);
    }
  }, [product.categoryId]);
  

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

        const dataToSave = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId
        }
        setProduct(dataToSave);
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    let updatedProduct = { ...product };

    if (name === "categoryId") {
      updatedProduct.categoryId = Number(value);
      loadSubCategories(Number(value));
    } else if (name === "subCategoryId") {
      updatedProduct.subCategoryId = Number(value);
    }

    setProduct(updatedProduct);
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8080/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadSubCategories = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/subCategory/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSubCategories(data);
      }
    } catch (e) {
      console.error(e);
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
            onChange={(e) => {
              handleSelectChange(e);
              loadSubCategories(Number(e.target.value));
            }}
            className="form-control"
          >
            <option value="">Válasszon kategóriát</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Alkategória kiválasztása</label>
          <select
            name="subCategoryId"
            value={Number(product.subCategoryId)!}
            onChange={(e) => handleSelectChange(e)}
            className="form-control"
          >
            <option value="">Válasszon alkategóriát</option>
            {subCategories.map((subCategory: any) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
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