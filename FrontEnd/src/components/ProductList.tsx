import { useEffect, useState } from "react";
import { Product } from "../entities/Product";
import { useNavigate } from "react-router-dom";
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
  const images = import.meta.glob("../assets/*.svg", { eager: true, as: "url" });
  const categoryImages: { [key: number]: string } = {
    1200: images["../assets/electronics.svg"],
    2200: images["../assets/clothing.svg"],
    3200: images["../assets/beauty.svg"],
    4200: images["../assets/household.svg"],
    5200: images["../assets/sport.svg"],
    6200: images["../assets/food.svg"],
    7200: images["../assets/books.svg"],
  }

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


  // Enm AI alapokat használó felolvasó, hanem Web Service-t használ.
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hu-HU'; // Set language to Hungarian
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported in this browser.');
    }
  };

  //Na ez már AI alapú TTS/Text To Speech felolvasó (Magyar nyelvre állítva BackEnd-en)
  const speakFromBackend = async (text: string) => {
    try {
      console.log('Sending request to TTS service...');
      const response = await fetch('http://localhost:8080/tts/speak', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: text
      });

      if (response.ok) {
        const audioBlob = await response.blob();


        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        try {
          await audio.play();
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
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
      {/**Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/** Back button */}
        <div className="mt-10 mb-10">
          <button
            className="bg-main-green-title hover:bg-main-green text-white font-bold py-2 px-4 rounded-full flex items-center"
            onClick={() => window.history.back()}><i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza</button>
        </div>

        {/**Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-evenly mb-10 ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Keresés"
            className="border border-main-green-title py-2 px-2 text-main-green rounded-2xl focus:outline-none focus:scale-102 transition duration-300 ease-in-out"
          />
          <button className="text-main-green-title" onClick={handleMicrophoneClick}>
            {isMicrophoneActive ? (
              <i className="fas fa-microphone-slash"></i>
            ) : (
              <i className="fas fa-microphone"></i>
            )}
          </button>
          <select className="border border-main-green-title py-2 px-2 sm:mb-5 lg:mb-0 md:mb-0 text-main-green rounded-2xl focus:outline-none focus:scale-102 transition duration-300 ease-in-out" onChange={(e) => {
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
          <select className="border border-main-green-title py-2 px-2 text-main-green rounded-2xl focus:outline-none focus:scale-102 transition duration-300 ease-in-out" onChange={(e) => handleSubCategorySelect(Number(e.target.value))}>
            <option value="">Válassz alkategóriát</option>
            {subCategories.map((subCategory: any) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* product tiles */}
        <div className="grid flex-col md:grid-cols-2 lg:grid-cols-3 gap-4 sm:grid-cols-1 ">
          {filteredProducts.map((product, index) => (
            <div onClick={() => navigate(`/ViewProductPage`, { state: { product } })} className="tile-container w-full h-full maw-w-2xl flex flex-col justify-start m-auto py-3 px-2 border rounded-2xl shadow-lg hover:shadow-2xl hover:scale-102 transition duration-300 border-main-green-title bg-product-tile" key={index}>
              <div className="py-2 px-2 mt-2 flex justify-center">
                <img className="w-20" src={categoryImages[product.categoryId] || ""} alt={product.name} />
              </div>
              <div className="py-2 px-2">
                <p><span className="font-bold text-main-green-title">Termék neve:</span> <span className="text-main-green">{product.name}</span></p>
                <button className="" onClick={(e) => { e.stopPropagation(); speakFromBackend(product.name); }}><i className="fas fa-volume-up"></i></button>
              </div>
              <div className="py-2 px-2">
                <p><span className="font-bold text-main-green-title">Termék leírása:</span> <span className="text-main-green"> {product.description}</span></p>
                <button className="" onClick={(e) => { e.stopPropagation(); speak(product.description); }}> <i className="fas fa-volume-up"></i></button>
              </div>
              <div className="py-2 px-2">
                <p><span className="font-bold text-main-green-title">Termék ára:</span> <span className="text-main-green">{product.price}-. (Ft) </span></p>
                <p><span className="font-bold text-main-green-title">Termék mennyisége:</span> <span className="text-main-green">{product.quantity} (db)</span></p>
              </div>

              {/**buttons */}
              <div className="flex flex-col mt-auto left-0 right-0 relative ">
                {authService.hasRole(["ADMIN", "MODERATOR"]) &&
                  <div className="flex flex-row items-center justify-evenly">
                    <button className="border cursor-pointer border-main-green-title bg-white hover:bg-red-300 text-main-green-title font-bold py-2 px-4 rounded transition duration-300" onClick={(e) => { e.stopPropagation(); handleProductDelete(Number(product.id!)) }}>Törlés</button>
                    <button className="border cursor-pointer border-main-green-title bg-white hover:bg-main-beige text-main-green-title font-bold py-2 px-4 rounded transition duration-300" onClick={(e) => { e.stopPropagation(); handleProductUpdate(Number(product.id)) }}>Módosítás</button>
                  </div>}
                {authService.hasRole(["USER", "ADMIN", "MODERATOR"]) &&
                  <button onClick={(e) => { e.stopPropagation(); handleSaveCart(Number(product.id), 1) }} className="flex justify-center cursor-pointer border bg-white border-main-green-title hover:bg-main-beige text-main-green-title font-bold py-2 px-4 rounded transition duration-300 mt-5">
                    Hozzáadás kosárhoz
                  </button>
                }
              </div>
            </div>
          ))}
        </div >
      </div>
      {/**notification */}
      {showNotifification && <Notification message={notificationMessage} />}
    </>
  );
};

export default ProductList;
