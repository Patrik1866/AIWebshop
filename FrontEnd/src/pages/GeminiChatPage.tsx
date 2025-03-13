import { useState, useEffect } from "react";
import "../styles/gemini.css"
import authService from "../util/AuthService";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { useNavigate } from "react-router-dom";


const GeminiChatPage = () => {
    const [user] = useState<User | null>(authService.getUser());
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState<{ question: string, message: string }[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        handleGetMessages();
    }, []);
    useEffect(() => {
        const chatMessagesContainer = document.querySelector('.chat-messages');
        chatMessagesContainer!.scrollTop = chatMessagesContainer!.scrollHeight;
        chatMessagesContainer!.classList.add('scroll-to-bottom');
    }, [responses]);

    const handleSendMessage = async () => {
        try {
            const chatRequest = { question: message };
            console.log(chatRequest)
            setMessage("");
            const response = await fetch("http://localhost:8080/chat/geminiMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(chatRequest)
            });
            if (response.ok) {
                const data = await response.json();
                setResponses(data);
                console.log(data);
                // Check if the last response contains product data
                setProducts(data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/chat/geminiMessage/${user?.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();

            setResponses(responseData.map((response: any) => ({ question: response.question, message: response.message })));
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <>
            <div className="chat-page-container">
                <header>
                    <h2>Gemini Chat szolgáltatás</h2>
                    <h3>Amennyiben kérdésed merülne fel, nyugodtan kérdezd a chatbotot :D</h3>
                </header>

                <div className="chat-container">
                    <div className="chat-messages">
                        <p>Üzenetek megjelennek itt</p>
                        {responses.map((response, index) => (
                            <div key={`${index}_${response.question}_${response.message}`} className="chat-message">
                                <div className="question">{response.question}</div><br />
                                <div className="answer">{response.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            id="chat-input"
                            placeholder="Üzenet"
                            value={message}
                            onChange={handleInputChange}
                        />
                        <button id="chat-send" onClick={handleSendMessage}>Küldés</button>
                    </div>
                </div>
                {products.length > 0 &&
                    <div className="chat-products-container">
                        <div className="chat-products-header">
                            <label>A kérdésedre az alábbi termékeket találtam</label>
                        </div>
                        {products.map((product, index) => (
                            <div key={index} className="chat-product" onClick={() => navigate(`/ViewProductPage`, { state: { product } })}>
                                <div className="chat-product-name"><strong>Termék neve:</strong>  {product.name}</div>
                                <div className="chat-product-price">{product.price}.- <strong>HUF</strong></div>
                                <div className="chat-product-description"><strong>Leírás:</strong> {product.description}</div>
                                <div className="chat-product-quantity">{product.quantity} <strong>db.</strong></div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default GeminiChatPage;