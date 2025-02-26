import { Component } from "react";
import "../styles/gemini.css"
import authService from "../util/AuthService";
import { User } from "../entities/User";

interface GeminiChatPageProps {
   
}

interface GeminiChatPageState {
    user: User | null;
    message: string;
    responses: { question: string, message: string }[];
}

class GeminiChatPage extends Component<GeminiChatPageProps,GeminiChatPageState> {
    constructor(props: GeminiChatPageProps) {
        super(props);
        this.state = {
            user: authService.getUser(),
            message: "",
            responses: [],
        };
    }

    componentDidMount() {
        this.handleGetMessages();
    }

    private async handleSendMessage() {
        try {
            console.log(this.state.message)
            console.log(this.state.responses);
            const chatRequest = { question: this.state.message };
            this.setState({ message: "" });
            const response = await fetch("http://localhost:8080/chat/geminiMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(chatRequest)
            });
            if (response.ok) {
                this.handleGetMessages();
            }
        } catch (error) {
            console.error(error);
        }
    };

    private async handleGetMessages() {
        try {
            const response = await fetch(`http://localhost:8080/chat/geminiMessage/${this.state.user?.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();

            this.setState({ responses: responseData.map((response: any) => ({ question: response.question, message: response.message })) });
        } catch (error) {
            console.error(error);
        }
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ message: event.target.value });
    };

    render() {
        return (
            <>
                <header>
                    <h2>Gemini Chat szolgáltatás</h2>
                    <h3>Amennyiben kérdésed merülne fel, nyugodtan kérdezd a chatbotot :D</h3>
                </header>

                <div className="chat-container">
                    <div className="chat-messages">
                        <p>Üzenetek megjelennek itt</p>
                        {this.state.responses.map((response, index) => (
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
                            value={this.state.message}
                            onChange={this.handleInputChange}
                        />
                        <button id="chat-send" onClick={this.handleSendMessage.bind(this)}>Küldés</button>
                    </div>
                </div>
            </>
        )
    }
}

export default GeminiChatPage;