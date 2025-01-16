import { useState } from "react";
import "../styles/gemini.css"
import { useAuth } from "../util/AuthContext";

const GeminiChatPage = () => {
    const {user} = useAuth();
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleSendMessage = async () => {
        try{
            const chatRequest = {message};
            const response = await fetch("http://localhost:8080/chat/geminiMessage", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chatRequest)
            });

            const responseData = await response.text();
            setResponse(responseData);
        } catch (error){
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };


    return (<>
        <header>
            <h2>Gemini Chat szolgáltatás</h2>
            <h3>Amennyiben kérdésed merülne fel, nyugodtan kérdezd a chatbotot :D</h3>
        </header>

        <div className="chat-container">
            <div className="chat-messages">
                <p>Üzenetek megjelennek itt</p>
                {response && <p>Válasz: {response}</p>}
            </div>
            <div className="chat-input">
                <input type="text" id="chat-input" placeholder="Üzenet" value={message} onChange={handleInputChange}/><br />
                <button id="chat-send" onClick={handleSendMessage}>Küldés</button>
            </div>
        </div>
    </>
    )
}

export default GeminiChatPage;