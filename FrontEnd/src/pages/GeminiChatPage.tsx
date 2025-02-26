import { useState, useEffect } from "react";
import "../styles/gemini.css"
import authService from "../util/AuthService";
import { User } from "../entities/User";

const GeminiChatPage = () => {
    const [user] = useState<User | null>(authService.getUser());
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState<{ question: string, message: string }[]>([]);

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleSendMessage = async () => {
        try {
            console.log(message)
            console.log(responses);
            const chatRequest = { question: message };
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
                handleGetMessages();
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
        </>
    )
}

export default GeminiChatPage;