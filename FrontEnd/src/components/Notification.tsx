import React, { useState, useEffect } from "react";
import "../styles/notification.css";

interface NotificationProps {
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        visible && (
            <div className="notification">
                <p>{message}</p>
            </div>
        )
    );
};

export default Notification;
