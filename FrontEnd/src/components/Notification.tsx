import { Component } from "react";
import "../styles/notification.css";

interface NotificationProps {
    message: string;
}

interface NotificationState {
    visible: boolean;
}

class Notification extends Component<NotificationProps, NotificationState> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount(): void {
        this.setState({ visible: true });
        setTimeout(() => {
            this.setState({ visible: false });
        }, 6000);
    }

    render(){
        return (
            this.state.visible && (
                <div className="notification">
                    <p>{this.props.message}</p>
                </div>
            )
        );
    }
    
};

export default Notification;
