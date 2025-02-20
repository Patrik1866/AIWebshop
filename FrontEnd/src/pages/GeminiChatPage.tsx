import { useEffect, useState } from "react";
import "../styles/gemini.css"
import { useAuth } from "../util/AuthContext";



const GeminiChatPage = () => {
    const {user} = useAuth();
    const [message, setMessage] = useState("");
    const [responses, setResponse] = useState<{question: string, message: string}[]>([]);

    const handleSendMessage = async () => {
        try{
            const chatRequest = message;
             await fetch("http://localhost:8080/chat/geminiMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    userId: user?.id,
                    message: chatRequest    
                }
                )
            });
            
        } catch (error){
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleGetMessages = async () => {
        try{
            const response = await fetch(`http://localhost:8080/chat/geminiMessage/${user?.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();

            setResponse(responseData.map((response: any) => ({question: response.question, message: response.message})));
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
                {responses.map((response, index) => (
                    <div key={`${index}_${response.question}_${response.message}`}>
                        <span>Kérdés: {response.question}</span>
                        <span>Válasz: {response.message}</span>
                    </div>
                ))}
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