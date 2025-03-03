import { useEffect, useState } from "react";
import { Product } from "../entities/Product";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";
import authService from "../util/AuthService";
import cartService from "../util/CartService";
import Notification from "../components/Notification";

declare var webkitSpeechRecognition: any;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setCartContent] = useState(cartService.getCartContent());
  const [showNotifification, setShowNotifification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:8080/products";
        if (selectedCategoryId) {
          url = `http://localhost:8080/products/category/${selectedCategoryId}`;
        } else if (selectedSubCategoryId) {
          url = `http://localhost:8080/products/subcategory/${selectedSubCategoryId}`;
        }

        const response = await fetch(url, {
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
  }, [selectedCategoryId, selectedSubCategoryId]);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(null);
  };

  const handleSubCategorySelect = (subCategoryId: number) => {
    setSelectedSubCategoryId(subCategoryId);
    setSelectedCategoryId(null);
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

  const handleMicrophoneClick = () => {
    if (!isMicrophoneActive) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(_stream => {
          const recognition = new webkitSpeechRecognition();
          recognition.lang = 'hu-HU';
          recognition.maxResults = 10;
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
          };
          recognition.start();
          setIsMicrophoneActive(true);
        })
        .catch(error => console.error('Error activating microphone:', error));
    } else {
      setIsMicrophoneActive(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div>
        <button onClick={() => window.location.replace("/")} className="back-button"><i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza</button>
      </div>
      <div className="filter-container">
        <div className="filter-title-container">
          <label >Szűrő</label>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Keresés"
          className="search-input"
        />
        <button className="microphone-button" onClick={handleMicrophoneClick}>
          {isMicrophoneActive ? (
            <i className="fas fa-microphone-slash"></i>
          ) : (
            <i className="fas fa-microphone"></i>
          )}
        </button>
        <label>Kategória</label>
        <select className="category-select" onChange={(e) => {
          handleCategorySelect(Number(e.target.value))
          loadSubCategories(Number(e.target.value));
        }}>
          <option value="">Válassz kategóriát</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label> Alkategória</label>
        <select className="subcategory-select" onChange={(e) => handleSubCategorySelect(Number(e.target.value))}>
          <option value="">Válassz alkategóriát</option>
          {subCategories.map((subCategory: any) => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-tile-container">
        {filteredProducts.map((product, index) => (
          <div onClick={() => navigate(`/ViewProductPage`, { state: { product } })} className="product-tile" key={index}>
            <p>Termék neve: <span>{product.name}</span></p>
            <p>Termék leírása: <span> {product.description}</span></p>
            <p>Termék ára: <span>{product.price}-. (Ft) </span></p>
            <p>Termék mennyisége: <span>{product.quantity} (db)</span></p>
            {authService.hasRole(["ADMIN", "MODERATOR"]) &&
              <div className="product-button-group">
                <button onClick={(e) => { e.stopPropagation(); handleProductDelete(Number(product.id!)) }}>Törlés</button>
                <button onClick={(e) => { e.stopPropagation(); handleProductUpdate(Number(product.id)) }}>Módosítás</button>
              </div>}
            {authService.hasRole(["USER"]) &&
              <div className="product-button-group">
                <button onClick={(e) => { e.stopPropagation(); handleSaveCart(Number(product.id), 1) }}>Hozzáadás kosárhoz</button>
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
