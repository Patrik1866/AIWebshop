import { useState, useEffect } from "react";
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
        const chatMessagesContainer = document.querySelector('.bg-gray-50.rounded-lg.h-\\[400px\\]');

        if (chatMessagesContainer) {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
            chatMessagesContainer.classList.add('scroll-to-bottom');
        }
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
                const responseText = await response.text();

                try {
                    const jsonData = JSON.parse(responseText);

                    setProducts(jsonData);

                    setResponses(prev => [...prev, {
                        question: chatRequest.question,
                        message: "Találtam néhány terméket, amely érdekelhet téged. Nézd meg a jobb oldali panelen!"
                    }]);
                } catch (e) {
                    setProducts([]);

                    setResponses(prev => [...prev, {
                        question: chatRequest.question,
                        message: responseText
                    }]);
                }
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

    return (<>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">

                <header className="bg-main-brown py-6 px-6">
                    <h2 className="text-3xl font-bold text-main-green-title">Chat szolgáltatás</h2>
                    <h3 className="text-md mt-2 opacity-90 text-main-green">Amennyiben kérdésed merülne fel, nyugodtan kérdezd a chatbotot :D</h3>
                </header>

                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                        <div className="bg-gray-50 rounded-lg h-[400px] overflow-y-auto p-4 mb-4 shadow-inner">
                            {responses.length === 0 ? (
                                <p className="text-gray-400 text-center italic mt-4">Üzenetek megjelennek itt</p>
                            ) : (
                                responses.map((response, index) => (
                                    <div
                                        key={`${index}_${response.question}_${response.message}`}
                                        className="mb-4 last:mb-0"
                                    >
                                        <div className="bg-main-beige text-main-green p-3 rounded-t-lg rounded-br-lg max-w-[80%] ml-auto">
                                            {response.question}
                                        </div>
                                        <div className="bg-white border border-gray-200 p-3 rounded-b-lg rounded-tr-lg max-w-[80%] mt-2 shadow-sm">
                                            {response.message}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                id="chat-input"
                                placeholder="Üzenet"
                                value={message}
                                onChange={handleInputChange}
                                className="flex-1 border border-main-green-title rounded-full px-4 py-2 focus:outline-none focus:scale-101 text-main-green transition duration-300 ease-in-out"
                            />
                            <button
                                id="chat-send"
                                onClick={handleSendMessage}
                                className="bg-main-brown hover:bg-main-brown-hover text-main-green-title font-bold cursor-pointer px-4 py-2 rounded-full transition duration-200 flex items-center"
                            >
                                <span>Küldés</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {products.length > 0 && (
                        <div className="md:w-80 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 p-4">
                            <div className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
                                A kérdésedre az alábbi termékeket találtam
                            </div>
                            <div className="space-y-3 overflow-y-auto max-h-[400px]">
                                {products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3 cursor-pointer"
                                        onClick={() => navigate(`/ViewProductPage`, { state: { product } })}
                                    >
                                        <div className="text-indigo-700 font-medium mb-1">{product.name}</div>
                                        <div className="text-lg font-bold text-gray-800 mb-1">{product.price}.- <span className="text-sm font-normal">HUF</span></div>
                                        <div className="text-gray-600 text-sm mb-1 line-clamp-2">{product.description}</div>
                                        <div className="text-gray-500 text-sm">
                                            Készleten: <span className="font-medium">{product.quantity} db.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
    );
}

export default GeminiChatPage;